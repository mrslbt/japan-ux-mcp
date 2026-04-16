# Competitive Analysis — japan-ux-mcp

> Deep analysis of every relevant MCP server in the ecosystem.
> Last updated: April 2026

---

## TL;DR

- 10,000+ MCP servers exist. Zero encode Japanese UX conventions.
- The closest competitors are generic UX knowledge bases (shallow) or translation pipelines (strings only, not design).
- A Japanese developer built a design intelligence MCP (NEURIA) but made it 100% Western-focused — proving the demand exists and the Japanese gap is untapped.
- japan-seasons-mcp has Japanese seasonal data but for tourism, not design.
- We have zero direct competitors. The entire lane is empty.

---

## Category 1: UX/Design Knowledge MCPs

These are the closest to what we're building in spirit — but none handle Japan.

### elsahafy/ux-mcp-server
- **GitHub**: 11 stars | **npm**: 478 downloads/month
- **What it does**: 23 tools + 28 knowledge bases covering WCAG, Nielsen heuristics, UI patterns, dark mode, e-commerce UX, healthcare UX, etc.
- **Architecture**: Single 4,131-line TypeScript file. All knowledge in static JSON files.

| Strength | Weakness |
|---|---|
| Broadest UX coverage of any MCP (28 topics) | Tools are shallow — just regex pattern matching, not real analysis |
| Published on npm, easy install | Monolith architecture (one 4K-line file) |
| Excellent README with multi-client setup | Zero Japanese/Asian UX patterns |
| Actively maintained (last update Apr 2026) | No tests |
| Covers niche domains (healthcare, neurodiversity) | Has an `ux://i18n/patterns` resource but it's generic — no JP content |

**Their `suggest_form_pattern` tool**: Returns generic form recommendations. Does NOT know about furigana, Japanese address format, 3-field phone, era dates, or any JP convention.

**Their `suggest_error_message` tool**: Returns English error messages only. No keigo awareness.

**How we beat them**: Our tools generate actual code with correct Japanese patterns. Theirs return paragraphs of advice. We're a power tool, they're a textbook.

---

### MCP-Stack-for-UI-UX-Designers (panktishah62)
- **GitHub**: 23 stars | **npm**: Not published
- **What it does**: 3 separate MCP servers — web scraping for inspiration, Figma read/write, Figma-to-React conversion.

| Strength | Weakness |
|---|---|
| Real Figma integration (read + write via plugin) | Abandoned — created and last pushed same day (Apr 2025) |
| Generates React/Tailwind from Figma nodes | Not on npm, must clone and build manually |
| Write-to-Figma via WebSocket plugin bridge | Three servers, no unified config or orchestration |
| 31 tools total | Folder names are swapped (inspire-mcp ≠ inspiration) |
| | Uses 3 different MCP SDK versions (0.6, 1.6, 1.7) |
| | No tests, no CI, .DS_Store committed |

**How we beat them**: We actually exist as maintained software. They're a hackathon project.

---

### NEURIA Design Intelligence MCP
- **Developer**: Kosuke Uemura (Japanese developer)
- **What it does**: Emotion-based design system generation from 300+ award-winning websites. Maps designs to 6 emotions: Trust (Linear, Stripe), Excitement (Vercel, Arc), Calm (Headspace, Muji), Luxury (Porsche, Rolex), Innovation (OpenAI, Tesla), Energy (Spotify, Discord).
- **Tools**: `get_emotion_tokens`, `search_similar_designs`, `get_color_palette`, `get_typography`, `score_html`, `get_animation_tokens`, `analyze_reference_url`, `analyze_visual_design`, `analyze_brand_voice`

| Strength | Weakness |
|---|---|
| Genuinely novel concept — "design taste" as an MCP | 100% Western reference sites despite Japanese developer |
| Emotion-to-design-token mapping is unique | No CJK typography |
| 300+ curated reference sites | No Japanese design patterns |
| Goes beyond components into design intelligence | No locale-aware token generation |

