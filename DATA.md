# Data Requirements — japan-ux-mcp

> What data the MCP needs, where to source it, and how to structure it.

---

## 1. Prefectures (都道府県)

**Need**: All 47 prefectures with readings and codes.

**Structure**:
```json
{
  "code": "13",
  "name": "東京都",
  "name_kana": "トウキョウト",
  "name_romaji": "Tokyo",
  "region": "関東",
  "type": "都"
}
```

**Source**: JIS X 0401 standard. Static data — rarely changes.

**Status**: Must have for MVP.

---

## 2. Japanese names database

**Need**: Common surnames and given names for realistic placeholder generation.

**Target**: 200+ surnames, 200+ given names (male + female), all with kana readings.

**Structure**:
```json
{
  "surnames": [
    { "kanji": "田中", "kana": "タナカ", "romaji": "Tanaka", "frequency_rank": 4 },
    { "kanji": "佐藤", "kana": "サトウ", "romaji": "Sato", "frequency_rank": 1 }
  ],
  "given_names_male": [
    { "kanji": "太郎", "kana": "タロウ", "romaji": "Taro" },
    { "kanji": "翔太", "kana": "ショウタ", "romaji": "Shota" }
  ],
  "given_names_female": [
    { "kanji": "花子", "kana": "ハナコ", "romaji": "Hanako" },
    { "kanji": "美咲", "kana": "ミサキ", "romaji": "Misaki" }
  ]
}
```

**Source**: Japanese census data, publicly available name frequency lists.

**Status**: Must have for MVP. Start with top 100 each, expand in Phase 2.

---

## 3. Postal code → address mapping

**Need**: Convert 7-digit postal codes to prefecture + city + area.

**Options**:

| Approach | Pros | Cons |
|---|---|---|
| **Bundled JSON** (full dataset) | Offline, fast, no API dependency | ~120,000 entries, large bundle size (~15MB) |
| **Bundled subset** (top 1,000 codes) | Small bundle, covers most common areas | Incomplete |
| **API call** (zipcloud.ibsnet.co.jp) | Always current, complete | Requires internet, API dependency |
| **Hybrid** (bundled common + API fallback) | Best of both | More complex |

**Recommendation**: Start with API (zipcloud) for MVP. Bundle common codes in Phase 2.

**API endpoint**: `https://zipcloud.ibsnet.co.jp/api/search?zipcode=1500001`

**Status**: API integration for MVP, bundled data for Phase 2.

---

## 4. Phone number format rules

**Need**: Validation patterns for all Japanese phone number types.

**Structure**:
```json
{
  "mobile": {
    "prefixes": ["070", "080", "090"],
    "format": "XXX-XXXX-XXXX",
    "total_digits": 11,
    "fields": [3, 4, 4]
  },
  "geographic": {
    "description": "Area code length varies by region (2-5 digits). Remaining digits split to total 10.",
    "examples": [
      { "area": "03", "region": "Tokyo 23 wards", "format": "03-XXXX-XXXX", "fields": [2, 4, 4] },
      { "area": "06", "region": "Osaka", "format": "06-XXXX-XXXX", "fields": [2, 4, 4] },
      { "area": "045", "region": "Yokohama", "format": "045-XXX-XXXX", "fields": [3, 3, 4] },
      { "area": "0120", "region": "Toll-free", "format": "0120-XXX-XXX", "fields": [4, 3, 3] }
    ]
  },
  "ip_phone": {
    "prefixes": ["050"],
    "format": "050-XXXX-XXXX",
    "total_digits": 11,
    "fields": [3, 4, 4]
  }
}
```

**Source**: Ministry of Internal Affairs and Communications (総務省) numbering plan.

**Status**: Must have for MVP (core patterns). Expand geographic codes in Phase 2.

---

## 5. Era year conversion table

**Need**: Convert between Gregorian years and Japanese era years.

**Structure**:
```json
{
  "eras": [
    { "name": "令和", "name_romaji": "Reiwa", "abbrev": "R", "start": "2019-05-01", "end": null },
    { "name": "平成", "name_romaji": "Heisei", "abbrev": "H", "start": "1989-01-08", "end": "2019-04-30" },
    { "name": "昭和", "name_romaji": "Showa", "abbrev": "S", "start": "1926-12-25", "end": "1989-01-07" },
    { "name": "大正", "name_romaji": "Taisho", "abbrev": "T", "start": "1912-07-30", "end": "1926-12-24" },
    { "name": "明治", "name_romaji": "Meiji", "abbrev": "M", "start": "1868-01-25", "end": "1912-07-29" }
  ]
}
```

**Conversion**: `2026 → 令和8年` / `平成4年 → 1992`

