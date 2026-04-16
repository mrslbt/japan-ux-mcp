export type AccessibilityCategory = "standard" | "visual" | "motor" | "cognitive" | "language";

export interface AccessibilityRule {
  id: string;
  category: AccessibilityCategory;
  rule: string;
  details: string;
  jis_reference?: string;
}

export interface JISLevel {
  level: "A" | "AA" | "AAA";
  wcag_equivalent: string;
  description: string;
  requirement_context: string;
}

export const JIS_LEVELS: JISLevel[] = [
  {
    level: "A",
    wcag_equivalent: "WCAG 2.1 Level A",
    description:
      "Minimum level of accessibility. Addresses the most basic barriers. Content must be perceivable, operable, understandable, and robust at a fundamental level.",
    requirement_context:
      "Baseline for all websites. Failure to meet Level A means significant user groups are completely blocked from using the site.",
  },
  {
    level: "AA",
    wcag_equivalent: "WCAG 2.1 Level AA",
    description:
      "Standard target for most organizations. Addresses the most common barriers for disabled users. Includes contrast ratios, resize support, consistent navigation, and input assistance.",
    requirement_context:
      "Required for Japanese government and public sector websites since 2016 (based on 総務省 guidelines). Strongly recommended for all commercial sites. This is the standard most organizations should target.",
  },
  {
    level: "AAA",
    wcag_equivalent: "WCAG 2.1 Level AAA",
    description:
      "Highest level of accessibility. Includes enhanced contrast (7:1), sign language for media, no time limits, and simpler reading levels. Difficult to achieve for all content types.",
    requirement_context:
      "Aspirational goal. Not required by regulation but may be pursued for specific pages or sections. Healthcare, senior-focused services, and government information portals may target AAA for critical content.",
  },
];

