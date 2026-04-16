export type TypographyCategory =
  | "font_stack"
  | "sizing"
  | "line_height"
  | "spacing"
  | "wrapping"
  | "hierarchy"
  | "rendering";

export interface TypographyRule {
  id: string;
  category: TypographyCategory;
  rule: string;
  details: string;
  css_suggestion?: string;
}

export interface FontStack {
  id: string;
  context: string;
  description: string;
  stack: string;
  notes: string;
}

export interface TypeScaleEntry {
  role: string;
  pc: number;
  mobile: number;
  weight: number;
  line_height: number;
}

export const TYPOGRAPHY_RULES: TypographyRule[] = [
  // Hierarchy
  {
    id: "hierarchy_no_italics",
    category: "hierarchy",
    rule: "Never use italics for Japanese text",
    details:
      "Japanese typefaces have no native italic forms. When CSS font-style: italic is applied to Japanese text, the browser fakes it by slanting the glyphs, which looks broken and amateurish. Emphasis in Japanese is achieved through bold weight, color change, increased size, or kakko brackets (「」). Designers who apply italics to Japanese text out themselves as unfamiliar with the language.",
    css_suggestion: "font-style: normal; /* Always for Japanese text */",
  },
  {
    id: "hierarchy_no_capitalization",
    category: "hierarchy",
    rule: "No capitalization-based hierarchy for Japanese",
    details:
      "Japanese has no concept of uppercase/lowercase. Hierarchy that relies on text-transform: uppercase or capitalize has zero effect on Japanese characters. Visual hierarchy in Japanese must come from size, weight, color, spacing, or decorative elements (underlines, background highlights, accent borders). When mixing English headings with Japanese body text, the English can use capitalization but the Japanese elements need alternative treatments.",
  },

  // Line Height
  {
    id: "line_height_body",
    category: "line_height",
    rule: "Line-height 1.8-2.0 for body text (200%+)",
    details:
      "Japanese body text requires significantly more line-height than English. The standard is 1.8-2.0 (180-200%). This is because kanji characters are visually denser -- each glyph fills its em square more completely than Latin letters. At line-height 1.5 (common in Western design), Japanese text feels cramped and exhausting to read. This is one of the most common mistakes non-Japanese designers make.",
    css_suggestion: "line-height: 1.8; /* Minimum for Japanese body text, 2.0 preferred */",
  },
  {
    id: "line_height_relaxed",
    category: "line_height",
    rule: "Line-height up to 2.4x for relaxed, editorial feel",
    details:
      "For a luxurious or editorial reading experience, Japanese text can go up to 2.4x line-height. This is common on brand sites, about pages, and long-form content where readability and atmosphere matter more than density. Magazine-style Japanese web layouts frequently use this generous spacing.",
    css_suggestion: "line-height: 2.4; /* Editorial/luxury Japanese text */",
  },

  // Sizing
  {
    id: "sizing_body_minimum",
    category: "sizing",
    rule: "16px base body text minimum",
    details:
      "The minimum recommended body text size for Japanese web content is 16px. Kanji characters contain many strokes that become illegible at small sizes. While 14px is the absolute floor for any Japanese text on screen, body paragraphs should never go below 16px. Many Japanese sites use 15-16px as their base. Going smaller than 14px for any Japanese text is a readability failure.",
    css_suggestion: "font-size: 16px; /* Japanese body text base */",
  },
  {
    id: "sizing_kanji_minimum",
    category: "sizing",
    rule: "Absolute minimum font size for kanji readability: 14px",
    details:
      "14px is the absolute smallest size at which complex kanji characters remain readable on screen. This applies to captions, footnotes, and auxiliary text. Below 14px, characters like 鬱 (depression), 薔薇 (rose), or 驚 (surprise) with many strokes become illegible blobs. Accessibility-conscious Japanese sites set 14px as their hard floor.",
    css_suggestion: "font-size: 14px; /* Absolute minimum for any Japanese text */",
  },
  {
    id: "sizing_heading_scale_pc",
    category: "sizing",
    rule: "PC heading sizes: 60/40/35/20/16px",
    details:
      "The standard PC heading scale in Japanese web design: hero/display at 60px, H1 at 40px, H2 at 35px, H3 at 20px, and body at 16px. This scale provides clear hierarchy while accommodating the visual density of kanji. Some teams use slightly different numbers (56/36/28/20/16) but the ratios are consistent.",
  },
  {
    id: "sizing_heading_scale_mobile",
    category: "sizing",
    rule: "Mobile heading sizes: 32/26/16/13px",
    details:
      "On mobile (375px), headings compress significantly: hero at 32px, H1 at 26px, H2/body at 16px, caption at 13px. The compression ratio from PC to mobile is roughly 50-65%. Note that 13px for captions pushes against the kanji readability floor -- use it only for supplementary text that does not contain complex kanji.",
  },

  // Spacing
  {
    id: "spacing_heading_tracking",
    category: "spacing",
    rule: "Letter-spacing approximately 2px on headings",
    details:
      "Japanese headings benefit from 1-3px of additional letter-spacing (tracking). This opens up the dense kanji characters and gives headings a more refined, designed appearance. The standard is about 0.05-0.1em (roughly 2px at heading sizes). This is a subtle but critical polish that distinguishes professional Japanese web typography from amateur work.",
    css_suggestion: "letter-spacing: 0.05em; /* Japanese headings */",
  },
  {
    id: "spacing_label_tracking",
    category: "spacing",
    rule: "Letter-spacing up to 10px on spaced display labels",
    details:
      "For decorative or atmospheric text treatments -- section labels, category names, brand taglines -- Japanese designers use extreme letter-spacing up to 0.5em (~10px). This creates a spacious, high-end look common on luxury brand sites, architectural firms, and fashion pages. The technique works particularly well with katakana and short phrases.",
    css_suggestion: "letter-spacing: 0.3em; /* Spaced display labels, adjust to taste */",
  },
  {
    id: "spacing_palt",
    category: "spacing",
    rule: "Use font-feature-settings 'palt' for proportional alternates",
    details:
      "Japanese fonts default to monospaced (full-width) character spacing. Enabling 'palt' (proportional alternate widths) tightens spacing around punctuation and certain characters, making text look more natural and less mechanical. This is especially important for headings and display text where the default full-width spacing of parentheses and punctuation creates awkward gaps.",
    css_suggestion:
      'font-feature-settings: "palt"; /* Proportional alternates for Japanese */',
  },
  {
    id: "spacing_optical_kerning",
    category: "spacing",
    rule: "Optical kerning: auto-kerning often wrong, manual adjustment needed",
    details:
      "CSS font-kerning: auto and OpenType automatic kerning do not work well with Japanese text. The pair-kerning tables in most Japanese fonts are incomplete or tuned for print. For display text (headings, hero copy), manual kerning adjustments via letter-spacing on individual characters or spans may be necessary. This is a detail-level concern that Japanese design directors will notice.",
  },
  {
    id: "spacing_baseline_punctuation",
    category: "spacing",
    rule: "Baseline adjustment needed for colons, semicolons, and hyphens",
    details:
      "When mixing English punctuation (colons, semicolons, hyphens) into Japanese text, their vertical position often sits wrong relative to the Japanese characters. English punctuation sits at baseline while Japanese punctuation centers vertically. Manual vertical alignment via vertical-align or position adjustments may be needed for pixel-perfect results. This is most visible in headings and UI labels.",
    css_suggestion: "vertical-align: 0.1em; /* Tweak per character as needed */",
  },

  // Wrapping
  {
    id: "wrapping_kinsoku",
    category: "wrapping",
    rule: "Kinsoku shori: never let punctuation start a new line",
    details:
      "Kinsoku shori (禁則処理) is the fundamental Japanese text-wrapping rule: certain characters must never appear at the start of a line (closing brackets, periods, commas) and others must never end a line (opening brackets). CSS word-break: keep-all activates the browser's kinsoku shori engine. Without this, Japanese text wraps mid-word and leaves punctuation in illegal positions. This is a non-negotiable rule.",
    css_suggestion: "word-break: keep-all; /* Enable kinsoku shori */",
  },
  {
    id: "wrapping_word_break",
    category: "wrapping",
    rule: "Use word-break: keep-all for Japanese text",
    details:
      "word-break: keep-all prevents line breaks from occurring between characters that should stay together according to Japanese typographic rules. It respects kinsoku shori and keeps punctuation attached to the correct character. This should be set on any container holding Japanese text. Without it, the browser defaults to break-all behavior which produces ugly, rule-violating line breaks.",
    css_suggestion: "word-break: keep-all;",
  },
  {
    id: "wrapping_overflow",
    category: "wrapping",
    rule: "overflow-wrap: break-word as fallback for long strings",
    details:
      "While word-break: keep-all handles normal Japanese text, long unbroken strings (URLs, email addresses, product codes) can overflow their containers. overflow-wrap: break-word provides a safety net, breaking only when a word would otherwise overflow. Use both properties together for robust Japanese text handling.",
    css_suggestion: "overflow-wrap: break-word; /* Fallback for long unbroken strings */",
  },
  {
    id: "wrapping_zenkaku_hankaku",
    category: "wrapping",
    rule: "Do not mix zenkaku (full-width) and hankaku (half-width) in the same text block",
    details:
      "Mixing full-width (全角) and half-width (半角) characters in the same text block creates inconsistent spacing and looks unprofessional. Numbers and English within Japanese text should consistently use one form. The standard practice: use half-width for numbers and English within Japanese body text, but maintain consistency within any single block. Forms should specify which input format they expect.",
  },

  // Font Stack
  {
    id: "font_stack_performance",
    category: "font_stack",
    rule: "Japanese web fonts: 7,000-16,000 glyphs per weight, major performance concern",
    details:
      "A single weight of a Japanese font file contains 7,000-16,000+ glyphs compared to ~200-500 for Latin fonts. A full Noto Sans JP with 5 weights can exceed 25MB. Subsetting, unicode-range splitting, and Google Fonts' automatic slicing are essential. Never load full Japanese font files. Use font-display: swap to prevent invisible text during loading. Consider using system fonts for body and web fonts only for headings.",
    css_suggestion: "font-display: swap; /* Prevent FOIT with Japanese web fonts */",
  },
  {
    id: "font_stack_mixed_en_jp",
    category: "font_stack",
    rule: "Mixed EN/JP stacks: English heading font first, Japanese body font as fallback",
    details:
      "When combining English and Japanese typefaces, list the English font first in font-family so Latin characters use the English face while Japanese characters fall through to the Japanese font. Common pairings: Josefin Sans + Noto Sans JP, Inter + Noto Sans JP, Poppins + Zen Kaku Gothic New. The English font handles A-Z and numbers with its metrics, Japanese characters cascade to the JP font.",
    css_suggestion:
      'font-family: "Inter", "Noto Sans JP", sans-serif; /* EN font first, JP fallback */',
  },
  {
    id: "font_stack_system",
    category: "font_stack",
    rule: "System font stack: Hiragino Sans, Yu Gothic, Meiryo, sans-serif",
    details:
      "The standard Japanese system font stack targets each major OS: Hiragino Sans (macOS/iOS), Yu Gothic (Windows 10+), Meiryo (Windows 7/8 fallback), then generic sans-serif. Hiragino Sans is preferred on Mac and is the reference quality standard. Yu Gothic has rendering issues at small sizes on older Windows. Meiryo is the safe Windows fallback but looks dated.",
    css_suggestion:
      'font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "YuGothic", "Meiryo", sans-serif;',
  },
  {
    id: "font_stack_web_fonts",
    category: "font_stack",
    rule: "Recommended Japanese web fonts: Noto Sans JP, Noto Serif JP, M PLUS families, Zen families",
    details:
      "The most widely used Japanese web fonts: Noto Sans JP (Google's universal sans-serif, clean and neutral), Noto Serif JP (elegant serif option), M PLUS 1p and M PLUS Rounded 1c (friendly, modern), Zen Kaku Gothic New (contemporary sans), Zen Maru Gothic (rounded, warm), Zen Old Mincho (traditional serif). All available via Google Fonts with automatic subsetting. Noto Sans JP is the safe default choice.",
  },

  // Rendering
  {
    id: "rendering_vertical",
    category: "rendering",
    rule: "Vertical text (tategaki) using writing-mode: vertical-rl for atmosphere",
    details:
      "Vertical Japanese text (縦書き/tategaki) is written top-to-bottom, right-to-left. CSS writing-mode: vertical-rl enables this. It is used decoratively on modern Japanese websites for headings, pull quotes, navigation labels, and atmospheric sections. Common on ryokan (traditional inn), sake brewery, temple, and cultural sites. Not suitable for long body text on web but powerful for visual impact.",
    css_suggestion:
      "writing-mode: vertical-rl; /* Vertical Japanese text, right-to-left columns */",
  },
  {
    id: "rendering_text_on_photo",
    category: "rendering",
    rule: "Text on photos requires a dark overlay (50% opacity layer)",
    details:
      "When placing Japanese text over photography, always add a semi-transparent dark overlay. Japanese text -- especially kanji with fine strokes -- loses legibility over complex photo backgrounds faster than Latin text does. A black overlay at 40-60% opacity is standard. Alternative treatments: text-shadow, solid background strip behind text, or gradient fade from photo edge.",
    css_suggestion:
      "background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)); /* Overlay for text on photos */",
  },

  // Additional rules
  {
    id: "hierarchy_size_weight",
    category: "hierarchy",
    rule: "Establish hierarchy through size and weight, not style variations",
    details:
      "Since italics and capitalization are unavailable for Japanese hierarchy, the primary tools are: font-size changes, font-weight (Regular 400 vs Bold 700), color contrast (dark heading vs gray body), decorative accents (colored underlines, left borders, background bands), and spatial separation. Japanese design tends to use all of these simultaneously for a heading treatment, creating strong visual anchors in dense layouts.",
  },
  {
    id: "sizing_en_jp_mismatch",
    category: "sizing",
    rule: "English and Japanese text at the same font-size appear different heights",
    details:
      "Japanese characters occupy nearly the full em square while Latin characters are shorter. At the same CSS font-size, Japanese text appears visually larger than English text. When mixing languages, you may need to adjust the English font size slightly upward (by 1-2px) or use a font-size-adjust property to achieve visual alignment. This is most noticeable in headings and navigation items.",
    css_suggestion:
      "font-size-adjust: 0.5; /* Experimental: normalize x-height across EN/JP */",
  },
  {
    id: "wrapping_text_align",
    category: "wrapping",
    rule: "Japanese body text uses text-align: left, not justify",
    details:
      "While printed Japanese books use justified text, web body text should use text-align: left (or start). Justified Japanese text on the web creates uneven character spacing because browsers lack the sophisticated justification engines of print layout tools. The inconsistent spacing is visually distracting, especially at narrow mobile widths.",
    css_suggestion: "text-align: left; /* Do not justify Japanese body text on web */",
  },
  {
    id: "rendering_antialiasing",
    category: "rendering",
    rule: "Use antialiased font smoothing on macOS for Japanese text",
    details:
      "On macOS, -webkit-font-smoothing: antialiased produces thinner, crisper Japanese text that many designers prefer over the default subpixel rendering. This is especially effective with Hiragino Sans and Noto Sans JP. The trade-off is slightly reduced readability at very small sizes, but at 16px+ body text the result is cleaner.",
    css_suggestion:
      "-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;",
  },
];

