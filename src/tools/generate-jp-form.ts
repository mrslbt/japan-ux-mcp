import { getKeigoLevel, type Context, type KeigoLevel } from "../data/keigo-patterns.js";

type FormType = "registration" | "contact" | "checkout" | "inquiry" | "login";
type FieldType = "name" | "email" | "phone" | "address" | "date_of_birth" | "company";
type Format = "html" | "jsx" | "tsx";
type Language = "ja" | "en" | "bilingual";

export interface GenerateFormParams {
  type: FormType;
  context: Context;
  fields: FieldType[];
  format: Format;
  include_validation: boolean;
  include_labels: boolean;
  language: Language;
}

function getButtonText(type: FormType, level: KeigoLevel): string {
  const buttons: Record<FormType, Record<KeigoLevel, string>> = {
    registration: {
      casual: "登録する",
      neutral: "登録する",
      formal: "ご登録内容を確認する",
      very_formal: "お申し込み内容を確認する",
    },
    contact: {
      casual: "送信",
      neutral: "送信する",
      formal: "お問い合わせを送信する",
      very_formal: "お問い合わせ内容をご確認",
    },
    checkout: {
      casual: "買う",
      neutral: "購入する",
      formal: "ご購入手続きへ",
      very_formal: "ご購入手続きへ進む",
    },
    inquiry: {
      casual: "送信",
      neutral: "送信する",
      formal: "お問い合わせ内容を確認する",
      very_formal: "お問い合わせ内容をご確認",
    },
    login: {
      casual: "ログイン",
      neutral: "ログイン",
      formal: "ログイン",
      very_formal: "ログイン",
    },
  };
  return buttons[type][level];
}

function label(field: string, language: Language): string {
  const labels: Record<string, { ja: string; en: string }> = {
    sei: { ja: "姓", en: "Family Name" },
    mei: { ja: "名", en: "Given Name" },
    sei_kana: { ja: "セイ", en: "Family Name (Katakana)" },
    mei_kana: { ja: "メイ", en: "Given Name (Katakana)" },
    email: { ja: "メールアドレス", en: "Email Address" },
    phone: { ja: "電話番号", en: "Phone Number" },
    postal_code: { ja: "郵便番号", en: "Postal Code" },
    prefecture: { ja: "都道府県", en: "Prefecture" },
    city: { ja: "市区町村", en: "City" },
    address_line: { ja: "番地", en: "Street Address" },
    building: { ja: "建物名・部屋番号", en: "Building / Room" },
    year: { ja: "年", en: "Year" },
    month: { ja: "月", en: "Month" },
    day: { ja: "日", en: "Day" },
    company: { ja: "会社名", en: "Company Name" },
    name: { ja: "お名前", en: "Full Name" },
    address: { ja: "ご住所", en: "Address" },
    dob: { ja: "生年月日", en: "Date of Birth" },
  };
  const l = labels[field] || { ja: field, en: field };
  if (language === "bilingual") return `${l.ja} (${l.en})`;
  return language === "ja" ? l.ja : l.en;
}