**Source**: Static data. Only changes when a new era begins (very rare — last was 2019).

**Status**: Must have for MVP. Small, static dataset.

---

## 6. Seasonal calendar

**Need**: Japanese cultural events, holidays, and 72 microseasons.

**Structure**:
```json
{
  "holidays": [
    { "name": "元日", "name_en": "New Year's Day", "date": "01-01", "type": "national" },
    { "name": "成人の日", "name_en": "Coming of Age Day", "date": "second_monday_january", "type": "national" },
    { "name": "建国記念の日", "name_en": "National Foundation Day", "date": "02-11", "type": "national" }
  ],
  "cultural_events": [
    { "name": "節分", "name_en": "Setsubun", "date": "02-03", "design_notes": "Bean motifs, oni (demon) imagery OK for playful brands" },
    { "name": "ひな祭り", "name_en": "Doll Festival / Girls' Day", "date": "03-03", "design_notes": "Pink/red/white color scheme, peach blossom motifs" },
    { "name": "花見", "name_en": "Cherry blossom viewing", "period": "late_march_to_mid_april", "design_notes": "Cherry blossom (桜) motifs, pink palette" }
  ],
  "microseasons_72": [
    { "name": "東風解凍", "name_en": "East wind melts the ice", "start": "02-04", "end": "02-08", "season": "spring" }
  ],
  "seasonal_colors": {
    "spring": [
      { "name": "桜色", "hex": "#F4A7B9", "season": "early_spring" },
      { "name": "若草色", "hex": "#A4C639", "season": "mid_spring" }
    ],
    "summer": [
      { "name": "浅葱色", "hex": "#00A3AF", "season": "early_summer" },
      { "name": "向日葵色", "hex": "#FFC408", "season": "mid_summer" }
    ],
    "autumn": [
      { "name": "紅葉色", "hex": "#C53D43", "season": "mid_autumn" },
      { "name": "柿色", "hex": "#ED6D3D", "season": "early_autumn" }
    ],
    "winter": [
      { "name": "銀鼠", "hex": "#AFAFB0", "season": "mid_winter" },
      { "name": "白練", "hex": "#F3F3F2", "season": "deep_winter" }
    ]
  }
}
```

**Source**: Japanese calendar data (国立天文台), traditional color references (日本の伝統色).

**Status**: Phase 2. Large dataset but static (holidays shift slightly year to year for Happy Monday laws).

---

## 7. Keigo reference patterns

**Need**: Common UI strings mapped to appropriate politeness levels by context.

**Structure**:
```json
{
  "ui_patterns": {
    "error_invalid_email": {
      "casual": "メールアドレスが違うよ",
      "neutral": "メールアドレスが正しくありません",
      "formal": "メールアドレスの形式が正しくありません",
      "very_formal": "恐れ入りますが、正しいメールアドレスをご入力くださいますようお願い申し上げます"
    },
    "button_submit": {
      "casual": "送信",
      "neutral": "送信する",
      "formal": "送信いたします",
      "very_formal": "ご送信"
    },
    "empty_state_no_results": {
      "casual": "見つからなかった",
      "neutral": "該当する結果がありません",
      "formal": "該当する結果が見つかりませんでした。条件を変更して再度お試しください。",
      "very_formal": "誠に恐れ入りますが、該当する結果が見つかりませんでした。お手数ですが、条件を変更のうえ再度お試しくださいませ。"
    }
  },
  "context_mapping": {
    "b2b_saas": "formal",
    "consumer_app": "neutral",
    "government": "very_formal",
    "ecommerce": "formal",
    "youth_app": "casual",
    "corporate_site": "formal",
    "banking": "very_formal"
  }
}
```

**Source**: Compiled from real Japanese product UIs (SmartHR, freee, MUFG, Mercari, LINE).

**Status**: MVP — start with 30 common UI patterns. Expand to 100+ in Phase 2.

---

## 8. Full-width / half-width character rules (全角・半角)

> Discovered gap: NO competitor MCP handles this. It's a constant source of form validation bugs on Japanese sites.

**Need**: Rules for when to require full-width vs half-width input.