export const JP_FONT_STACKS: FontStack[] = [
  {
    id: "sans_system",
    context: "System sans-serif (no web fonts needed)",
    description:
      "Standard system font stack covering macOS, iOS, Windows 10+, and legacy Windows. Zero download cost. Use as body text default when performance matters most.",
    stack:
      '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic Medium", "Yu Gothic", "YuGothic", "Meiryo", sans-serif',
    notes:
      "Yu Gothic Medium is specified before Yu Gothic to avoid the thin Regular weight on Windows which renders poorly. Meiryo is the Windows 7/8 fallback.",
  },
  {
    id: "sans_web",
    context: "Web font sans-serif (Google Fonts)",
    description:
      "Clean, modern sans-serif using Noto Sans JP. The standard choice for Japanese web projects. Loads via Google Fonts with automatic unicode-range subsetting.",
    stack: '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif',
    notes:
      "Always load specific weights (400, 700) rather than all weights. Google Fonts handles subsetting automatically. System fonts as fallback during loading.",
  },
  {
    id: "serif_web",
    context: "Web font serif / mincho",
    description:
      "Traditional serif (mincho) style for editorial, cultural, or luxury contexts. Noto Serif JP is the standard web choice. Use for headings or atmospheric text, not long body copy on screen.",
    stack:
      '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho ProN", serif',
    notes:
      "Serif Japanese text is harder to read on screen at small sizes. Reserve for headings, pull quotes, and decorative use. Body text should use sans-serif.",
  },
  {
    id: "mixed_modern",
    context: "Mixed EN/JP modern (English geometric + Japanese sans)",
    description:
      "English text uses a geometric/modern Latin typeface while Japanese characters fall through to Noto Sans JP. Creates a contemporary, designed feel common on startup and tech company sites.",
    stack: '"Inter", "Noto Sans JP", "Hiragino Sans", sans-serif',
    notes:
      "Inter pairs well with Noto Sans JP due to similar x-height and stroke weight. Other good EN options: Poppins, DM Sans, Outfit.",
  },
  {
    id: "mixed_elegant",
    context: "Mixed EN/JP elegant (English display + Japanese sans)",
    description:
      "English headings use a distinctive display typeface while Japanese uses a clean sans-serif. Common on fashion, architecture, and lifestyle sites where English words are used decoratively.",
    stack:
      '"Josefin Sans", "Zen Kaku Gothic New", "Hiragino Sans", sans-serif',
    notes:
      "Josefin Sans has a tall, elegant look that contrasts nicely with Japanese text. Other EN options: Cormorant Garamond, Playfair Display, Libre Baskerville. Use sparingly -- only for headings and display text.",
  },
  {
    id: "mixed_rounded",
    context: "Mixed EN/JP friendly/rounded (for approachable brands)",
    description:
      "Rounded, friendly typefaces for casual consumer apps, children's content, food/lifestyle brands. Warm and approachable without being childish.",
    stack: '"Nunito", "M PLUS Rounded 1c", "Hiragino Sans", sans-serif',
    notes:
      "M PLUS Rounded 1c has excellent glyph coverage and a genuinely warm personality. Zen Maru Gothic is another good rounded Japanese option.",
  },
  {
    id: "mixed_corporate",
    context: "Mixed EN/JP corporate (for business and B2B)",
    description:
      "Professional, trustworthy combination for corporate sites, B2B SaaS, and enterprise applications. Balances readability with authority.",
    stack: '"Roboto", "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif',
    notes:
      "Roboto and Noto Sans JP are both Google fonts, share design DNA, and pair naturally. This stack works across all platforms without rendering surprises.",
  },
];

export const TYPE_SCALE: TypeScaleEntry[] = [
  {
    role: "hero",
    pc: 60,
    mobile: 32,
    weight: 700,
    line_height: 1.4,
  },
  {
    role: "h1",
    pc: 40,
    mobile: 26,
    weight: 700,
    line_height: 1.5,
  },
  {
    role: "h2",
    pc: 35,
    mobile: 22,
    weight: 700,
    line_height: 1.6,
  },
  {
    role: "h3",
    pc: 20,
    mobile: 16,
    weight: 700,
    line_height: 1.7,
  },
  {
    role: "body",
    pc: 16,
    mobile: 16,
    weight: 400,
    line_height: 1.8,
  },
  {
    role: "caption",
    pc: 14,
    mobile: 13,
    weight: 400,
    line_height: 1.6,
  },
  {
    role: "small",
    pc: 12,
    mobile: 11,
    weight: 400,
    line_height: 1.5,
  },
];
