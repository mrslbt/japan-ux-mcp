# Tool Specifications — japan-ux-mcp

> Every MCP tool: what it does, inputs, outputs, examples.
> Priority: P1 = MVP, P2 = Post-launch, P3 = Future

---

## P1 Tools (MVP — build first)

---

### `generate_jp_form`

**Purpose**: Generates complete, culturally correct Japanese form markup.

**Inputs**:
```json
{
  "type": "registration | contact | checkout | inquiry | login",
  "context": "b2b_saas | consumer_app | government | ecommerce | corporate",
  "fields": ["name", "email", "phone", "address", "date_of_birth", "company"],
  "format": "html | jsx | tsx",
  "include_validation": true,
  "include_labels": true,
  "language": "ja | en | bilingual"
}
```

**Output**: Complete form markup with:
- `姓` / `名` (family name first) + furigana fields (katakana)
- `〒` postal code field with auto-fill trigger
- Prefecture → City → Block → Building address cascade
- 3-field phone number with correct patterns
- `年` / `月` / `日` date fields with era support
- Appropriate button text with correct keigo level
- Validation patterns for each field type

**Example call**:
```
generate_jp_form({
  type: "registration",
  context: "consumer_app",
  fields: ["name", "email", "phone"],
  format: "tsx"
})
```

**Example output**:
```tsx
<form>
  <fieldset>
    <legend>お名前</legend>
    <div className="name-fields">
      <label>姓 <input name="sei" pattern="[一-龥ぁ-んァ-ン]+" required /></label>
      <label>名 <input name="mei" pattern="[一-龥ぁ-んァ-ン]+" required /></label>
    </div>
    <div className="furigana-fields">
      <label>セイ <input name="sei_kana" pattern="[ァ-ン]+" required /></label>
      <label>メイ <input name="mei_kana" pattern="[ァ-ン]+" required /></label>
    </div>
  </fieldset>

  <label>メールアドレス
    <input name="email" type="email" required />
  </label>

  <fieldset>
    <legend>電話番号</legend>
    <div className="phone-fields">
      <input name="phone1" pattern="[0-9]{2,5}" maxLength={5} />
      <span>-</span>
      <input name="phone2" pattern="[0-9]{1,4}" maxLength={4} />
      <span>-</span>
      <input name="phone3" pattern="[0-9]{4}" maxLength={4} />
    </div>
  </fieldset>

  <button type="submit">登録する</button>
</form>
```

---

### `validate_jp_form`

**Purpose**: Audits an existing form against Japanese conventions. Returns issues + fixes.

**Inputs**:
```json
{
  "form_markup": "<form>...</form>",
  "context": "b2b_saas | consumer_app | government | ecommerce | corporate"
}
```

**Output**:
```json
{
  "score": 45,
  "issues": [
    {
      "field": "name",
      "severity": "critical",
      "issue": "Name field uses Western order (first/last). Japanese forms use 姓 (family) then 名 (given).",
      "fix": "Reverse field order. Label as 姓 and 名.",
      "code_suggestion": "<label>姓 <input name='sei' /></label><label>名 <input name='mei' /></label>"
    },
    {
      "field": "name",
      "severity": "critical",
      "issue": "Missing furigana fields. Required for Japanese names (multiple readings possible).",
      "fix": "Add katakana furigana fields below name fields.",
      "code_suggestion": "<label>セイ <input name='sei_kana' pattern='[ァ-ン]+' /></label>"
    },
    {
      "field": "phone",
      "severity": "high",
      "issue": "Single phone input. Japanese convention uses 3 separate fields.",
      "fix": "Split into 3 fields: area code (2-5 digits), exchange (1-4 digits), subscriber (4 digits)."
    },
    {
      "field": "address",
      "severity": "high",
      "issue": "Missing postal code auto-fill. Japanese users expect 〒 code to populate prefecture and city.",
      "fix": "Add 〒 postal code field (XXX-XXXX format) with auto-fill for 都道府県 and 市区町村."
    }
  ],
  "passed": [
    "Email field: OK",
    "Submit button: appropriate text"
  ]
}
```

---

### `generate_jp_placeholder`

**Purpose**: Returns realistic Japanese test data for prototypes and development.

