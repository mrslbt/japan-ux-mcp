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

const FIRST_NAME_NAME_PATTERN = "(?:first.?name|firstname|first_name|given.?name)";
const LAST_NAME_NAME_PATTERN = "(?:last.?name|lastname|last_name|surname|family.?name)";
const SINGLE_NAME_NAME_PATTERN = "(?:name|full.?name)";
const PHONE_NAME_PATTERN = "(?:phone|tel)";
const ADDRESS_NAME_PATTERN = "(?:address|street)";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractAttribute(attrs: string, name: string): string | null {
  const quoted = attrs.match(new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  if (quoted) return quoted[2];

  const unquoted = attrs.match(new RegExp(`${name}\\s*=\\s*([^\\s>]+)`, "i"));
  return unquoted ? unquoted[1] : null;
}

function extractStylingAttrs(attrs: string, preserveStyling: boolean): string {
  if (!preserveStyling || !attrs) return "";

  const preserved = [
    ...(attrs.match(/\sclass(?:Name)?=(["']).*?\1/gi) || []),
    ...(attrs.match(/\sstyle=(["']).*?\1/gi) || []),
    ...(attrs.match(/\s(?:aria|data)-[\w-]+=(["']).*?\1/gi) || []),
  ];

  return Array.from(new Set(preserved)).join("");
}

function removeAssociatedLabel(markup: string, attrs: string): string {
  let next = markup;
  const labelTargets = [
    extractAttribute(attrs, "id"),
    extractAttribute(attrs, "name"),
  ].filter((value): value is string => Boolean(value));

  for (const target of labelTargets) {
    const labelRegex = new RegExp(
      `<label[^>]*for=["']?${escapeRegex(target)}["']?[^>]*>[\\s\\S]*?<\\/label>\\s*`,
      "i"
    );
    next = next.replace(labelRegex, "");
  }

  return next;
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

  const firstNameWrappedRegex = new RegExp(
    `<label[^>]*>[\\s\\S]*?<input[^>]*name=["']?${FIRST_NAME_NAME_PATTERN}["']?[^>]*\\/?>[\\s\\S]*?<\\/label>`,
    "gi"
  );
  const lastNameWrappedRegex = new RegExp(
    `<label[^>]*>[\\s\\S]*?<input[^>]*name=["']?${LAST_NAME_NAME_PATTERN}["']?[^>]*\\/?>[\\s\\S]*?<\\/label>`,
    "gi"
  );
  const singleNameWrappedRegex = new RegExp(
    `<label[^>]*>[\\s\\S]*?<input[^>]*name=["']?${SINGLE_NAME_NAME_PATTERN}["']?[^>]*\\/?>[\\s\\S]*?<\\/label>`,
    "gi"
  );
  const singlePhoneWrappedRegex = new RegExp(
    `<label[^>]*>[\\s\\S]*?<input[^>]*name=["']?${PHONE_NAME_PATTERN}["']?[^>]*\\/?>[\\s\\S]*?<\\/label>`,
    "gi"
  );
  const addressWrappedRegex = new RegExp(
    `<label[^>]*>[\\s\\S]*?<input[^>]*name=["']?${ADDRESS_NAME_PATTERN}["']?[^>]*\\/?>[\\s\\S]*?<\\/label>`,
    "gi"
  );

  const firstNameInputRegex = new RegExp(
    `<input\\b([^>]*\\bname=["']?${FIRST_NAME_NAME_PATTERN}["']?[^>]*)\\/?>`,
    "i"
  );
  const lastNameInputRegex = new RegExp(
    `<input\\b([^>]*\\bname=["']?${LAST_NAME_NAME_PATTERN}["']?[^>]*)\\/?>`,
    "i"
  );
  const singleNameInputRegex = new RegExp(
    `<input\\b([^>]*\\bname=["']?${SINGLE_NAME_NAME_PATTERN}["']?[^>]*)\\/?>`,
    "i"
  );
  const singlePhoneInputRegex = new RegExp(
    `<input\\b([^>]*\\bname=["']?${PHONE_NAME_PATTERN}["']?[^>]*)\\/?>`,
    "i"
  );
  const addressInputRegex = new RegExp(
    `<input\\b([^>]*\\bname=["']?${ADDRESS_NAME_PATTERN}["']?[^>]*)\\/?>`,
    "i"
  );

  // 1. Fix name fields: firstName/lastName → sei/mei
  const firstNameInputMatch = transformed.match(firstNameInputRegex);
  const lastNameInputMatch = transformed.match(lastNameInputRegex);
  const hadFirstName = Boolean(firstNameInputMatch);
  const hadLastName = Boolean(lastNameInputMatch);

  if (hadFirstName || hadLastName) {
    const firstNameAttrs = extractStylingAttrs(firstNameInputMatch?.[1] || "", preserve_styling);
    const lastNameAttrs = extractStylingAttrs(lastNameInputMatch?.[1] || "", preserve_styling);
    const furiganaAttrs = firstNameAttrs || lastNameAttrs;

    transformed = transformed.replace(firstNameWrappedRegex, "");
    transformed = transformed.replace(lastNameWrappedRegex, "");

    if (firstNameInputMatch) {
      transformed = removeAssociatedLabel(transformed, firstNameInputMatch[1] || "");
      transformed = transformed.replace(firstNameInputMatch[0], "");
    }
    if (lastNameInputMatch) {
      transformed = removeAssociatedLabel(transformed, lastNameInputMatch[1] || "");
      transformed = transformed.replace(lastNameInputMatch[0], "");
    }

    // Find insertion point (after form tag or first fieldset)
    const insertAfter = transformed.match(/<form[^>]*>/i);
    if (insertAfter) {
      const insertIdx = transformed.indexOf(insertAfter[0]) + insertAfter[0].length;
      const nameBlock = `
  <fieldset>
    <legend>お名前</legend>
    <div ${cls("name-fields")}>
      <label>姓 <input name="sei"${lastNameAttrs} pattern="[一-龥ぁ-んァ-ヶー々〇]+" required /></label>
      <label>名 <input name="mei"${firstNameAttrs} pattern="[一-龥ぁ-んァ-ヶー々〇]+" required /></label>
    </div>
    <div ${cls("furigana-fields")}>
      <label>セイ <input name="sei_kana"${furiganaAttrs} pattern="[ァ-ヶー]+" required /></label>
      <label>メイ <input name="mei_kana"${furiganaAttrs} pattern="[ァ-ヶー]+" required /></label>
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
    const singleNameInputMatch = transformed.match(singleNameInputRegex);
    if (singleNameInputMatch) {
      const nameAttrs = extractStylingAttrs(singleNameInputMatch[1] || "", preserve_styling);
      transformed = transformed.replace(singleNameWrappedRegex, "");
      transformed = removeAssociatedLabel(transformed, singleNameInputMatch[1] || "");
      transformed = transformed.replace(singleNameInputMatch[0], `<fieldset>
    <legend>お名前</legend>
    <div ${cls("name-fields")}>
      <label>姓 <input name="sei"${nameAttrs} pattern="[一-龥ぁ-んァ-ヶー々〇]+" required /></label>
      <label>名 <input name="mei"${nameAttrs} pattern="[一-龥ぁ-んァ-ヶー々〇]+" required /></label>
    </div>
    <div ${cls("furigana-fields")}>
      <label>セイ <input name="sei_kana"${nameAttrs} pattern="[ァ-ヶー]+" required /></label>
      <label>メイ <input name="mei_kana"${nameAttrs} pattern="[ァ-ヶー]+" required /></label>
    </div>
  </fieldset>`);
      changes.push({
        what: "Split single name field into 姓/名 + furigana",
        why: "Japanese names require separate family/given fields and katakana furigana for pronunciation",
      });
    }
  }

  // 3. Fix single phone field → 3 fields
  const singlePhoneInputMatch = transformed.match(singlePhoneInputRegex);
  if (singlePhoneInputMatch) {
    const phoneAttrs = extractStylingAttrs(singlePhoneInputMatch[1] || "", preserve_styling);
    transformed = transformed.replace(singlePhoneWrappedRegex, "");
    transformed = removeAssociatedLabel(transformed, singlePhoneInputMatch[1] || "");
    transformed = transformed.replace(singlePhoneInputMatch[0], `<fieldset>
    <legend>電話番号</legend>
    <div ${cls("phone-fields")}>
      <input name="phone1" type="tel"${phoneAttrs} pattern="[0-9]{2,5}" ${maxLen(5)} placeholder="090" />
      <span>-</span>
      <input name="phone2" type="tel"${phoneAttrs} pattern="[0-9]{1,4}" ${maxLen(4)} placeholder="1234" />
      <span>-</span>
      <input name="phone3" type="tel"${phoneAttrs} pattern="[0-9]{4}" ${maxLen(4)} placeholder="5678" />
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
  const addressInputMatch = transformed.match(addressInputRegex);

  if (hasAddress && !hasPostal && addressInputMatch) {
    const addressAttrs = extractStylingAttrs(addressInputMatch[1] || "", preserve_styling);
    const postalBlock = `<fieldset>
    <legend>ご住所</legend>
    <div ${cls("postal-code-field")}>
      <label>〒 郵便番号
        <input name="postal_code"${addressAttrs} pattern="[0-9]{3}-?[0-9]{4}" ${maxLen(8)} placeholder="150-0001" />
      </label>
      <button type="button" ${cls("postal-lookup-btn")}>住所検索</button>
    </div>
    <label>都道府県
      <select name="prefecture"${addressAttrs}>
        <option value="">選択してください</option>
      </select>
    </label>
    <label>市区町村 <input name="city"${addressAttrs} /></label>
    <label>番地 <input name="address_line"${addressAttrs} placeholder="1-2-3" /></label>
    <label>建物名・部屋番号 <input name="building"${addressAttrs} placeholder="メゾン原宿 301" /></label>
  </fieldset>`;
    transformed = transformed.replace(addressWrappedRegex, "");
    transformed = removeAssociatedLabel(transformed, addressInputMatch[1] || "");
    transformed = transformed.replace(addressInputMatch[0], postalBlock);
    changes.push({
      what: "Restructured address to 〒 postal → prefecture → city → block → building",
      why: "Japanese addresses go large-to-small, starting with postal code auto-fill",
    });
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