**Why this matters for us**: NEURIA proves that design intelligence MCPs have demand. A Japanese developer built it but completely ignored the Japanese market. This is our strongest validation that the gap exists and is worth filling.

**Not a direct competitor** — they do emotion-based Western design tokens. We do culturally-aware Japanese UX patterns. Complementary, not competing.

---

## Category 2: Localization/Translation MCPs

These handle strings and translation files. None handle design patterns.

### Lingo.dev MCP (Closest to our territory)
- **What it does**: Configures localization engine — brand voice per locale, glossary, linguistic rules, model routing.
- **Japanese relevance**: CAN configure keigo-level formality rules manually. Recommends Claude Sonnet for EN→JP. But provides zero built-in Japanese knowledge — you must already know the rules to encode them.

| Strength | Weakness |
|---|---|
| Per-locale formality settings | Configuration only — doesn't execute translations |
| Semantic glossary matching | Zero built-in Japanese linguistic knowledge |
| Model routing by language pair | Users must know keigo rules to encode them |
| Most linguistically aware MCP | Requires Lingo.dev platform + pricing |

**How we beat them**: Lingo.dev says "configure your own Japanese rules." We say "here are the rules, already encoded, ready to use." They're a blank form, we're the filled-in answer sheet.

---

### Other Translation MCPs (Not direct competitors)

| MCP | Tools | Relevance to us |
|---|---|---|
| **Lokalise** (unofficial) | 59 tools, full TMS lifecycle | API wrapper. Manages strings, not design. |
| **Phrase** (official) | ~80 operations, branch-based workflow | Same — strings only. |
| **Smartling** (official) | Project/file/glossary management | Same — strings only. |
| **SimpleLocalize** | 9 tools, lightweight | Same — strings only. |
| **Crowdin** (experimental) | Hosted, conversational | Same — strings only. |
| **i18n-mcp** (dalisys) | 17 tools, code analysis | Manages i18n files. Best code analysis. |
| **i18next-mcp-server** | 12 tools, health checking | i18next ecosystem only. |
| **IntlPull** | 17 tools, multi-AI translation | Has DeepL (decent JP) but no design layer. |

**The pattern**: Every localization MCP treats language as strings-in, strings-out. Translation is 30% of making a product work in Japan. The other 70% — form patterns, politeness calibration, seasonal awareness, cultural conventions, typography — is what we handle.

---

## Category 3: Figma & Component Library MCPs

These generate or manage UI components. None are locale-aware.

### Figma Official MCP
- **16 tools** — the most powerful design MCP in existence.
- Full read AND write to canvas. Design-to-code. Code-to-design. Screenshot capture.
- **Japanese handling**: None. Defaults to React+Tailwind with English patterns.

### Framelink (Figma-Context-MCP)
- **14.4k stars**, ~10k weekly npm downloads. Most popular design MCP.
- Fetches Figma data and simplifies it for AI code generation.
- **Japanese handling**: None.

### Component Library MCPs

| MCP | What it does | Japanese handling |
|---|---|---|
| **shadcn/ui** (official) | Browse/install components via natural language | None |
| **Chakra UI** (official) | Component docs + migration assistance | None |
| **Ant Design** (community) | Component docs as static JSON | None (despite Chinese/Asian market) |
| **MUI** (official) | Material UI component access | None |
| **Magic UI** | Animated React components | None |
| **Radix** (community) | Radix Themes/Primitives | None |

**The pattern**: Component MCPs serve Western component libraries. Not a single one handles CJK typography, Japanese form patterns, or locale-aware component generation. Even Ant Design (Chinese origin) has no Asian-specific MCP features.

---

## Category 4: Design Token & System MCPs

### Forgespace Branding MCP
- Generates complete design systems: colors, typography, spacing, shadows, logos.
- **Font pairings are Latin-only.** No CJK font stacks. No Japanese web font recommendations.

### Design Systems Knowledge MCP (Southleft)
- 188+ curated design system entries. Semantic search via pgvector.
- **100% Western systems.** No Japanese design system indexed.