**Inputs**:
```json
{
  "count": 5,
  "fields": ["name", "address", "phone", "email", "company", "date_of_birth"],
  "gender": "mixed | male | female",
  "age_range": "20-40"
}
```

**Output**:
```json
[
  {
    "sei": "田中",
    "mei": "太郎",
    "sei_kana": "タナカ",
    "mei_kana": "タロウ",
    "sei_romaji": "Tanaka",
    "mei_romaji": "Taro",
    "email": "tanaka.taro@example.co.jp",
    "phone": ["090", "1234", "5678"],
    "phone_formatted": "090-1234-5678",
    "postal_code": "150-0001",
    "prefecture": "東京都",
    "city": "渋谷区",
    "address_line": "神宮前1-2-3",
    "building": "メゾン原宿 301",
    "full_address": "〒150-0001 東京都渋谷区神宮前1-2-3 メゾン原宿 301",
    "company": "株式会社タナカ商事",
    "date_of_birth": {
      "gregorian": "1992-03-15",
      "japanese": "平成4年3月15日"
    }
  }
]
```

---

### `suggest_keigo_level`

**Purpose**: Analyzes UI copy context and returns appropriately polite Japanese text.

**Inputs**:
```json
{
  "text": "Invalid email address",
  "ui_element": "error_message | button | label | tooltip | empty_state | confirmation | onboarding | notification",
  "context": "b2b_saas | consumer_app | government | ecommerce | corporate",
  "tone": "formal | neutral | friendly"
}
```

**Output**:
```json
{
  "input": "Invalid email address",
  "suggested": "メールアドレスの形式が正しくありません",
  "level": "teineigo (丁寧語)",
  "alternatives": [
    {
      "text": "正しいメールアドレスをご入力ください",
      "level": "sonkeigo (尊敬語)",
      "when": "Government, banking, or very formal B2B contexts"
    },
    {
      "text": "メールアドレスを確認してね",
      "level": "casual",
      "when": "Youth-oriented apps only. Avoid in most professional contexts."
    }
  ],
  "note": "Japanese error messages should guide the user to the correct action, not just state what's wrong. Always include a constructive suggestion."
}
```

---

### `score_japan_readiness`

**Purpose**: Scores any page or component for Japan-readiness on a 0-100 scale with category breakdown. Inspired by NEURIA's scoring approach but applied to cultural correctness instead of aesthetic emotions.

**Inputs**:
```json
{
  "markup": "<form>...</form>",
  "description": "E-commerce checkout page with guest info form, payment selection, and order summary",
  "context": "ecommerce",
  "include_suggestions": true
}
```

**Output**:
```json
{
  "japan_readiness_score": 34,
  "verdict": "This site would feel foreign to Japanese users. Critical fixes needed in forms and trust signals.",
  "breakdown": {
    "forms": {
      "score": 20,
      "issues": ["Western name order", "No furigana", "Single phone field", "No postal auto-fill"],
      "quick_wins": ["Reverse name fields", "Add furigana row"]
    },
    "copy": {
      "score": 40,
      "issues": ["Error messages too blunt — no constructive guidance", "Button text lacks appropriate keigo"],
      "quick_wins": ["Add polite suffix to error messages", "Change 'Submit' to '注文を確定する'"]
    },
    "trust": {
      "score": 15,
      "issues": ["No 特定商取引法 page", "No company registration visible", "Phone number not in header"],
      "quick_wins": ["Add legal disclosure link to footer"]
    },
    "typography": {
      "score": 60,
      "issues": ["Line-height 1.5 too tight for Japanese body text"],
      "quick_wins": ["Increase to 1.8"]
    },
    "cultural": {
      "score": 35,
      "issues": ["No seasonal awareness", "Generic stock imagery"],
      "quick_wins": ["Add seasonal accent color"]
    }
  },
  "priority_fixes": [
    { "fix": "Add furigana fields to name inputs", "impact": "+12 points", "effort": "low" },
    { "fix": "Add 特定商取引法 disclosure page", "impact": "+10 points", "effort": "medium" },
    { "fix": "Restructure address to 〒 postal format", "impact": "+8 points", "effort": "low" }
  ]
}
```

---

### `transform_for_japan`

**Purpose**: Takes Western markup and returns a Japan-ready version. The before/after demo killer.

