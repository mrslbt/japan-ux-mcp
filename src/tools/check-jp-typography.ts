import { JP_FONT_STACKS, TYPE_SCALE } from "../data/typography-rules.js";

interface TypoIssue {
  rule_id: string;
  severity: "error" | "warning" | "info";
  message: string;
  fix: string;
  css_suggestion?: string;
}

export interface CheckTypographyParams {
  css: string;
  markup?: string;
  context?: "corporate" | "editorial" | "casual" | "luxury";
}

export interface CheckTypographyResult {
  score: number;
  issues: TypoIssue[];
  passed: string[];
  font_stack_recommendation: string;
  type_scale_reference: typeof TYPE_SCALE;
}

export function checkJpTypography(params: CheckTypographyParams): CheckTypographyResult {
  const { css, markup, context } = params;
  const lower = css.toLowerCase();
  const markupLower = (markup || "").toLowerCase();
  const issues: TypoIssue[] = [];
  const passed: string[] = [];
  let score = 100;

  // Check for italics on Japanese text
  if (/font-style\s*:\s*italic/i.test(css)) {
    issues.push({
      rule_id: "hierarchy_no_italics",
      severity: "error",
      message: "font-style: italic detected. Japanese has no native italic forms. Browser-faked slanting looks broken.",
      fix: "Remove font-style: italic for Japanese text. Use font-weight, color, or size for emphasis instead.",
      css_suggestion: "font-style: normal;",
    });
    score -= 15;
  } else {
    passed.push("No italics on Japanese text");
  }

  // Check line-height (unitless values only; px/%/em values are skipped —
  // they cannot be judged without knowing the font-size they apply to)
  const lineHeightMatches = css.matchAll(/line-height\s*:\s*([0-9.]+)(px|%|r?em)?/gi);
  let hasGoodLineHeight = false;
  for (const match of lineHeightMatches) {
    if (match[2]) continue; // skip unit-bearing values
    const val = parseFloat(match[1]);
    if (val > 0 && val < 1.5) {
      issues.push({
        rule_id: "line_height_body",
        severity: "error",
        message: `line-height: ${val} is genuinely cramped for Japanese text. Below 1.5, dense kanji lines become hard to read.`,
        fix: "Use line-height 1.7-2.0 for Japanese body text.",
        css_suggestion: "line-height: 1.8;",
      });
      score -= 15;
    } else if (val >= 1.5 && val < 1.7) {
      issues.push({
        rule_id: "line_height_body",
        severity: "warning",
        message: `line-height: ${val} is tight if applied to body text (fine for headings). 1.7-2.0 is the recommended range for Japanese body text.`,
        fix: "If this applies to body text, increase to 1.7-2.0.",
        css_suggestion: "line-height: 1.8;",
      });
      score -= 5;
    } else if (val >= 1.7) {
      hasGoodLineHeight = true;
    }
  }
  if (hasGoodLineHeight) {
    passed.push("Line-height meets Japanese body-text recommendation (1.7+)");
  }

  // Check font size
  const fontSizeMatchesArr = [...css.matchAll(/font-size\s*:\s*(\d+)px/gi)];
  let hasSmallFont = false;
  for (const match of fontSizeMatchesArr) {
    const size = parseInt(match[1]);
    if (size < 12) {
      issues.push({
        rule_id: "sizing_kanji_minimum",
        severity: "error",
        message: `font-size: ${size}px is below the 12px floor. Complex kanji become illegible below 12px, even in captions.`,
        fix: "Increase to at least 12px (captions/fine print) — 14px minimum and 16px recommended for body text.",
        css_suggestion: "font-size: 16px;",
      });
      score -= 15;
      hasSmallFont = true;
    } else if (size >= 12 && size < 14) {
      issues.push({
        rule_id: "sizing_kanji_minimum",
        severity: "warning",
        message: `font-size: ${size}px is acceptable for captions and legal fine print only. Body text needs 14px minimum, 16px recommended.`,
        fix: "Confirm this size is used only for captions/fine print. Use 16px for body text (14px minimum).",
      });
      score -= 5;
      hasSmallFont = true;
    } else if (size >= 14 && size < 16) {
      issues.push({
        rule_id: "sizing_body_minimum",
        severity: "warning",
        message: `font-size: ${size}px meets the 14px body minimum but is below the 16px recommended body floor.`,
        fix: "Use 16px for body text where possible.",
      });
      score -= 5;
    }
  }
  // Only claim the pass when nothing in the 12-13px caution band fired either —
  // a warning and this pass line in the same report contradict each other.
  if (!hasSmallFont && fontSizeMatchesArr.length > 0) {
    passed.push("Font sizes meet kanji readability minimum");
  }

  // Check font-family for Japanese fonts
  if (/font-family/i.test(css)) {
    const hasJpFont = /noto\s*sans\s*jp|noto\s*serif\s*jp|hiragino|yu\s*gothic|yuGothic|yu\s*mincho|meiryo|biz\s*ud|メイリオ|游ゴシック|m\s*plus|zen\s*(kaku|maru|old)/i.test(css);
    if (!hasJpFont) {
      issues.push({
        rule_id: "font_stack_system",
        severity: "error",
        message: "No Japanese font specified in font-family. Japanese characters will fall back to system defaults with unpredictable results.",
        fix: 'Add a Japanese font to the stack. Place it after the English font: "Inter", "Noto Sans JP", sans-serif',
        css_suggestion: 'font-family: "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif;',
      });
      score -= 15;
    } else {
      passed.push("Japanese font specified in font-family");

      // Check if EN font is listed before JP font (correct pattern)
      const fontFamilyMatch = css.match(/font-family\s*:[^;]+/i);
      if (fontFamilyMatch) {
        const stack = fontFamilyMatch[0];
        const jpFontPos = stack.search(/noto\s*sans\s*jp|noto\s*serif\s*jp|hiragino|yu\s*gothic|yu\s*mincho|meiryo|biz\s*ud|m\s*plus|zen\s*(kaku|maru|old)/i);
        const enFontPos = stack.search(/inter|poppins|roboto|josefin|nunito|dm\s*sans/i);
        if (enFontPos > -1 && jpFontPos > -1 && enFontPos < jpFontPos) {
          passed.push("English font listed before Japanese font (correct cascade)");
        }
      }
    }
  }

  // Check kinsoku shori control (line-break). Browsers apply default kinsoku
  // to Japanese text automatically; line-break: strict opts into stricter rules.
  if (/line-break\s*:\s*strict/i.test(css)) {
    passed.push("line-break: strict enabled (strict kinsoku: small kana, prolonged sound mark)");
  } else if (/line-break\s*:/i.test(css)) {
    passed.push("line-break set (kinsoku strictness controlled explicitly)");
  } else {
    issues.push({
      rule_id: "wrapping_kinsoku",
      severity: "info",
      message: "line-break not set. Browsers apply default kinsoku shori automatically; line-break: strict opts into stricter rules (small kana, prolonged sound mark).",
      fix: "Consider line-break: strict on Japanese body text for stricter kinsoku.",
      css_suggestion: "line-break: strict;",
    });
  }

  // word-break: break-all actively defeats kinsoku shori: it permits breaks at
  // any character, including placing 。 and 、 at line starts, which JIS X 4051
  // line-breaking rules prohibit.
  if (/word-break\s*:\s*break-all/i.test(css)) {
    issues.push({
      rule_id: "wrapping_break_all",
      severity: "error",
      message: "word-break: break-all detected. This breaks embedded Latin words, URLs, and codes at any character mid-word. (Punctuation kinsoku is governed by line-break, not word-break.)",
      fix: "Remove word-break: break-all from Japanese text. Use overflow-wrap: break-word for long-string safety and line-break: strict for kinsoku.",
      css_suggestion: "word-break: normal; overflow-wrap: break-word; line-break: strict;",
    });
    score -= 12;
  }

  // word-break: keep-all on spaceless Japanese body text can prevent wrapping
  // entirely and cause overflow (it is primarily designed for Korean).
  if (/word-break\s*:\s*keep-all/i.test(css)) {
    issues.push({
      rule_id: "wrapping_word_break",
      severity: "warning",
      message: "word-break: keep-all detected. On long spaceless Japanese body text this can prevent wrapping and cause horizontal overflow (it is primarily for Korean). Acceptable for short headings combined with <wbr>.",
      fix: "Remove keep-all from Japanese body text; keep it only on short headings with explicit <wbr> break points.",
      css_suggestion: "line-break: strict; /* body text */",
    });
    score -= 3;
  }

  // Check for overflow-wrap fallback
  if (/overflow-wrap\s*:\s*break-word/i.test(css) || /word-wrap\s*:\s*break-word/i.test(css)) {
    passed.push("overflow-wrap: break-word fallback present");
  } else {
    issues.push({
      rule_id: "wrapping_overflow",
      severity: "info",
      message: "overflow-wrap: break-word not set. Long URLs or codes may overflow containers.",
      fix: "Add overflow-wrap: break-word as a safety net for long unbroken strings.",
      css_suggestion: "overflow-wrap: break-word;",
    });
    score -= 3;
  }

  // Check for font-feature-settings: "palt"
  if (/font-feature-settings\s*:.*palt/i.test(css)) {
    passed.push('font-feature-settings: "palt" enabled (proportional alternates)');
  } else {
    // Suggestion only — palt is a headings/display refinement, not a requirement.
    issues.push({
      rule_id: "spacing_palt",
      severity: "info",
      message: 'font-feature-settings: "palt" not detected. Optional refinement: heading punctuation spacing may look mechanical without it.',
      fix: 'Consider font-feature-settings: "palt" with font-kerning: normal on headings/display text only. Body text should keep full-width metrics.',
      css_suggestion: 'font-feature-settings: "palt"; font-kerning: normal; /* headings only */',
    });
  }

  // Check for font-synthesis on Japanese stacks (prevents faux-bold/faux-italic)
  if (/font-synthesis(-weight|-style)?\s*:/i.test(css)) {
    passed.push("font-synthesis controlled (no faux-bold/faux-italic on Japanese text)");
  } else {
    issues.push({
      rule_id: "rendering_font_synthesis",
      severity: "info",
      message: "font-synthesis not set. If a Japanese font weight is missing, browsers synthesize faux-bold/faux-italic, which smears dense kanji.",
      fix: "Add font-synthesis: none to Japanese text so the browser falls back to a real weight instead of faking one.",
      css_suggestion: "font-synthesis: none;",
    });
  }

  // Check for text-justify or text-align: justify
  if (/text-align\s*:\s*justify/i.test(css)) {
    issues.push({
      rule_id: "wrapping_text_align",
      severity: "warning",
      message: "text-align: justify creates uneven character spacing in Japanese web text. Browsers lack print-quality justification for CJK.",
      fix: "Use text-align: left for Japanese body text.",
      css_suggestion: "text-align: left;",
    });
    score -= 5;
  }

  // Check font-display for web fonts.
  // Google Fonts: font-display is set via the URL's display= parameter — you
  // cannot add font-display to third-party @font-face rules yourself.
  const hasGoogleFontsImport = /@import.*fonts\.googleapis|fonts\.googleapis\.com/i.test(css);
  const hasOwnFontFace = /@font-face/i.test(css);
  if (hasGoogleFontsImport && !/display=swap/i.test(css)) {
    issues.push({
      rule_id: "font_stack_performance",
      severity: "warning",
      message: "Google Fonts URL without display=swap. Japanese font files are 7-16K glyphs, causing long invisible text during load.",
      fix: "Add &display=swap to the Google Fonts URL (font-display cannot be added to third-party @font-face rules).",
      css_suggestion: "/* Google Fonts URL */ ...&display=swap",
    });
    score -= 5;
  } else if (hasOwnFontFace && !/font-display\s*:\s*swap/i.test(css)) {
    issues.push({
      rule_id: "font_stack_performance",
      severity: "warning",
      message: "@font-face without font-display: swap. Japanese font files are 7-16K glyphs, causing long invisible text during load.",
      fix: "Add font-display: swap to your @font-face rules.",
      css_suggestion: "font-display: swap;",
    });
    score -= 5;
  }

  // Check vertical writing mode usage (not an error, just detection)
  if (/writing-mode\s*:\s*vertical-rl/i.test(css)) {
    passed.push("Vertical text (tategaki) detected for atmospheric design");
  }

  // Check markup for text-on-photo issues
  if (markup && /background-image|bg-\[url/i.test(markupLower)) {
    const hasOverlay = /rgba\(0\s*,\s*0\s*,\s*0|linear-gradient.*rgba|overlay|bg-black\/|bg-opacity/i.test(markupLower + " " + lower);
    if (!hasOverlay) {
      issues.push({
        rule_id: "rendering_text_on_photo",
        severity: "warning",
        message: "Text over background image without visible dark overlay. Kanji with fine strokes lose legibility over complex photos.",
        fix: "Add a semi-transparent dark overlay (40-60% opacity) behind text on photos.",
        css_suggestion: "background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));",
      });
      score -= 5;
    }
  }

  score = Math.max(0, score);

  // Font stack recommendation based on context
  let fontStackRec: string;
  switch (context) {
    case "corporate":
      fontStackRec = JP_FONT_STACKS.find((s) => s.id === "mixed_corporate")?.stack || "";
      break;
    case "luxury":
      fontStackRec = JP_FONT_STACKS.find((s) => s.id === "mixed_elegant")?.stack || "";
      break;
    case "casual":
      fontStackRec = JP_FONT_STACKS.find((s) => s.id === "mixed_rounded")?.stack || "";
      break;
    default:
      fontStackRec = JP_FONT_STACKS.find((s) => s.id === "sans_web")?.stack || "";
  }

  return {
    score,
    issues,
    passed,
    font_stack_recommendation: fontStackRec,
    type_scale_reference: TYPE_SCALE,
  };
}