export const ACCESSIBILITY_RULES: AccessibilityRule[] = [
  // ─── Standard / Regulatory ─────────────────────────────────────────
  {
    id: "a11y_jis_standard",
    category: "standard",
    rule: "JIS X 8341-3 is Japan's web accessibility standard",
    details:
      "JIS X 8341-3:2016 is the Japanese Industrial Standard for web accessibility, titled '高齢者・障害者等配慮設計指針—情報通信における機器，ソフトウェア及びサービス—第3部：ウェブコンテンツ' (Guidelines for older persons and persons with disabilities — Information and communication equipment, software, and services — Part 3: Web content). It is technically aligned with WCAG 2.0 and references WCAG 2.1. Three conformance levels: A, AA, AAA, mapping directly to WCAG levels.",
    jis_reference: "JIS X 8341-3:2016 (全般)",
  },
  {
    id: "a11y_government_requirement",
    category: "standard",
    rule: "Government sites must meet JIS X 8341-3 AA since 2016",
    details:
      "The Ministry of Internal Affairs and Communications (総務省) established guidelines requiring all national and local government websites to conform to JIS X 8341-3 Level AA. The '国の行政機関における情報アクセシビリティ向上のための取組' directive mandates this. Public sector organizations must publish accessibility conformance statements (ウェブアクセシビリティ方針) on their sites and conduct regular testing.",
    jis_reference: "JIS X 8341-3:2016 適合レベルAA",
  },
  {
    id: "a11y_disability_discrimination_act",
    category: "standard",
    rule: "障害者差別解消法 (Disability Discrimination Act) applies to web",
    details:
      "The 障害者差別解消法 (Act on the Elimination of Discrimination against Persons with Disabilities), effective April 2016 with major amendments in 2024, prohibits discrimination against persons with disabilities and requires 'reasonable accommodation' (合理的配慮). As of April 2024, reasonable accommodation is mandatory for private businesses (previously only an effort obligation). This increasingly applies to digital services and websites, meaning inaccessible web interfaces may constitute discrimination.",
  },
  {
    id: "a11y_lang_attribute",
    category: "standard",
    rule: "Set lang='ja' on the html element",
    details:
      "The html element must have `lang=\"ja\"` to correctly identify the page language as Japanese. This enables screen readers (PC-Talker, NVDA, VoiceOver) to switch to Japanese speech synthesis, ensures correct pronunciation of Japanese text, and allows browsers to offer appropriate font fallbacks. For pages with mixed Japanese and English content, use `lang=\"en\"` on English-language sections.",
    jis_reference: "JIS X 8341-3:2016 3.1.1",
  },
  {
    id: "a11y_skip_navigation",
    category: "standard",
    rule: "Provide skip navigation link (本文へスキップ)",
    details:
      "Include a skip navigation link as the first focusable element on the page. The link text should be '本文へスキップ' (Skip to main content) or 'メインコンテンツへ移動'. This allows keyboard and screen reader users to bypass repetitive navigation menus. The link should be visually hidden until focused, then appear prominently.",
    jis_reference: "JIS X 8341-3:2016 2.4.1",
  },
  {
    id: "a11y_pdf_accessibility",
    category: "standard",
    rule: "PDF documents must be tagged and accessible",
    details:
      "Japanese government and corporate sites frequently publish PDFs (reports, forms, announcements). These PDFs must be tagged PDFs with proper reading order, Japanese text extracted correctly (not scanned images of text), alt text on images, and proper heading structure. Many Japanese PDFs are still just scanned images, which are completely inaccessible to screen readers.",
    jis_reference: "JIS X 8341-3:2016 1.1.1, 1.3.1",
  },

  // ─── Visual ────────────────────────────────────────────────────────
  {
    id: "a11y_color_contrast",
    category: "visual",
    rule: "Color contrast: 4.5:1 minimum for normal text, 3:1 for large text",
    details:
      "Text must have a contrast ratio of at least 4.5:1 against its background for normal text (under 18pt or 14pt bold) and 3:1 for large text (18pt+ or 14pt+ bold). This is especially critical in Japan where 29%+ of the population is over 65—age-related vision changes make low-contrast text unreadable. Test with Japanese fonts, which may appear visually lighter than Latin fonts at the same weight.",
    jis_reference: "JIS X 8341-3:2016 1.4.3",
  },
  {
    id: "a11y_no_color_only",
    category: "visual",
    rule: "Do not rely on color alone to convey information",
    details:
      "Information must not be conveyed through color alone. Red/green color blindness (色覚異常) affects approximately 5% of Japanese men (about 3.2 million people). Common violations: red-only error states, green-only success indicators, color-coded charts without patterns, required field indicators using only red asterisks. Always pair color with text labels, icons, patterns, or other visual indicators.",
    jis_reference: "JIS X 8341-3:2016 1.4.1",
  },
  {
    id: "a11y_aging_population",
    category: "visual",
    rule: "Design for Japan's aging population (29%+ over 65)",
    details:
      "Japan has the world's oldest population with over 29% aged 65+, projected to reach 35%+ by 2040. This directly impacts UX: larger base font sizes (16px minimum, 18px+ preferred for body text), high contrast ratios, clear visual hierarchy, generous spacing between interactive elements, and avoiding small icons or subtle hover states. Older users also commonly use zoom/magnification features.",
    jis_reference: "JIS X 8341-3:2016 1.4.4",
  },
  {
    id: "a11y_focus_indicators",
    category: "visual",
    rule: "Focus indicators must be visible over Japanese text",
    details:
      "Keyboard focus indicators must be clearly visible when overlaid on Japanese text, which is visually denser than Latin text. Default browser focus outlines may be too thin or low-contrast against kanji-heavy backgrounds. Custom focus indicators should use a solid outline (minimum 2px) with a color that contrasts against both the element and surrounding text. Test focus visibility on pages with dense Japanese paragraph text.",
    jis_reference: "JIS X 8341-3:2016 2.4.7",
  },
  {
    id: "a11y_screen_readers",
    category: "visual",
    rule: "Support Japanese screen readers: PC-Talker, NVDA, VoiceOver",
    details:
      "The primary screen readers in Japan are PC-Talker (the most popular Japanese commercial screen reader, Windows), NVDA with Japanese speech synthesizer (free, Windows), and VoiceOver (macOS/iOS, built-in). JAWS has low market share in Japan. PC-Talker has unique behaviors—it may read kanji differently than NVDA. Test with at least PC-Talker or NVDA Japanese to ensure proper reading of kanji compounds, dates in Japanese era format, and mixed Japanese-English text.",
  },
  {
    id: "a11y_alt_text_japanese",
    category: "visual",
    rule: "Alt text must be in Japanese, matching the page language",
    details:
      "All image alt text must be written in Japanese on Japanese-language pages. English alt text will be mispronounced by Japanese screen readers or read character-by-character. Describe the image content in natural Japanese. For decorative images, use empty alt (alt=''). For charts and infographics, provide a full Japanese text description. For product images, describe the product including color, material, and key features in Japanese.",
    jis_reference: "JIS X 8341-3:2016 1.1.1",
  },

  // ─── Motor ─────────────────────────────────────────────────────────
  {
    id: "a11y_touch_targets",
    category: "motor",
    rule: "Touch targets: minimum 44x44px",
    details:
      "Interactive elements must have a minimum touch/click target size of 44x44px (CSS pixels). This is critical for Japan's large elderly population who may have reduced fine motor control, tremors, or use assistive devices. Applies to buttons, links, form controls, and any tappable element. On mobile, this is especially important as older Japanese users commonly use smartphones but struggle with small targets.",
    jis_reference: "JIS X 8341-3:2016 2.5.5 (WCAG 2.1)",
  },
  {
    id: "a11y_keyboard_with_ime",
    category: "motor",
    rule: "Keyboard navigation must work with IME active",
    details:
      "All interactive elements must be operable via keyboard even when the Japanese IME is active. The IME captures certain key events (Enter, Space, arrow keys) during text composition. Tab navigation, focus management, and keyboard shortcuts must not conflict with IME operations. Users who rely on keyboard navigation (due to motor disabilities) are also using IME for Japanese text input—both must coexist.",
    jis_reference: "JIS X 8341-3:2016 2.1.1",
  },

  // ─── Cognitive ─────────────────────────────────────────────────────
  {
    id: "a11y_form_errors_japanese",
    category: "cognitive",
    rule: "Form error messages must be in Japanese, not English or codes",
    details:
      "All form validation error messages must be written in natural Japanese. Never display English error messages ('Invalid input'), HTTP error codes ('Error 422'), or technical jargon on user-facing forms. Japanese error messages should be polite (using appropriate keigo level), specific about what went wrong, and guide the user to the correct action. Example: '電話番号の形式が正しくありません。ハイフンなしで入力してください。' (The phone number format is incorrect. Please enter without hyphens.)",
    jis_reference: "JIS X 8341-3:2016 3.3.1, 3.3.3",
  },
  {
    id: "a11y_captions_japanese",
    category: "cognitive",
    rule: "Audio/video content needs Japanese captions (字幕)",
    details:
      "All audio and video content must provide Japanese captions (字幕, jimaku). This serves deaf and hard-of-hearing users, users in sound-off environments (common on Japanese commuter trains), and users who prefer reading. Captions should include speaker identification, sound effects, and music descriptions in Japanese. For English-language content on Japanese sites, provide Japanese subtitles, not just English captions.",
    jis_reference: "JIS X 8341-3:2016 1.2.2, 1.2.4",
  },
  {
    id: "a11y_reading_order",
    category: "cognitive",
    rule: "Ensure logical DOM order for Japanese reading direction",
    details:
      "Japanese text can be written left-to-right (横書き, yokogaki, the web default) or top-to-bottom, right-to-left (縦書き, tategaki, traditional). Most web content uses yokogaki, but some literary, cultural, or traditional content uses tategaki via `writing-mode: vertical-rl`. Regardless of visual presentation, the DOM order must be logical and meaningful when read linearly by a screen reader. Test with screen readers to verify reading order matches intended content flow.",
    jis_reference: "JIS X 8341-3:2016 1.3.2",
  },

  // ─── Language ──────────────────────────────────────────────────────
  {
    id: "a11y_ruby_furigana",
    category: "language",
    rule: "Use ruby annotation (furigana) for difficult kanji",
    details:
      "Furigana (振り仮名) are small kana characters placed above or beside kanji to show pronunciation. On the web, use the HTML `<ruby>` element. This is critical for: names with unusual readings (人名), rare or advanced kanji (常用漢字外), content for children or Japanese language learners, legal/medical/technical terms, and government sites serving all literacy levels. Example: <ruby>東京<rp>(</rp><rt>とうきょう</rt><rp>)</rp></ruby>.",
    jis_reference: "JIS X 8341-3:2016 3.1.3, 3.1.4",
  },
  {
    id: "a11y_kanji_alternatives",
    category: "language",
    rule: "Provide text alternatives for kanji-heavy content",
    details:
      "Kanji-heavy content can be a barrier for users with cognitive disabilities, non-native Japanese readers, younger users with limited kanji knowledge, and screen reader users when kanji compounds have ambiguous readings. Provide furigana via <ruby> tags, offer a 'ふりがな表示' (show furigana) toggle, or maintain a simplified Japanese (やさしい日本語, yasashii nihongo) version of critical content. Government sites increasingly offer やさしい日本語 versions.",
    jis_reference: "JIS X 8341-3:2016 3.1.5",
  },
];
