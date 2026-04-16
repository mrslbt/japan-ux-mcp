export interface WidthRule {
  field: string;
  requiredWidth: "full-width" | "half-width" | "either";
  pattern?: string;
  note: string;
}

export const WIDTH_RULES: WidthRule[] = [
  {
    field: "katakana_furigana",
    requiredWidth: "full-width",
    pattern: "[ァ-ヶー]",
    note: "Furigana fields always require full-width katakana",
  },
  {
    field: "phone_number",
    requiredWidth: "half-width",
    pattern: "[0-9]",
    note: "Phone numbers require half-width digits (not ０１２)",
  },
  {
    field: "postal_code",
    requiredWidth: "half-width",
    pattern: "[0-9]",
    note: "Postal codes require half-width digits",
  },
  {
    field: "email",
    requiredWidth: "half-width",
    pattern: "[a-zA-Z0-9@._+\\-]",
    note: "Email must be half-width. Common error: users type ＠ instead of @",
  },
  {
    field: "name_kanji",
    requiredWidth: "full-width",
    note: "Japanese name fields accept full-width kanji, hiragana, katakana",
  },
  {
    field: "address_numbers",
    requiredWidth: "either",
    note: "Block/building numbers can be either. Best practice: auto-convert to half-width.",
  },
];

/**
 * Convert full-width digits (０１２) to half-width (012)
 */
export function fullwidthToHalfwidth(str: string): string {
  return str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
}

/**
 * Convert full-width ASCII (Ａ-Ｚ, ａ-ｚ, ＠) to half-width
 */
export function fullwidthAsciiToHalfwidth(str: string): string {
  return str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/＠/g, "@")
    .replace(/．/g, ".")
    .replace(/＿/g, "_")
    .replace(/ー/g, "-");
}

/**
 * Check if string contains only full-width katakana (for furigana validation)
 */
export function isFullWidthKatakana(str: string): boolean {
  return /^[ァ-ヶー\s]+$/.test(str);
}

/**
 * Check if string contains only half-width digits
 */
export function isHalfWidthDigits(str: string): boolean {
  return /^[0-9]+$/.test(str);
}