export function generateJpForm(params: GenerateFormParams): { markup: string; notes: string[] } {
  const { type, context, fields, format, include_validation, include_labels, language } = params;
  const isJsx = format === "jsx" || format === "tsx";
  const level = getKeigoLevel(context);
  const buttonText = getButtonText(type, level);
  const cls = (name: string) => isJsx ? `className="${name}"` : `class="${name}"`;
  const maxLen = (n: number) => isJsx ? `maxLength={${n}}` : `maxlength="${n}"`;
  const i = "  ";
  const lines: string[] = [];
  const notes: string[] = [];

  lines.push(`<form${isJsx ? "" : ' action="" method="POST"'}>`);

  for (const field of fields) {
    lines.push("");

    switch (field) {
      case "name": {
        lines.push(`${i}<fieldset>`);
        if (include_labels) lines.push(`${i}${i}<legend>${label("name", language)}</legend>`);
        lines.push(`${i}${i}<div ${cls("name-fields")}>`);
        const valAttr = include_validation ? ' pattern="[一-龥ぁ-んァ-ン]+"' : "";
        lines.push(`${i}${i}${i}<label>${label("sei", language)} <input name="sei"${valAttr} required /></label>`);
        lines.push(`${i}${i}${i}<label>${label("mei", language)} <input name="mei"${valAttr} required /></label>`);
        lines.push(`${i}${i}</div>`);
        lines.push(`${i}${i}<div ${cls("furigana-fields")}>`);
        const kanaAttr = include_validation ? ' pattern="[ァ-ヶー]+"' : "";
        lines.push(`${i}${i}${i}<label>${label("sei_kana", language)} <input name="sei_kana"${kanaAttr} required /></label>`);
        lines.push(`${i}${i}${i}<label>${label("mei_kana", language)} <input name="mei_kana"${kanaAttr} required /></label>`);
        lines.push(`${i}${i}</div>`);
        lines.push(`${i}</fieldset>`);
        notes.push("Name fields use 姓→名 (family→given) order with katakana furigana for reading clarification.");
        break;
      }

      case "email": {
        lines.push(`${i}<label>${include_labels ? label("email", language) : ""}`);
        const emailAttr = include_validation ? ' type="email"' : "";
        lines.push(`${i}${i}<input name="email"${emailAttr} ${cls("input-email")} placeholder="example@example.co.jp" required />`);
        lines.push(`${i}</label>`);
        notes.push("Email uses half-width validation. Auto-convert full-width ＠ → @ on input.");
        break;
      }

      case "phone": {
        lines.push(`${i}<fieldset>`);
        if (include_labels) lines.push(`${i}${i}<legend>${label("phone", language)}</legend>`);
        lines.push(`${i}${i}<div ${cls("phone-fields")}>`);
        if (include_validation) {
          lines.push(`${i}${i}${i}<input name="phone1" type="tel" pattern="[0-9]{2,5}" ${maxLen(5)} placeholder="090" />`);
          lines.push(`${i}${i}${i}<span>-</span>`);
          lines.push(`${i}${i}${i}<input name="phone2" type="tel" pattern="[0-9]{1,4}" ${maxLen(4)} placeholder="1234" />`);
          lines.push(`${i}${i}${i}<span>-</span>`);
          lines.push(`${i}${i}${i}<input name="phone3" type="tel" pattern="[0-9]{4}" ${maxLen(4)} placeholder="5678" />`);
        } else {
          lines.push(`${i}${i}${i}<input name="phone1" type="tel" placeholder="090" />`);
          lines.push(`${i}${i}${i}<span>-</span>`);
          lines.push(`${i}${i}${i}<input name="phone2" type="tel" placeholder="1234" />`);
          lines.push(`${i}${i}${i}<span>-</span>`);
          lines.push(`${i}${i}${i}<input name="phone3" type="tel" placeholder="5678" />`);
        }
        lines.push(`${i}${i}</div>`);
        lines.push(`${i}</fieldset>`);
        notes.push("Phone uses 3-field format: area code (2-5 digits) - exchange (1-4) - subscriber (4).");
        break;
      }

      case "address": {
        lines.push(`${i}<fieldset>`);
        if (include_labels) lines.push(`${i}${i}<legend>${label("address", language)}</legend>`);
        // Postal code
        lines.push(`${i}${i}<div ${cls("postal-code-field")}>`);
        lines.push(`${i}${i}${i}<label>〒 ${label("postal_code", language)}`);
        const postalAttr = include_validation ? ` pattern="[0-9]{3}-?[0-9]{4}" ${maxLen(8)}` : "";
        lines.push(`${i}${i}${i}${i}<input name="postal_code"${postalAttr} placeholder="150-0001" />`);
        lines.push(`${i}${i}${i}</label>`);
        lines.push(`${i}${i}${i}<button type="button" ${cls("postal-lookup-btn")}>${language === "en" ? "Auto-fill" : "住所検索"}</button>`);
        lines.push(`${i}${i}</div>`);
        // Prefecture
        lines.push(`${i}${i}<label>${label("prefecture", language)}`);
        lines.push(`${i}${i}${i}<select name="prefecture">`);
        lines.push(`${i}${i}${i}${i}<option value="">${language === "en" ? "Select" : "選択してください"}</option>`);
        lines.push(`${i}${i}${i}${i}<!-- 47 prefectures auto-populated by postal code lookup -->`);
        lines.push(`${i}${i}${i}</select>`);
        lines.push(`${i}${i}</label>`);
        // City / Block / Building
        lines.push(`${i}${i}<label>${label("city", language)} <input name="city" /></label>`);
        lines.push(`${i}${i}<label>${label("address_line", language)} <input name="address_line" placeholder="1-2-3" /></label>`);
        lines.push(`${i}${i}<label>${label("building", language)} <input name="building" placeholder="${language === "en" ? "Apt 301" : "メゾン原宿 301"}" /></label>`);
        lines.push(`${i}</fieldset>`);
        notes.push("Address uses 〒 postal code → prefecture → city → block → building (large-to-small). Wire postal code to auto-fill via zipcloud API.");
        break;
      }

      case "date_of_birth": {
        lines.push(`${i}<fieldset>`);
        if (include_labels) lines.push(`${i}${i}<legend>${label("dob", language)}</legend>`);
        lines.push(`${i}${i}<div ${cls("date-fields")}>`);
        const minMax = include_validation ? ' min="1900" max="2026"' : "";
        lines.push(`${i}${i}${i}<label>${label("year", language)} <input name="birth_year" type="number"${minMax} placeholder="1990" /></label>`);
        lines.push(`${i}${i}${i}<label>${label("month", language)} <input name="birth_month" type="number"${include_validation ? ' min="1" max="12"' : ""} placeholder="1" /></label>`);
        lines.push(`${i}${i}${i}<label>${label("day", language)} <input name="birth_day" type="number"${include_validation ? ' min="1" max="31"' : ""} placeholder="1" /></label>`);
        lines.push(`${i}${i}</div>`);
        lines.push(`${i}${i}<p ${cls("era-display")}><!-- Era display: e.g. 平成2年 --></p>`);
        lines.push(`${i}</fieldset>`);
        notes.push("Date uses 年/月/日 format with optional era (令和/平成) display. Year field auto-calculates Japanese era.");
        break;
      }

      case "company": {
        lines.push(`${i}<label>${include_labels ? label("company", language) : ""}`);
        lines.push(`${i}${i}<input name="company" placeholder="株式会社○○" />`);
        lines.push(`${i}</label>`);
        break;
      }
    }
  }

  lines.push("");
  lines.push(`${i}<button type="submit">${buttonText}</button>`);
  lines.push(`</form>`);

  notes.push(`Keigo level: ${level} (based on ${context} context).`);
  notes.push(`Button text "${buttonText}" matches the ${level} politeness level.`);

  return { markup: lines.join("\n"), notes };
}
