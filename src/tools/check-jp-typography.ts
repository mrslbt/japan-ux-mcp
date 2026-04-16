import { TYPOGRAPHY_RULES, JP_FONT_STACKS, TYPE_SCALE } from "../data/typography-rules.js";

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

  // Check line-height
  const lineHeightMatches = css.matchAll(/line-height\s*:\s*([0-9.]+)/gi);
  let hasGoodLineHeight = false;
  for (const match of lineHeightMatches) {
    const val = parseFloat(match[1]);
    if (val > 0 && val < 1.7) {
      issues.push({
        rule_id: "line_height_body",
        severity: "error",
        message: `line-height: ${val} is too tight for Japanese body text. Kanji characters need 1.8+ to breathe.`,
        fix: "Set line-height to at least 1.8 for Japanese body text. 2.0 is preferred.",
        css_suggestion: "line-height: 1.8;",
      });
      score -= 15;
    } else if (val >= 1.7 && val < 1.8) {
      issues.push({
        rule_id: "line_height_body",
        severity: "warning",
        message: `line-height: ${val} is borderline. 1.8 is the recommended minimum for Japanese.`,
        fix: "Increase to 1.8 for body text.",
        css_suggestion: "line-height: 1.8;",
      });
      score -= 5;
    } else if (val >= 1.8) {
      hasGoodLineHeight = true;
    }
  }
  if (hasGoodLineHeight) {
    passed.push("Line-height meets Japanese standard (1.8+)");
  }

  // Check font size
  const fontSizeMatches = css.matchAll(/font-size\s*:\s*(\d+)px/gi);
  let hasSmallFont = false;
  for (const match of fontSizeMatches) {
    const size = parseInt(match[1]);
    if (size < 14) {
      issues.push({
        rule_id: "sizing_kanji_minimum",
        severity: "error",
        message: `font-size: ${size}px is below the 14px absolute minimum for kanji readability.`,
        fix: "Increase to at least 14px. 16px is recommended for body text.",
        css_suggestion: "font-size: 16px;",
      });
      score -= 15;
      hasSmallFont = true;
    } else if (size >= 14 && size < 16) {
      issues.push({
        rule_id: "sizing_body_minimum",
        severity: "warning",
        message: `font-size: ${size}px is below the 16px body text recommendation. Fine for captions, not for paragraphs.`,
        fix: "Use 16px for body text. Reserve 14px for captions only.",
      });
      score -= 5;
    }
  }
  if (!hasSmallFont && fontSizeMatches) {
    passed.push("Font sizes meet kanji readability minimum");
  }

  // Check font-family for Japanese fonts
  if (/font-family/i.test(css)) {
    const hasJpFont = /noto\s*sans\s*jp|noto\s*serif\s*jp|hiragino|yu\s*gothic|yuGothic|meiryo|メイリオ|游ゴシック|m\s*plus|zen\s*(kaku|maru|old)/i.test(css);
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
        const jpFontPos = stack.search(/noto|hiragino|yu\s*gothic|meiryo/i);
        const enFontPos = stack.search(/inter|poppins|roboto|josefin|nunito|dm\s*sans/i);
        if (enFontPos > -1 && jpFontPos > -1 && enFontPos < jpFontPos) {
          passed.push("English font listed before Japanese font (correct cascade)");
        }
      }
    }
  }

  // Check for word-break: keep-all (kinsoku shori)
  if (/word-break\s*:\s*keep-all/i.test(css)) {
    passed.push("word-break: keep-all enabled (kinsoku shori)");
  } else {
    issues.push({
      rule_id: "wrapping_kinsoku",
      severity: "warning",
      message: "word-break: keep-all not detected. Without it, Japanese text may break at illegal positions (punctuation at line start).",
      fix: "Add word-break: keep-all to Japanese text containers.",
      css_suggestion: "word-break: keep-all;",
    });
    score -= 10;
  }

  // Check for overflow-wrap fallback
  if (/overflow-wrap\s*:\s*break-word/i.test(css) || /word-wrap\s*:\s*break-word/i.test(css)) {
    passed.push("overflow-wrap: break-word fallback present");
  } else if (issues.some((i) => i.rule_id === "wrapping_kinsoku")) {
    issues.push({
      rule_id: "wrapping_overflow",
      severity: "info",
      message: "overflow-wrap: break-word not set. Long URLs or codes may overflow containers.",
      fix: "Add overflow-wrap: break-word as a safety net alongside word-break: keep-all.",
      css_suggestion: "overflow-wrap: break-word;",
    });
    score -= 3;
  }

  // Check for font-feature-settings: "palt"
  if (/font-feature-settings\s*:.*palt/i.test(css)) {
    passed.push('font-feature-settings: "palt" enabled (proportional alternates)');
  } else {
    issues.push({
      rule_id: "spacing_palt",
      severity: "info",
      message: 'font-feature-settings: "palt" not detected. Punctuation spacing may look mechanical.',
      fix: 'Add font-feature-settings: "palt" to headings and display text for better Japanese punctuation spacing.',
      css_suggestion: 'font-feature-settings: "palt";',
    });
    score -= 3;
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

  // Check font-display for web fonts
  if (/font-face|@import.*fonts\.googleapis/i.test(css) && !/font-display\s*:\s*swap/i.test(css)) {
    issues.push({
      rule_id: "font_stack_performance",
      severity: "warning",
      message: "Web font detected without font-display: swap. Japanese font files are 7-16K glyphs, causing long invisible text during load.",
      fix: "Add font-display: swap to @font-face rules.",
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