**Inputs**:
```json
{
  "markup": "<form>...<input name='firstName' />...</form>",
  "context": "b2b_saas | consumer_app | government | ecommerce | corporate",
  "format": "html | jsx | tsx",
  "preserve_styling": true
}
```

**Output**:
```json
{
  "original_score": 12,
  "transformed_score": 89,
  "transformed_markup": "<form>...<input name='sei' />...</form>",
  "changes_made": [
    {
      "what": "Reversed name field order to 姓→名",
      "why": "Japanese convention places family name first"
    },
    {
      "what": "Added furigana fields (セイ/メイ)",
      "why": "Japanese names have multiple possible readings — furigana clarifies pronunciation"
    },
    {
      "what": "Split phone into 3 fields (XXX-XXXX-XXXX)",
      "why": "Japanese phone convention uses 3 separate input fields"
    },
    {
      "what": "Restructured address to 〒 postal → prefecture → city → block → building",
      "why": "Japanese addresses go large-to-small, starting with postal code"
    },
    {
      "what": "Changed button from 'Submit' to 'ご登録内容を確認する'",
      "why": "Formal keigo appropriate for B2B SaaS context"
    }
  ],
  "improvement": "+77 points"
}
```

---

## P2 Tools (Post-launch)

---

### `get_seasonal_context`

**Purpose**: Returns current Japanese seasonal/cultural context for design decisions.

**Inputs**:
```json
{
  "date": "2026-04-15",
  "include_colors": true,
  "include_events": true,
  "lookahead_days": 30
}
```

**Output**:
```json
{
  "season": "spring (春)",
  "microseason": "虹始見 (rainbows begin to appear)",
  "current_events": [
    "入学式 (school entrance ceremonies)",
    "花見 (cherry blossom viewing) — late season"
  ],
  "upcoming_events": [
    {
      "name": "昭和の日 (Showa Day)",
      "date": "2026-04-29"
    },
    {
      "name": "ゴールデンウィーク",
      "date": "2026-04-29 to 2026-05-05",
      "note": "Many businesses closed or reduced hours. Avoid launching products during this period."
    },
    {
      "name": "こどもの日 (Children's Day)",
      "date": "2026-05-05"
    }
  ],
  "seasonal_colors": [
    { "name": "桜色 (sakura)", "hex": "#F4A7B9", "usage": "Backgrounds, accents" },
    { "name": "若草色 (wakakusa)", "hex": "#A4C639", "usage": "Fresh/renewal themes" },
    { "name": "藤色 (fuji)", "hex": "#BAA8D3", "usage": "Elegant spring accent" }
  ],
  "design_notes": [
    "Cherry blossom motifs still appropriate in mid-April",
    "Fresh green (新緑) themes becoming more appropriate as May approaches",
    "Avoid heavy/dark themes — spring designs should feel light and hopeful"
  ]
}
```

---

### `cultural_ux_audit`

**Purpose**: Flags cultural issues in a UI design that might be missed by non-Japanese designers.

**Inputs**:
```json
{
  "description": "E-commerce checkout page with white background, red sale badges, gift wrapping option",
  "context": "ecommerce",
  "target_audience": "general_japanese"
}
```

**Output**:
```json
{
  "issues": [
    {
      "type": "color",
      "severity": "info",
      "finding": "Heavy use of white is generally fine for e-commerce. Note: in funeral/mourning contexts (香典 envelopes), white + black is associated with death. Not an issue here.",
      "action": "No change needed for e-commerce context."
    },
    {
      "type": "feature",
      "severity": "high",
      "finding": "Gift wrapping option detected. Japanese gift-giving (贈答) has strict conventions: wrapping style differs by occasion (祝儀袋 for celebrations, 不祝儀袋 for condolences). のし (noshi) labels are expected.",
      "action": "Add occasion selector (お祝い/お見舞い/お中元/お歳暮) and のし name input field."
    },
    {
      "type": "trust",
      "severity": "medium",
      "finding": "Japanese e-commerce users expect visible trust signals: 特定商取引法に基づく表記 (legal disclosure), company registration info, SSL badge, return policy link.",
      "action": "Add footer section with legal disclosures. Japanese law requires 特定商取引法 page for online commerce."
    }
  ],
  "passed": [
    "Red sale badges: appropriate. Red = attention/sale in Japanese retail context.",
    "Layout density: appropriate for e-commerce."
  ]
}
```