**Structure**:
```json
{
  "rules": {
    "katakana_furigana": {
      "required_width": "full-width",
      "pattern": "[ァ-ヶー]",
      "note": "Furigana fields always require full-width katakana"
    },
    "phone_number": {
      "required_width": "half-width",
      "pattern": "[0-9]",
      "note": "Phone numbers require half-width digits (not ０１２)"
    },
    "postal_code": {
      "required_width": "half-width",
      "pattern": "[0-9]",
      "note": "Postal codes require half-width digits"
    },
    "email": {
      "required_width": "half-width",
      "pattern": "[a-zA-Z0-9@._+-]",
      "note": "Email must be half-width. Common error: users type ＠ instead of @"
    },
    "name_kanji": {
      "required_width": "full-width",
      "note": "Japanese name fields accept full-width kanji, hiragana, katakana"
    },
    "address_numbers": {
      "required_width": "either",
      "note": "Block/building numbers can be either. Some sites normalize to half-width."
    }
  },
  "auto_conversion": {
    "description": "Best practice: auto-convert full-width digits (０１２) to half-width (012) in numeric fields rather than showing an error.",
    "implementation": "str.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))"
  }
}
```

**Source**: Common Japanese web development practices. Documented in various JP engineering blogs.

**Status**: MVP. Small dataset, high impact — prevents the #1 form validation frustration for Japanese users.

---

## 9. CJK typography rules (禁則処理)

> Discovered gap: NO typography MCP handles CJK. Not even Font MCP or Forgespace.

**Need**: Japanese line-breaking rules (kinsoku shori), font stack recommendations, spacing rules.

**Structure**:
```json
{
  "kinsoku_shori": {
    "cannot_start_line": "、。，．・：；？！）〕］｝〉》」』】‐ー",
    "cannot_end_line": "（〔［｛〈《「『【",
    "note": "These characters must not appear at the start/end of a line. CSS handles most via word-break: normal, but custom implementations may need this."
  },
  "font_stacks": {
    "gothic_sans": {
      "stack": "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif",
      "use": "Body text, UI elements, most web content",
      "note": "Hiragino for macOS, Yu Gothic for Windows, Noto Sans JP as web font fallback"
    },
    "mincho_serif": {
      "stack": "'Hiragino Mincho ProN', 'Noto Serif JP', 'Yu Mincho', 'MS PMincho', serif",
      "use": "Headings with traditional feel, editorial content, formal documents"
    }
  },
  "spacing_rules": {
    "cjk_latin_gap": "When mixing Japanese and English text, add ~0.25em space between CJK and Latin characters. Some browsers do this automatically via text-autospace CSS property.",
    "line_height": "Japanese body text needs line-height 1.7-2.0 (vs 1.4-1.6 for English). Kanji are visually denser.",
    "min_font_size": "16px recommended for Japanese body text. Kanji readability drops sharply below 14px, especially for older users."
  }
}
```

**Source**: W3C Requirements for Japanese Text Layout (JLReq), Japanese web development best practices.

**Status**: Phase 2. Medium dataset but high impact for typography tool.

---

## 10. Reference site database (curated Japanese websites)

> Our answer to NEURIA's 300+ Western reference sites. We curate Japanese sites by vertical with design pattern notes.

**Target**: 100+ sites across 12 verticals at launch. Expand to 200+ with community contributions.

**Verticals and seed sites**:

### AI / Tech (global-forward Japanese companies)
| Site | URL | Why it's a reference |
|---|---|---|
| Sakana AI | sakana.ai | $2.65B unicorn. Ultra-minimal, English-primary, Poppins font. The "how JP AI presents globally" benchmark |
| ELYZA | elyza.ai | JP-language LLM leader. Dark theme, gradient accents, technical credibility through benchmarks |
| Preferred Networks | preferred.jp | Deep learning unicorn. Research papers as trust signals. Bilingual equal weight |
| ABEJA | abejainc.com | Computer vision for retail. Bridges physical/digital — smart city relevant |

### B2B SaaS (modern Japanese corporate)
| Site | URL | Why it's a reference |
|---|---|---|
| SmartHR | smarthr.co.jp | #1 HR SaaS. THE benchmark for modern JP B2B. Clean, spacious, generous whitespace |
| freee | freee.co.jp | Accounting SaaS. Progressive disclosure for 40+ products. Minimal registration friction |
| 10X | 10x.co.jp | Retail tech. Noto Sans JP + Lexend, 96px headlines, smooth animations. Next-gen JP SaaS |
| LayerX | layerx.co.jp | $101M back-office automation. Letter-spaced JP text as design art. Poetic minimalism |
| ANDPAD | andpad.co.jp | Construction SaaS. Heavy trust signals (156K+ companies, government awards, NETIS) |

### Consumer / Marketplace
| Site | URL | Why it's a reference |
|---|---|---|
| Mercari | mercari.com | Largest JP marketplace. Mobile-first, casual tone, SNS-like UX |
| Timee | timee.co.jp | Japan's largest gig platform. Casual keigo, bright CTAs, real worker photos as social proof |
| Tabelog | tabelog.com | Restaurant reviews. Information density done right. Scene-based filtering (宴会, 接待, デート) |
| Cookpad | cookpad.com | Recipes. Seasonal awareness, community-driven (つくれぽ), visual-first search |

