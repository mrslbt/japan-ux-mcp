import { checkJpTypography } from "./check-jp-typography.js";

export interface ReviewJpUiParams {
  css: string;
  markup?: string;
  context?: "corporate" | "editorial" | "casual" | "luxury";
}

type Layer = "typography" | "color" | "performance";
type Basis = "spec" | "convention";

interface UiFinding {
  rule_id: string;
  layer: Layer;
  severity: "error" | "warning" | "info";
  message: string;
  fix: string;
  css_suggestion?: string;
  basis: Basis;
  source: string;
}

/**
 * Citation map. HONESTY RULE: only line-breaking, ruby, vertical text, and the
 * no-italics fact are codified in W3C JLReq / JIS X 4051 ("spec"). The px-level
 * values (line-height 1.8, 16px body) are documented Japanese *web conventions*,
 * not spec clauses — they are labeled "convention" so we never overclaim authority.
 */
const SOURCES: Record<string, { basis: Basis; source: string }> = {
  wrapping_kinsoku: { basis: "spec", source: "W3C JLReq (Requirements for Japanese Text Layout) §3 line breaking; JIS X 4051 kinsoku shori — line-break: strict opts into the stricter rule set (small kana, prolonged sound mark)" },
  wrapping_word_break: { basis: "convention", source: "CSS word-break: keep-all is designed for Korean; on spaceless Japanese body text it risks overflow — documented web practice, not a JLReq clause" },
  wrapping_break_all: { basis: "spec", source: "JIS X 4051 kinsoku shori; W3C JLReq line breaking — break-all permits prohibited characters (、。ー small kana) at line starts" },
  wrapping_overflow: { basis: "convention", source: "CSS overflow control; safety net alongside kinsoku" },
  wrapping_text_align: { basis: "convention", source: "JLReq describes justified setting as traditional; left-align is the dominant web convention — justify is acceptable for CJK" },
  hierarchy_no_italics: { basis: "spec", source: "W3C JLReq — Japanese has no italic forms; emphasis via weight, kenten dots, or 「」" },
  line_height_body: { basis: "convention", source: "Japanese web practice — 1.8–2.0 for kanji density (a convention, not a JLReq px value)" },
  sizing_kanji_minimum: { basis: "convention", source: "Japanese web accessibility practice — 14px kanji legibility floor" },
  sizing_body_minimum: { basis: "convention", source: "Japanese web practice — 16px body-text recommendation" },
  font_stack_system: { basis: "convention", source: "Standard JP system font stack (Hiragino / Yu Gothic / Meiryo)" },
  font_stack_performance: { basis: "convention", source: "CJK web-font payload (7,000–16,000 glyphs/weight); use font-display: swap" },
  spacing_palt: { basis: "convention", source: "OpenType 'palt' proportional alternates for natural JP punctuation spacing" },
  rendering_text_on_photo: { basis: "convention", source: "JP legibility practice — overlay behind fine-stroke kanji on photos" },
  rendering_font_synthesis: { basis: "convention", source: "JP web typography practice — font-synthesis: none prevents faux-bold/faux-italic on missing JP weights" },
  color_funeral_palette: { basis: "convention", source: "JP colour symbolism — in celebratory/gift/ceremonial contexts, pure black + white can evoke funeral mizuhiki (黒白, kuroshiro)" },
  markup_lang_ja: { basis: "convention", source: "Missing lang=\"ja\" causes Chinese-glyph font fallback in some environments (han unification)" },
  perf_font_weight_count: { basis: "convention", source: "CJK web-font payload — each weight is a full multi-MB glyph set" },
};

function cite(rule_id: string): { basis: Basis; source: string } {
  return SOURCES[rule_id] ?? { basis: "convention", source: "Documented Japanese web design practice" };
}

export interface ReviewJpUiResult {
  verdict: "pass" | "needs_work" | "fail";
  score: number;
  summary: string;
  findings: UiFinding[];
  passed: string[];
  recommended_font_stack: string;
  note: string;
}

