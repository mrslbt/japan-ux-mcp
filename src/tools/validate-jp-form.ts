import type { Context } from "../data/keigo-patterns.js";

interface ValidationIssue {
  field: string;
  severity: "critical" | "high" | "medium" | "low";
  issue: string;
  fix: string;
  code_suggestion?: string;
}

export interface ValidateFormParams {
  form_markup: string;
  context: Context;
}

export interface ValidateFormResult {
  score: number;
  issues: ValidationIssue[];
  passed: string[];
}

export function validateJpForm(params: ValidateFormParams): ValidateFormResult {
  const { form_markup, context } = params;
  const issues: ValidationIssue[] = [];
  const passed: string[] = [];
  const lower = form_markup.toLowerCase();

  // --- Name field checks ---
  const hasWesternFirst = /name=["']?(first.?name|firstname|first_name)["']?/i.test(form_markup);
  const hasWesternLast = /name=["']?(last.?name|lastname|last_name)["']?/i.test(form_markup);
  const hasSei = /name=["']?sei["']?/i.test(form_markup);
  const hasMei = /name=["']?mei["']?/i.test(form_markup);
  const hasSingleName = /name=["']?name["']?/i.test(form_markup) && !hasSei && !hasMei && !hasWesternFirst;

  if (hasSingleName) {
    issues.push({
      field: "name",
      severity: "critical",
      issue: "Single name field. Japanese forms always split into 姓 (family name) and 名 (given name).",
      fix: "Split into two fields: 姓 (sei) and 名 (mei). Japanese users expect separate fields.",
      code_suggestion: '<label>姓 <input name="sei" required /></label>\n<label>名 <input name="mei" required /></label>',
    });
  } else if (hasWesternFirst || hasWesternLast) {
    issues.push({
      field: "name",
      severity: "critical",
      issue: 'Name field uses Western order (first/last). Japanese forms use 姓 (family) then 名 (given).',
      fix: "Reverse field order. Label as 姓 and 名. Use name='sei' and name='mei'.",
      code_suggestion: '<label>姓 <input name="sei" /></label>\n<label>名 <input name="mei" /></label>',
    });
  } else if (hasSei && hasMei) {
    passed.push("Name fields: Correct 姓/名 (family/given) order");
  }

  // --- Furigana check ---
  const hasNameFields = hasWesternFirst || hasWesternLast || hasSei || hasMei || hasSingleName;
  const hasFurigana = /name=["']?(sei_kana|mei_kana|furigana|kana)/i.test(form_markup) || /フリガナ|ふりがな/.test(form_markup);

  if (hasNameFields && !hasFurigana) {
    issues.push({
      field: "name",
      severity: "critical",
      issue: "Missing furigana fields. Required for Japanese names (multiple readings possible).",
      fix: "Add katakana furigana fields below name fields.",
      code_suggestion: '<label>セイ <input name="sei_kana" pattern="[ァ-ヶー]+" /></label>\n<label>メイ <input name="mei_kana" pattern="[ァ-ヶー]+" /></label>',
    });
  } else if (hasFurigana) {
    passed.push("Furigana fields: Present");
  }

  // --- Phone check ---
  const phoneMatches = form_markup.match(/name=["']?phone/gi) || [];
  if (phoneMatches.length === 1) {
    issues.push({
      field: "phone",
      severity: "high",
      issue: "Single phone input. Japanese convention uses 3 separate fields.",
      fix: "Split into 3 fields: area code (2-5 digits), exchange (1-4 digits), subscriber (4 digits).",
      code_suggestion: '<input name="phone1" pattern="[0-9]{2,5}" maxlength="5" />\n<span>-</span>\n<input name="phone2" pattern="[0-9]{1,4}" maxlength="4" />\n<span>-</span>\n<input name="phone3" pattern="[0-9]{4}" maxlength="4" />',
    });
  } else if (phoneMatches.length >= 3) {
    passed.push("Phone fields: Correct 3-field format");
  }

  // --- Address / Postal code check ---
  const hasPostalCode = /name=["']?(postal.?code|zip.?code|postal|zip|yuubin)["']?/i.test(form_markup) || /〒|郵便番号/.test(form_markup);
  const hasAddress = /name=["']?(address|city|prefecture|street|addr)["']?/i.test(form_markup) || /住所|都道府県|市区町村/.test(form_markup);

  if (hasAddress && !hasPostalCode) {
    issues.push({
      field: "address",
      severity: "high",
      issue: "Missing postal code auto-fill. Japanese users expect 〒 code to populate prefecture and city.",
      fix: 'Add 〒 postal code field (XXX-XXXX format) with auto-fill for 都道府県 and 市区町村.',
      code_suggestion: '<label>〒 郵便番号 <input name="postal_code" pattern="[0-9]{3}-?[0-9]{4}" placeholder="150-0001" /></label>',
    });
  } else if (hasPostalCode) {
    passed.push("Postal code field: Present");
  }

  // --- Prefecture check ---
  const hasPrefecture = /name=["']?prefecture["']?/i.test(form_markup) || /都道府県/.test(form_markup);
  if (hasAddress && !hasPrefecture) {
    issues.push({
      field: "address",
      severity: "medium",
      issue: "Missing dedicated prefecture (都道府県) field. Japanese addresses require a hierarchical structure: 〒 → prefecture → city → block → building.",
      fix: "Add prefecture dropdown. Should auto-populate from postal code.",
    });
  }

  // --- Email check ---
  const hasEmail = /type=["']?email["']?/i.test(form_markup) || /name=["']?email["']?/i.test(form_markup);
  if (hasEmail) {
    passed.push("Email field: OK");
  }

  // --- Full-width character validation ---
  const hasNumericFields = /name=["']?(phone|postal|zip|email)["']?/i.test(form_markup);
  const hasPatterns = /pattern=/.test(form_markup);
  if (hasNumericFields && !hasPatterns) {
    issues.push({
      field: "input_validation",
      severity: "medium",
      issue: "No pattern validation on numeric/email fields. Users may enter full-width characters (０１２ instead of 012, ＠ instead of @).",
      fix: "Add pattern attributes and auto-convert full-width to half-width on input.",
    });
  }

  // --- Button text check ---
  const submitMatch = form_markup.match(/<button[^>]*type=["']?submit["']?[^>]*>(.*?)<\/button>/i)
    || form_markup.match(/<button[^>]*>(.*?)<\/button>/i);
  if (submitMatch) {
    const btnText = submitMatch[1].replace(/<[^>]*>/g, "").trim();
    if (/^(submit|send|register|sign\s*up|next|continue|save|ok|go)$/i.test(btnText)) {
      issues.push({
        field: "button",
        severity: "medium",
        issue: `Button text "${btnText}" is English. Japanese users expect Japanese labels with appropriate keigo for ${context} context.`,
        fix: "Translate button text to Japanese with context-appropriate politeness level.",
      });
    } else if (/[\u3000-\u9fff]/.test(btnText)) {
      passed.push(`Submit button: "${btnText}" (Japanese text present)`);
    }
  }

  // --- Date field check ---
  const hasDateField = /type=["']?date["']?/i.test(form_markup) || /name=["']?.*date.*["']?/i.test(form_markup);
  if (hasDateField && !/年|月|日|birth_year|birth_month|birth_day/.test(form_markup)) {
    issues.push({
      field: "date",
      severity: "low",
      issue: "Date field uses single input. Japanese convention uses separate 年/月/日 fields with optional era display.",
      fix: "Split into year/month/day fields. Consider showing Japanese era (令和/平成) alongside Gregorian year.",
    });
  }

  // --- Calculate score ---
  const deductions: Record<string, number> = { critical: 20, high: 12, medium: 5, low: 2 };
  const totalDeduction = issues.reduce((sum, issue) => sum + deductions[issue.severity], 0);
  const score = Math.max(0, 100 - totalDeduction);

  return { score, issues, passed };
}