### Healthcare
| Site | URL | Why it's a reference |
|---|---|---|
| Ubie | ubie.life | AI symptom checker. Soft lavender/pink gradients. Multi-font strategy (6+ fonts for JP/EN). Warm, approachable |

### Luxury Hospitality
| Site | URL | Why it's a reference |
|---|---|---|
| Hoshinoya | hoshinoya.com | Seasonal photography rotation, vertical text (tategaki), extreme white space |
| Aman Tokyo | aman.com/hotels/aman-tokyo | Atmospheric, photography-dominant, minimal text |
| Beniya Mukayu | mukayu.com | Traditional aesthetic in digital form. Earth tones. Contemplative transitions |

### Fintech
| Site | URL | Why it's a reference |
|---|---|---|
| MUFG | mufg.jp | Maximum trust signals. Registration numbers, security badges, phone in header |
| PayPay | paypay.ne.jp | Consumer fintech. Lighter, friendlier tone. QR code prominence |

### E-commerce
| Site | URL | Why it's a reference |
|---|---|---|
| Rakuten | rakuten.co.jp | The archetype of information-dense Japanese e-commerce. Love it or hate it, it converts |
| ZOZOTOWN | zozo.jp | Fashion e-commerce. Cleaner, more modern than Rakuten. Visual-first |
| Muji | muji.com | Minimal Japanese design philosophy applied to e-commerce |

### Design Studios (the tastemakers — where JP design is heading)
| Studio | URL | Why it's a reference |
|---|---|---|
| mount inc. | mount.jp | Awwwards winner. UNIQLO, KOKUYO, POLA, The Okura Tokyo |
| monopo | monopo.co.jp | Nike SB Japan, UNIQLO UT 2025, Gap Japan, Bose 60th |
| SHIFTBRAIN | shiftbrain.com | Panasonic, Toyota/Lexus, Shiseido, Osaka Expo 2025 |
| Garden Eight | garden-eight.com | Minimal + illustration + subtle motion. Editorial-focused |

**Structure per site**:
```json
{
  "name": "SmartHR",
  "url": "smarthr.co.jp",
  "vertical": "b2b_saas",
  "tier": "market_leader",
  "formality": "formal",
  "density": "medium",
  "patterns": ["generous whitespace", "moderate keigo", "responsive grid"],
  "fonts": ["Noto Sans JP"],
  "trend_signals": ["Modern JP B2B benchmark — proves Japanese sites don't have to be dense"],
  "last_reviewed": "2026-04"
}
```

**Source**: Manually curated through direct site analysis. Updated quarterly.

**Status**: Phase 2. Start with 50 sites, expand to 100+ with community contributions.

### Design trends discovered from research:

These should be encoded as context in the MCP — AI should know about these when generating designs:

1. **Letter-spaced Japanese characters** — LayerX uses `未 来 の 希 望 を` for dramatic effect. Distinctly modern JP typography no Western designer would think to do
2. **Multi-font JP/EN strategies** — Ubie uses 6+ fonts. 10X pairs Noto Sans JP + Lexend. This is becoming standard for polished JP sites
3. **Global-first Japanese companies** — Sakana AI is English-primary. AI/tech companies increasingly present globally first, Japanese second
4. **Casual keigo is acceptable now** — Timee uses informal Japanese ("例えばこんなお仕事が見つかる"). Context-dependent, not blanket-formal
5. **Bento-style layouts** — Modular content blocks inspired by bento boxes. Grid systems that create clean, scannable experiences

---

## Data sourcing priority

| Dataset | Phase | Size | Static/Dynamic |
|---|---|---|---|
| Prefectures (47) | MVP | Tiny | Static |
| Era years (5) | MVP | Tiny | Static (until new era) |
| Phone format rules | MVP | Small | Static |
| Keigo patterns (30) | MVP | Small | Manually curated |
| Name database (200+) | MVP | Small | Static |
| Full-width/half-width rules | MVP | Tiny | Static |
| Postal code API | MVP | API call | Dynamic |
| Reference site database (50+) | Phase 2 | Medium | Quarterly review |
| Seasonal calendar | Phase 2 | Medium | Mostly static |
| Traditional colors | Phase 2 | Medium | Static |
| 72 microseasons | Phase 2 | Small | Static |
| CJK typography / kinsoku | Phase 2 | Small | Static |
| Font stack recommendations | Phase 2 | Small | Evolves slowly |
| Design trend signals | Phase 2 | Small | Quarterly update |
| Bundled postal codes | Phase 2 | Large (~15MB) | Annual update |