export function reviewJpUi(params: ReviewJpUiParams): ReviewJpUiResult {
  const { css, markup, context } = params;
  const typo = checkJpTypography({ css, markup, context });
  let score = typo.score;
  const findings: UiFinding[] = [];

  // 1) Carry typography findings forward, tagged with layer + citation.
  for (const i of typo.issues) {
    const c = cite(i.rule_id);
    findings.push({
      rule_id: i.rule_id,
      layer: i.rule_id === "font_stack_performance" ? "performance" : "typography",
      severity: i.severity,
      message: i.message,
      fix: i.fix,
      css_suggestion: i.css_suggestion,
      basis: c.basis,
      source: c.source,
    });
  }

  // 2) NEW — colour: black+white-only palette reads as funeral in Japan.
  const colorDecls = [...css.matchAll(/(?:^|[\s;{])(?:color|background-color|background)\s*:\s*([^;}]+)/gi)]
    .map((m) => m[1].toLowerCase().trim());
  const isBW = (v: string) =>
    /^#(000|fff|000000|ffffff)\b/.test(v) ||
    /^(black|white|transparent|inherit|currentcolor|none)\b/.test(v) ||
    /^rgba?\(\s*0\s*,\s*0\s*,\s*0/.test(v) ||
    /^rgba?\(\s*255\s*,\s*255\s*,\s*255/.test(v);
  if (colorDecls.length >= 2 && colorDecls.every(isBW)) {
    const c = cite("color_funeral_palette");
    findings.push({
      rule_id: "color_funeral_palette",
      layer: "color",
      severity: "info",
      message:
        "Palette is black + white only. Monochrome is normal in fashion, luxury, and editorial design — but for celebratory, gift, or ceremonial contexts, pure black + white can evoke funeral mizuhiki (黒白, kuroshiro). Consider an accent colour there.",
      fix: "If the context is celebratory/gift/ceremonial, add an accent colour (brand blue, red, or green).",
      css_suggestion: "/* introduce an accent, e.g. */ --accent: #0068B7;",
      basis: c.basis,
      source: c.source,
    });
  }

  // 2b) Markup: Japanese characters present but no lang="ja" attribute.
  // Without it, some environments fall back to Chinese glyph forms for shared
  // kanji codepoints (han unification).
  if (markup && /[぀-ヿ㐀-鿿]/.test(markup) && !/lang\s*=\s*["']?ja/i.test(markup)) {
    const c = cite("markup_lang_ja");
    findings.push({
      rule_id: "markup_lang_ja",
      layer: "typography",
      severity: "warning",
      message: 'Markup contains Japanese text but no lang="ja" attribute. Some environments fall back to Chinese glyph forms for shared kanji codepoints.',
      fix: 'Add lang="ja" to the <html> element (or the Japanese-language container).',
      basis: c.basis,
      source: c.source,
    });
    score -= 5;
  }

  // 3) NEW — performance: loading many weights of a CJK web font.
  const gf = css.match(/family=Noto\+(?:Sans|Serif)\+JP:wght@([0-9;]+)/i);
  if (gf) {
    const weights = gf[1].split(";").filter(Boolean);
    if (weights.length > 3) {
      const c = cite("perf_font_weight_count");
      findings.push({
        rule_id: "perf_font_weight_count",
        layer: "performance",
        severity: "warning",
        message: `Loading ${weights.length} weights of a Japanese web font. Each CJK weight is a full multi-MB glyph set — a major payload and UX cost.`,
        fix: "Load only the weights you actually use (typically 400 and 700). Drop the rest.",
        css_suggestion: "/* Google Fonts */ family=Noto+Sans+JP:wght@400;700",
        basis: c.basis,
        source: c.source,
      });
      score -= 6;
    }
  }

  score = Math.max(0, score);

  const errors = findings.filter((f) => f.severity === "error").length;
  const verdict: ReviewJpUiResult["verdict"] =
    errors > 0 || score < 60 ? "fail" : score < 85 ? "needs_work" : "pass";

  const specCount = findings.filter((f) => f.basis === "spec").length;
  const convCount = findings.filter((f) => f.basis === "convention").length;

  return {
    verdict,
    score,
    summary: `${verdict.toUpperCase()} — ${score}/100. ${findings.length} finding(s) against the Japanese UI standard (${specCount} spec, ${convCount} convention).`,
    findings,
    passed: typo.passed,
    recommended_font_stack: typo.font_stack_recommendation,
    note: "Layers checked: typography (kinsoku, line-height, sizing, fonts), colour (palette symbolism), performance (CJK font payload). 'spec' findings cite W3C JLReq / JIS X 4051; 'convention' findings cite documented Japanese web practice — labelled separately so authority is never overstated.",
  };
}
