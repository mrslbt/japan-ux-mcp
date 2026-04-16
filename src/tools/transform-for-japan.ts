import { getKeigoLevel, type Context, type KeigoLevel } from "../data/keigo-patterns.js";
import { scoreJapanReadiness } from "./score-japan-readiness.js";

type Format = "html" | "jsx" | "tsx";

export interface TransformParams {
  markup: string;
  context: Context;
  format: Format;
  preserve_styling: boolean;
}

interface Change {
  what: string;
  why: string;
}

export interface TransformResult {
  original_score: number;
  transformed_score: number;
  transformed_markup: string;
  changes_made: Change[];
  improvement: string;
}

function getSubmitText(context: Context): string {
  const level = getKeigoLevel(context);
  const map: Record<KeigoLevel, string> = {
    casual: "送信する",
    neutral: "送信する",
    formal: "ご登録内容を確認する",
    very_formal: "お申し込み内容を確認する",
  };
  return map[level];
}

export function transformForJapan(params: TransformParams): TransformResult {
  const { markup, context, format, preserve_styling } = params;
  const isJsx = format === "jsx" || format === "tsx";
  const cls = (name: string) => isJsx ? `className="${name}"` : `class="${name}"`;
  const maxLen = (n: number) => isJsx ? `maxLength={${n}}` : `maxlength="${n}"`;

  const originalResult = scoreJapanReadiness({
    markup,
    context,
    include_suggestions: false,
  });

  let transformed = markup;
  const changes: Change[] = [];

  // 1. Fix name fields: firstName/lastName → sei/mei
  const firstNameRegex = /<label[^>]*>[^<]*(?:first\s*name|given\s*name)[^<]*<input[^>]*name=["']?(first.?name|firstname|first_name|given.?name)["']?[^>]*\/?>[^<]*<\/label>/gi;
  const lastNameRegex = /<label[^>]*>[^<]*(?:last\s*name|family\s*name|surname)[^<]*<input[^>]*name=["']?(last.?name|lastname|last_name|surname|family.?name)["']?[^>]*\/?>[^<]*<\/label>/gi;

  const hadFirstName = firstNameRegex.test(transformed);
  const hadLastName = lastNameRegex.test(transformed);

  if (hadFirstName || hadLastName) {
    // Remove old name fields
    transformed = transformed.replace(firstNameRegex, "");
    transformed = transformed.replace(lastNameRegex, "");

    // Find insertion point (after form tag or first fieldset)
    const insertAfter = transformed.match(/<form[^>]*>/i);
    if (insertAfter) {
      const insertIdx = transformed.indexOf(insertAfter[0]) + insertAfter[0].length;
      const nameBlock = `
  <fieldset>
    <legend>お名前</legend>
    <div ${cls("name-fields")}>
      <label>姓 <input name="sei" pattern="[一-龥ぁ-んァ-ン]+" required /></label>
      <label>名 <input name="mei" pattern="[一-龥ぁ-んァ-ン]+" required /></label>
    </div>
    <div ${cls("furigana-fields")}>
      <label>セイ <input name="sei_kana" pattern="[ァ-ヶー]+" required /></label>
      <label>メイ <input name="mei_kana" pattern="[ァ-ヶー]+" required /></label>
    </div>
  </fieldset>`;
      transformed = transformed.slice(0, insertIdx) + nameBlock + transformed.slice(insertIdx);
    }

    changes.push({
      what: "Reversed name field order to 姓→名 (family→given)",
      why: "Japanese convention places family name first",
    });
    changes.push({
      what: "Added furigana fields (セイ/メイ)",
      why: "Japanese names have multiple possible readings — furigana clarifies pronunciation",
    });
  }

  // 2. Fix single name field
  if (!hadFirstName && !hadLastName) {
    const singleNameRegex = /<label[^>]*>[^<]*(?:full\s*name|name)[^<]*<input[^>]*name=["']?name["']?[^>]*\/?>[^<]*<\/label>/gi;
    if (singleNameRegex.test(transformed)) {
      transformed = transformed.replace(singleNameRegex, `<fieldset>
    <legend>お名前</legend>
    <div ${cls("name-fields")}>
      <label>姓 <input name="sei" pattern="[一-龥ぁ-んァ-ン]+" required /></label>
      <label>名 <input name="mei" pattern="[一-龥ぁ-んァ-ン]+" required /></label>
    </div>
    <div ${cls("furigana-fields")}>
      <label>セイ <input name="sei_kana" pattern="[ァ-ヶー]+" required /></label>
      <label>メイ <input name="mei_kana" pattern="[ァ-ヶー]+" required /></label>
    </div>
  </fieldset>`);
      changes.push({
        what: "Split single name field into 姓/名 + furigana",
        why: "Japanese names require separate family/given fields and katakana furigana for pronunciation",
      });
    }
  }

  // 3. Fix single phone field → 3 fields
  const singlePhoneRegex = /<label[^>]*>[^<]*(?:phone|tel)[^<]*<input[^>]*name=["']?phone["']?[^>]*\/?>[^<]*<\/label>/gi;
  if (singlePhoneRegex.test(transformed)) {
    transformed = transformed.replace(singlePhoneRegex, `<fieldset>
    <legend>電話番号</legend>
    <div ${cls("phone-fields")}>
      <input name="phone1" type="tel" pattern="[0-9]{2,5}" ${maxLen(5)} placeholder="090" />
      <span>-</span>
      <input name="phone2" type="tel" pattern="[0-9]{1,4}" ${maxLen(4)} placeholder="1234" />
      <span>-</span>
      <input name="phone3" type="tel" pattern="[0-9]{4}" ${maxLen(4)} placeholder="5678" />
    </div>
  </fieldset>`);
    changes.push({
      what: "Split phone into 3 fields (XXX-XXXX-XXXX)",
      why: "Japanese phone convention uses 3 separate input fields",
    });
  }

  // 4. Fix address: add postal code if missing
  const hasAddress = /name=["']?(address|street|city)["']?/i.test(transformed);
  const hasPostal = /name=["']?(postal|zip)["']?/i.test(transformed) || /〒|郵便/.test(transformed);

  if (hasAddress && !hasPostal) {
    const addressRegex = /<label[^>]*>[^<]*(?:address|street)[^<]*<input[^>]*name=["']?(address|street)["']?[^>]*\/?>[^<]*<\/label>/i;
    const addressMatch = transformed.match(addressRegex);
    if (addressMatch) {
      const idx = transformed.indexOf(addressMatch[0]);
      const postalBlock = `<fieldset>
    <legend>ご住所</legend>
    <div ${cls("postal-code-field")}>
      <label>〒 郵便番号
        <input name="postal_code" pattern="[0-9]{3}-?[0-9]{4}" ${maxLen(8)} placeholder="150-0001" />
      </label>
      <button type="button" ${cls("postal-lookup-btn")}>住所検索</button>
    </div>
    <label>都道府県
      <select name="prefecture">
        <option value="">選択してください</option>
      </select>
    </label>
    <label>市区町村 <input name="city" /></label>
    <label>番地 <input name="address_line" placeholder="1-2-3" /></label>
    <label>建物名・部屋番号 <input name="building" placeholder="メゾン原宿 301" /></label>
  </fieldset>`;
      transformed = transformed.slice(0, idx) + postalBlock + transformed.slice(idx + addressMatch[0].length);
      changes.push({
        what: "Restructured address to 〒 postal → prefecture → city → block → building",
        why: "Japanese addresses go large-to-small, starting with postal code auto-fill",
      });
    }
  }

  // 5. Fix button text
  const level = getKeigoLevel(context);
  const buttonRegex = /<button([^>]*)>(submit|send|register|sign\s*up|buy|purchase|confirm|next|save)<\/button>/gi;
  const buttonMatches = [...transformed.matchAll(buttonRegex)];
  if (buttonMatches.length > 0) {
    for (const match of buttonMatches) {
      const jpText = getSubmitText(context);
      transformed = transformed.replace(match[0], `<button${match[1]}>${jpText}</button>`);
    }
    changes.push({
      what: `Changed button text to Japanese with ${level} keigo`,
      why: `${level} politeness level appropriate for ${context} context`,
    });
  }

  // 6. Fix Western placeholder data
  const westernPlaceholders = [
    { regex: /placeholder=["']?John["']?/gi, replacement: 'placeholder="太郎"' },
    { regex: /placeholder=["']?Smith["']?/gi, replacement: 'placeholder="田中"' },
    { regex: /placeholder=["']?jane@example\.com["']?/gi, replacement: 'placeholder="tanaka.taro@example.co.jp"' },
    { regex: /placeholder=["']?john@example\.com["']?/gi, replacement: 'placeholder="tanaka.taro@example.co.jp"' },
    { regex: /placeholder=["']?123 Main St["']?/gi, replacement: 'placeholder="神宮前1-2-3"' },
    { regex: /placeholder=["']?New York["']?/gi, replacement: 'placeholder="東京都渋谷区"' },
  ];
  let placeholderChanged = false;
  for (const { regex, replacement } of westernPlaceholders) {
    if (regex.test(transformed)) {
      transformed = transformed.replace(regex, replacement);
      placeholderChanged = true;
    }
  }
  if (placeholderChanged) {
    changes.push({
      what: "Replaced Western placeholder data with Japanese examples",
      why: "Realistic Japanese placeholders help users understand expected input format",
    });
  }

  // Score the transformed version
  const transformedResult = scoreJapanReadiness({
    markup: transformed,
    context,
    include_suggestions: false,
  });

  const improvement = transformedResult.japan_readiness_score - originalResult.japan_readiness_score;

  return {
    original_score: originalResult.japan_readiness_score,
    transformed_score: transformedResult.japan_readiness_score,
    transformed_markup: transformed,
    changes_made: changes,
    improvement: improvement > 0 ? `+${improvement} points` : `${improvement} points`,
  };
}