---

### `check_jp_typography`

**Purpose**: Validates typography choices for Japanese/mixed text.

**Inputs**:
```json
{
  "font_family": "Noto Sans JP",
  "font_size_body": "14px",
  "line_height": "1.5",
  "mixed_content": true
}
```

**Output**:
```json
{
  "score": 82,
  "findings": [
    {
      "aspect": "font_choice",
      "status": "good",
      "note": "Noto Sans JP is well-supported, has good kanji coverage, and appropriate weight range."
    },
    {
      "aspect": "line_height",
      "status": "warning",
      "note": "1.5 is acceptable but tight for Japanese body text. Japanese characters are taller and denser than Latin. Recommended: 1.7-2.0 for body text.",
      "suggestion": "line-height: 1.8"
    },
    {
      "aspect": "font_size",
      "status": "warning",
      "note": "14px is minimum for Japanese body text. Kanji at 14px can be hard to read for older users. Recommended: 16px for body.",
      "suggestion": "font-size: 16px"
    },
    {
      "aspect": "mixed_text",
      "status": "info",
      "note": "For mixed JP/EN content, consider setting English text to a slightly smaller optical size or using font-feature-settings for proportional alternates."
    }
  ]
}
```

---

### `format_jp_address`

**Purpose**: Converts address components to proper Japanese format.

**Inputs**:
```json
{
  "postal_code": "1500001",
  "format": "full | short | postal_only"
}
```

**Output**:
```json
{
  "postal_code_formatted": "〒150-0001",
  "prefecture": "東京都",
  "prefecture_kana": "トウキョウト",
  "city": "渋谷区",
  "city_kana": "シブヤク",
  "area": "神宮前",
  "area_kana": "ジングウマエ",
  "full_format": "〒150-0001 東京都渋谷区神宮前"
}
```

---

### `get_reference_sites`

**Purpose**: Returns curated Japanese website references by business vertical, with design pattern notes. Our answer to NEURIA's 300+ Western reference sites. Includes both established and emerging companies to show where Japanese design is heading.

**Inputs**:
```json
{
  "vertical": "b2b_saas | consumer_app | ecommerce | luxury_hospitality | fintech | government | healthcare | food_beverage | media | corporate | ai_tech | construction_real_estate | design_studio",
  "include_patterns": true,
  "include_emerging": true,
  "limit": 5
}
```

**Example output — `luxury_hospitality`**:
```json
{
  "vertical": "luxury_hospitality",
  "design_direction": {
    "formality": "very_formal",
    "density": "sparse",
    "keigo_level": "sonkeigo + kenjogo",
    "color_mood": "Muted, natural, seasonal rotation expected",
    "typography": "Mincho (serif) for headings, Gothic (sans) for body. Vertical text (tategaki) for atmosphere."
  },
  "reference_sites": [
    {
      "name": "星のや (Hoshinoya)",
      "url": "hoshinoya.com",
      "patterns": [
        "Full-bleed seasonal photography rotated quarterly",
        "Vertical text (tategaki) in hero for traditional atmosphere",
        "Extremely sparse layout — white space as luxury signal",
        "Booking flow uses very formal keigo (謙譲語)"
      ]
    },
    {
      "name": "アマン東京 (Aman Tokyo)",
      "url": "aman.com/hotels/aman-tokyo",
      "patterns": [
        "Atmospheric, no hard sells",
        "Minimal navigation — content-led discovery",
        "Photography-dominant, text-minimal"
      ]
    },
    {
      "name": "べにや無何有 (Beniya Mukayu)",
      "url": "mukayu.com",
      "patterns": [
        "Traditional Japanese aesthetic in digital form",
        "Earth tones from natural materials",
        "Slow, contemplative page transitions"
      ]
    }
  ],
  "common_patterns": [
    "Seasonal imagery rotation is mandatory, not optional",
    "Phone number in header (not just footer) for trust",
    "Very formal keigo throughout — 謙譲語 for self-reference, 尊敬語 for guests",
    "のし (noshi) and gift-wrapping options for hotel shop features"
  ]
}
```

