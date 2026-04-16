# Roadmap — japan-ux-mcp

---

## Phase 1: MVP (Week 1-2)

**Goal**: Ship a working MCP server with the 4 core tools. Enough to demo and use daily.

### Tasks

- [ ] Project scaffolding (TypeScript, MCP SDK, npm package setup)
- [ ] **`generate_jp_form`** — form generation with correct Japanese fields
  - Name (姓/名) + furigana (セイ/メイ)
  - Phone (3-field)
  - Address (〒 postal → prefecture → city → block → building)
  - Date (年/月/日)
  - Output formats: HTML, JSX, TSX
  - Context support: b2b_saas, consumer_app, ecommerce
- [ ] **`validate_jp_form`** — audit existing forms against JP conventions
  - Score 0-100
  - Issue list with severity + fix suggestions
  - Code suggestions for each issue
- [ ] **`generate_jp_placeholder`** — realistic Japanese test data
  - Names database (common Japanese surnames + given names)
  - Address generation (real prefectures, realistic blocks)
  - Phone number generation (correct format)
  - Email generation (example.co.jp)
  - Date generation (Gregorian + era)
- [ ] **`suggest_keigo_level`** — UI copy politeness engine
  - Common UI strings mapped (errors, buttons, labels, empty states)
  - Context-aware output (formal/neutral/casual)
  - Alternative phrasings
- [ ] **`score_japan_readiness`** — Japan-readiness scoring (0-100)
  - Category breakdown: forms, copy, trust, typography, cultural
  - Priority fix list with impact points + effort level
  - Verdict summary
- [ ] **`transform_for_japan`** — Western → Japanese markup transformation
  - Takes existing Western form/component markup
  - Returns Japan-corrected version
  - Before/after score comparison
  - Change log explaining every modification and why
- [ ] Ship to npm as `japan-ux-mcp`
- [ ] README with install instructions + quick demo
- [ ] Test with Claude Code and Cursor

### Definition of done
- All 6 tools callable from Claude Code
- Generates correct output for registration, contact, and checkout forms
- `transform_for_japan` demo works end-to-end (Western in → Japanese out with score)
- README has working install instructions

---

## Phase 2: Data-rich (Week 3-4)

**Goal**: Ship the data layer that makes output production-ready. Add signature features.

### Tasks

- [ ] **Japanese data layer**
  - Full 47 prefectures with readings (kana + romaji)
  - Postal code → address lookup (via API or bundled subset)
  - Common Japanese names database (500+ surnames, 500+ given names)
  - Phone number format rules by type (mobile 090/080/070, geographic, toll-free)
  - Era year conversion table (明治→令和)
- [ ] **`get_seasonal_context`** — seasonal awareness engine
  - 72 microseasons (七十二候)
  - Japanese holidays and cultural events calendar
  - Seasonal color palettes with hex codes
  - Design suggestion templates per season
- [ ] **`cultural_ux_audit`** — cultural review tool
  - Color meaning database for Japanese context
  - Trust signal checklist by site type
  - Legal requirement flags (特定商取引法, etc.)
  - Gift-giving convention rules
- [ ] **`get_reference_sites`** — curated Japanese website reference database
  - 100+ Japanese sites organized by vertical (B2B, e-commerce, luxury, fintech, etc.)
  - Design pattern notes for each site
  - Common patterns per vertical
  - Our answer to NEURIA's 300+ Western references
- [ ] **`get_design_context`** — formality x density context matrix
  - Complete design direction per Japanese business vertical
  - Includes: keigo level, color palette, typography, form conventions, trust signals, layout notes
  - Audience-aware (general, youth, elderly, business)
  - Our version of NEURIA's emotion system, but culturally grounded
- [ ] Bilingual README (EN + JP)
- [ ] Submit to MCP registries (mcp.so, awesome-mcp-servers, Glama, PulseMCP)

### Definition of done
- Placeholder data uses real Japanese names/addresses
- Seasonal tool returns accurate data for any date
- Reference database has 50+ curated Japanese sites minimum
- Listed on at least 3 MCP registries

---

## Phase 3: Advanced (Week 5-8)

**Goal**: Polish and expand. Add typography and advanced tools.

### Tasks

- [ ] **`check_jp_typography`** — typography validation
  - Font compatibility checking for Japanese
  - Line height / size recommendations
  - Mixed JP/EN text rules
- [ ] **`format_jp_address`** — address formatting tool
  - Postal code lookup integration
  - Multiple output formats
- [ ] **`convert_era_date`** — era date conversion
  - Bidirectional: Gregorian ↔ Japanese era
  - All eras: 明治, 大正, 昭和, 平成, 令和
- [ ] Enhanced form generation
  - More form types: inquiry, reservation, job application
  - Accessibility attributes (aria labels in Japanese)
  - Responsive layout suggestions
- [ ] Community contribution guidelines
- [ ] Qiita / Zenn article (Japanese tech blog post)
- [ ] Twitter/X launch thread

### Definition of done
- All P2 tools functional
- At least one JP tech blog post published
- Community feedback incorporated

---

## Phase 4: Future (Month 3+)

Ideas to explore based on usage and feedback:

- [ ] `generate_jp_email_template` — business email with correct keigo structure
- [ ] `check_jp_accessibility` — JIS X 8341 audit
- [ ] `suggest_jp_navigation` — navigation patterns by site type
- [ ] Figma plugin companion (read design and run cultural audit)
- [ ] VS Code extension (inline Japanese UX hints)
- [ ] Integration with Lingo.dev for translation + UX pattern combo