### Font MCP
- Font recommendation from Reddit/design communities.
- **No CJK or Japanese font support whatsoever.**

---

## Category 5: Japan-Specific MCPs (Non-UX)

### japan-seasons-mcp (haomingkoo)
- **What it does**: Live Japanese seasonal travel data — cherry blossom forecasts, autumn leaves, festivals, fruit picking, weather.
- **12 tools**, 1,700+ GPS-tagged locations. Real-time data from Japan Meteorological Corporation.
- **Design relevance**: Has the seasonal DATA but zero design application. Knows when cherry blossoms bloom but doesn't know that 桜色 (#F4A7B9) is the appropriate spring design accent.

**Opportunity**: Our `get_seasonal_context` tool bridges this gap — we encode the design implications of Japanese seasons, not just the weather data.

### Japanese Postal Code Lookup MCP (zipcode-search)
- Single tool: postal code → address via Zipcloud API.
- **Solves one tiny piece** of what our `generate_jp_form` handles comprehensively.

---

## The complete gap map

| Capability | Who covers it | Coverage level |
|---|---|---|
| Generic UX heuristics | elsahafy/ux-mcp-server | Good (but shallow) |
| Figma integration | Figma official, Framelink | Excellent |
| Component libraries | shadcn, Chakra, MUI, Ant Design | Good |
| Translation management | Lokalise, Phrase, Smartling, etc. | Saturated |
| i18n file management | dalisys, i18next, IntlPull | Good |
| Design tokens (Western) | Forgespace, NEURIA | Good |
| Design intelligence | NEURIA | Novel but Western-only |
| **Japanese form patterns** | **Nobody** | **Empty** |
| **Keigo/politeness for UI** | **Nobody** | **Empty** |
| **Japanese seasonal design** | **japan-seasons-mcp (data only)** | **No design layer** |
| **Cultural UX audit** | **Nobody** | **Empty** |
| **CJK typography rules** | **Nobody** | **Empty** |
| **Japanese business conventions** | **Nobody** | **Empty** |
| **Full-width / half-width validation** | **Nobody** | **Empty** |
| **Japanese design system patterns** | **Nobody** | **Empty** |

---

## What we learn from competitors

### From elsahafy (what NOT to do):
- Don't build a monolith. Modular file structure from day one.
- Don't do regex-level analysis and call it an "audit." Our validation should be real.
- Don't return walls of text. Return structured data + actual code.
- DO write an excellent README. Theirs is the gold standard for MCP READMEs.
- DO support multiple MCP clients (Claude, Cursor, Continue, Zed).

### From NEURIA (what TO learn):
- Design intelligence MCPs have demand. People want AI to understand design, not just generate components.
- Curated reference data (their 300+ sites) makes the output specific and opinionated. We should curate Japanese patterns the same way.
- Emotion/context-based output is more useful than generic rules. Our context parameter (b2b_saas, consumer_app, etc.) follows this pattern.

### From Figma MCP (what to be aware of):
- Figma is the center of the design ecosystem. Our MCP doesn't compete with Figma — it complements it. Eventually, a designer could use Figma MCP + japan-ux-mcp together.
- Their tool descriptions are excellent and well-structured. Study their schema design.

### From japan-seasons-mcp (what to build on):
- Someone already did the hard work of Japanese seasonal data for tourism. We encode the design implications.
- Their data granularity (1,700+ GPS locations) shows the bar for Japan-specific data quality.

### From Lingo.dev (where we pick up):
- They stop at "configure your own linguistic rules." We start where they stop — pre-built, ready-to-use Japanese UX intelligence.

---

## Competitive positioning statement

> japan-ux-mcp is the only MCP server that encodes Japanese UX conventions into AI workflows. While localization MCPs handle translation and design MCPs handle components, nobody handles the cultural design layer — form patterns, politeness calibration, seasonal awareness, typography rules, and trust signal conventions that determine whether a Japanese interface actually works for Japanese users. We fill that gap with tools that generate correct Japanese UI on the first try.