**Example output — `ai_tech`**:
```json
{
  "vertical": "ai_tech",
  "design_direction": {
    "formality": "neutral",
    "density": "sparse",
    "keigo_level": "teineigo — professional but not stiff",
    "color_mood": "Dark backgrounds with high-contrast accents. Tech-forward, global aesthetic.",
    "typography": "Gothic (sans) only. Often English-first fonts (Poppins, Lexend, Inter) paired with Noto Sans JP. Large bold headlines."
  },
  "reference_sites": [
    {
      "name": "Sakana AI",
      "url": "sakana.ai",
      "tier": "unicorn ($2.65B)",
      "patterns": [
        "Ultra-minimal — stripped of all decoration, content-first",
        "English-primary, Japanese-secondary (global-first positioning)",
        "Poppins font (light weight 200) — tech startup aesthetic",
        "High-contrast dark/light palette, accent blue (#68f)",
        "No traditional nav bar — flat architecture with inline text links",
        "Bilingual content with seamless JP/EN switching"
      ],
      "trend_signal": "JP AI companies now present globally first. English is primary. Japanese is secondary."
    },
    {
      "name": "ELYZA",
      "url": "elyza.ai",
      "tier": "leading JP LLM company",
      "patterns": [
        "Japanese-language AI company with tech-forward design",
        "Dark theme with gradient accents",
        "Technical credibility through benchmark visualizations"
      ],
      "trend_signal": "Even Japanese-language-focused companies adopt global design patterns."
    },
    {
      "name": "Preferred Networks",
      "url": "preferred.jp",
      "tier": "unicorn — deep learning / robotics",
      "patterns": [
        "Clean corporate with technical depth",
        "Research paper listings as trust signals (vs. customer logos)",
        "Bilingual with equal weight JP/EN"
      ],
      "trend_signal": "Deep tech uses research publications as primary trust signal."
    }
  ],
  "common_patterns": [
    "Global-first design — many JP AI sites look indistinguishable from SF startups",
    "English-primary or bilingual with equal weight",
    "Large sans-serif fonts (Poppins, Inter, Lexend) paired with Noto Sans JP",
    "Dark themes popular — signals technical sophistication",
    "Trust through research/benchmarks, not customer count",
    "Minimal, flat navigation — rejects traditional Japanese information density"
  ],
  "design_note": "This vertical represents where Japanese web design is HEADING, not where it's been. The global-local split is widening — AI/tech companies adopt SF aesthetics while traditional industries retain distinctly Japanese patterns."
}
```

**Example output — `b2b_saas`**:
```json
{
  "vertical": "b2b_saas",
  "design_direction": {
    "formality": "formal",
    "density": "medium",
    "keigo_level": "teineigo (です/ます) — professional but approachable",
    "color_mood": "Clean, branded accent on neutral base. Blues and greens dominate for trust.",
    "typography": "Noto Sans JP primary. Some pair with Lexend or Inter for English. 16px body minimum."
  },
  "reference_sites": [
    {
      "name": "SmartHR",
      "url": "smarthr.co.jp",
      "tier": "market leader — #1 HR SaaS",
      "patterns": [
        "Modern Japanese corporate benchmark — clean, spacious, not cluttered",
        "Generous whitespace — breaks the 'dense Japanese website' stereotype",
        "Moderate keigo (です/ます) — professional but not stiff",
        "Responsive grid with CSS custom properties",
        "Color animation on hover states — subtle interaction polish"
      ],
      "trend_signal": "The gold standard for 'modern Japanese B2B SaaS done right.'"
    },
    {
      "name": "freee",
      "url": "freee.co.jp",
      "tier": "market leader — accounting SaaS",
      "patterns": [
        "Progressive disclosure for extreme complexity (40+ products)",
        "Minimal registration friction — email only to start",
        "Collapsible product menus prevent cognitive overload",
        "Multiple 'No.1 share' claims as trust signals",
        "TRUSTe certification badge — important for JP data-sensitive B2B"
      ],
      "trend_signal": "How to organize massive product complexity without overwhelming Japanese business users."
    },
    {
      "name": "10X",
      "url": "10x.co.jp",
      "tier": "emerging — retail tech",
      "patterns": [
        "Noto Sans JP + Lexend dual-font strategy",
        "96px bold headlines — breaking traditional Japanese conservatism",
        "Smooth fade-in animations and scale transforms on hover",
        "Card-based responsive grid (3-col desktop → 2-col mobile)",
        "Very modern, could pass for a Western tech site but with JP content"
      ],
      "trend_signal": "Next-gen JP SaaS design — bolder, more animated, less conservative than SmartHR generation."
    },
    {
      "name": "LayerX",
      "url": "layerx.co.jp",
      "tier": "emerging — $101M back-office automation",
      "patterns": [
        "Letter-spaced Japanese text as design element ('未 来 の 希 望 を')",
        "Masonry image grids in recruitment sections",
        "Minimalist corporate with poetic typography touches",
        "Dark backgrounds with restrained color palette"
      ],
      "trend_signal": "Spaced Japanese characters as typographic art — a distinctly modern JP design trend."
    }
  ],
  "common_patterns": [
    "Clean layouts with generous whitespace — the 'dense Japanese site' era is fading for B2B SaaS",
    "実績 (track record) sections: number of companies, years, market share claims",
    "Free trial CTAs prominently placed — 30-day trial is standard",
    "Multi-product companies use collapsible navigation or product portals",
    "Trust signals: TRUSTe badge, customer logos, 導入事例 (case studies)",
    "Blog/news feed on homepage signals activity and expertise"
  ]
}
```

---

### `get_design_context`

**Purpose**: Returns a complete design direction based on a formality x density matrix mapped to Japanese business verticals. Our version of NEURIA's emotion system, but culturally grounded.

**Inputs**:
```json
{
  "vertical": "b2b_saas | consumer_app | ecommerce | luxury_hospitality | fintech | government | healthcare | food_beverage | media | corporate",
  "audience": "general | youth | elderly | business | family",
  "formality_override": "very_formal | formal | neutral | casual"
}
```

**Output**:
```json
{
  "vertical": "fintech",
  "audience": "general",
  "matrix_position": { "formality": "very_formal", "density": "medium" },
  "design_direction": {
    "keigo_level": "sonkeigo (尊敬語) — banking context demands highest respect level",
    "color_palette": {
      "primary": { "hex": "#003366", "name": "紺色 (kon-iro)", "usage": "Trust, stability" },
      "accent": { "hex": "#007A33", "name": "常盤色 (tokiwa-iro)", "usage": "Growth, positive financial movement" },
      "danger": { "hex": "#C53D43", "name": "紅色 (beni-iro)", "usage": "Alerts, negative balance" },
      "background": { "hex": "#F7F7F7", "usage": "Clean, professional base" }
    },
    "typography": {
      "heading_font": "Noto Sans JP (weight 700)",
      "body_font": "Noto Sans JP (weight 400)",
      "body_size": "16px",
      "line_height": "1.8",
      "note": "Avoid Mincho/serif for fintech — Gothic/sans conveys modernity and clarity"
    },
    "form_conventions": {
      "name_fields": "姓名 + furigana mandatory",
      "phone": "3-field, with landline option alongside mobile",
      "address": "Full 〒 cascade, building field mandatory",
      "dates": "Gregorian primary, era support secondary",
      "security": "Two-factor verification UI, session timeout warnings in polite language"
    },
    "trust_signals": [
      "金融庁登録番号 (FSA registration number) in header or immediately visible",
      "SSL/security certification badges",
      "Phone support number in header (not chatbot-only)",
      "個人情報保護方針 (privacy policy) link in main navigation, not just footer",
      "実績 (track record) — number of accounts, years operating"
    ],
    "layout_notes": [
      "Information density: medium. Users want detail but clear hierarchy.",
      "Avoid single-page scrolling — Japanese financial users expect paginated, step-by-step flows",
      "Confirmation screens (確認画面) before any transaction — mandatory UX pattern",
      "Error prevention over error correction — validate inline, disable buttons until form is valid"
    ]
  }
}
```

---

## P3 Tools (Future)

---

### `convert_era_date`

Convert between Gregorian calendar and Japanese era calendar (令和/平成/昭和/大正/明治).

### `generate_jp_email_template`

Generate properly formatted Japanese business email templates with correct keigo structure (挨拶 → 本文 → 結び).

### `check_jp_accessibility`

Audit against JIS X 8341 (Japanese accessibility standard) in addition to WCAG.

### `suggest_jp_navigation`

Recommend navigation patterns based on Japanese conventions for the given site type (corporate, e-commerce, SaaS, government).
