# PRD — japan-ux-mcp

> Internal strategy doc. Not public.

---

## One-liner

An MCP server that encodes Japanese UX conventions into AI workflows — so AI generates culturally correct Japanese UI instead of Western defaults.

---

## Problem statement

AI coding assistants (Claude, Cursor, Copilot) default to Western UX patterns. When building for the Japanese market, developers and designers waste significant time correcting AI output:

- Japanese forms have unique conventions (furigana, 3-field phone, postal-first address, era dates)
- UI copy requires correct politeness levels (keigo) based on context
- Cultural nuances in color, iconography, and seasonal awareness are invisible to AI
- Placeholder/test data is always Western (John Doe, 123 Main St)
- Typography rules differ for mixed Japanese/English text

No existing MCP server addresses this. The gap is total.

---

## Target audience

### Primary: Foreign designers/developers building for Japan
- **Size**: Large and growing. More companies entering JP market, more freelancers serving JP clients.
- **Pain**: "I don't know what I don't know about Japanese UX." AI makes it worse by confidently generating wrong patterns.
- **Value**: Eliminates the correction loop. One-shot generation of culturally correct UI.
- **Where they are**: Cursor, Claude Code, VS Code, searching npm/GitHub for "japanese ux"

### Secondary: Japanese companies adopting AI development tools
- **Size**: Growing rapidly. Companies like SmartHR, freee, LayerX, and startups.
- **Pain**: "AI keeps generating Western defaults and we keep correcting." Even Japanese devs forget conventions sometimes.
- **Value**: Institutional knowledge layer. AI always remembers the rules.
- **Where they are**: Japanese tech blogs, Twitter/X JP tech community, Qiita, Zenn

### Tertiary: Localization / i18n teams
- **Size**: Every global company expanding to Japan (Stripe, Shopify, Notion, etc.)
- **Pain**: "We translated everything but Japanese users say it feels foreign."
- **Value**: Handles the 70% of localization that isn't translation — form patterns, data formats, interaction conventions.
- **Where they are**: i18n conferences, l10n Slack communities, searching for "japanese localization"

### Personal: Marsel (creator)
- Product designer in Japan who vibe-codes
- Uses this daily when building Japanese sites with AI assistance
- Portfolio piece demonstrating design expertise + technical ability + cultural fluency
- Interview asset for Woven by Toyota and similar roles

---

## Competitive landscape

> Full analysis in [COMPETITORS.md](COMPETITORS.md)

| Existing tool | What it does | Gap japan-ux fills |
|---|---|---|
| Figma MCP (official) | 16-tool design-to-code powerhouse | No cultural/Japanese awareness. Defaults to React+Tailwind Western patterns |
| Framelink (14.4k stars) | Simplifies Figma data for AI code gen | Most popular design MCP. Zero i18n |
| UX MCP Server (elsahafy) | 23 tools + 28 knowledge bases | Shallow regex analysis. Has `ux://i18n/patterns` but it's generic — no JP content |
| NEURIA Design Intelligence | Emotion-based design tokens from 300+ award sites | Built by Japanese developer but 100% Western-focused. Our strongest validation |
| Lingo.dev MCP | Per-locale brand voice, glossary, linguistic rules | Closest to our territory — but a blank form. Users must know the rules to encode them |
| Component MCPs (shadcn, Chakra, MUI, Ant) | Component browsing/installation | None handle CJK typography or locale-aware generation |
| Translation MCPs (Lokalise, Phrase, Smartling) | String/translation management | Handle 30% of localization (text). We handle the other 70% (design) |
| japan-seasons-mcp | 1,700+ GPS locations, seasonal travel data | Has seasonal DATA but zero design application |
| Japanese Postal Code MCP | Single-purpose postal → address lookup | One tiny piece of what our `generate_jp_form` does comprehensively |

**No MCP server encodes Japanese UX conventions. Zero direct competition. NEURIA proves demand for design intelligence MCPs exists — the Japanese lane is completely empty.**

---

## Differentiation principles

> Informed by competitor weaknesses. See [COMPETITORS.md](COMPETITORS.md) for details.

1. **Generate, don't advise** — elsahafy returns paragraphs of text. We return actual code + structured data. Power tool, not textbook.
2. **Real data, not toy data** — Ship with actual prefectures, real name databases, proper postal code mapping. japan-seasons-mcp's 1,700+ locations shows the quality bar for Japan data.
3. **Context-aware** — Different output for B2B SaaS vs consumer app vs government. Learned from NEURIA's emotion-based approach — context makes output specific, not generic.
4. **Opinionated** — Have a point of view on what's correct, don't hedge. Competitors are neutral to the point of uselessness.
5. **Bilingual** — EN + JP documentation and output. No competitor does this.
6. **Seasonal** — Signature feature. japan-seasons-mcp has the weather data; we encode the design implications.
7. **Modular architecture** — elsahafy's 4,131-line monolith is unmaintainable. We use clean modules from day one.
8. **Pre-built, not configure-yourself** — Lingo.dev says "write your own rules." We ship the rules already encoded.

---

## Success metrics

| Metric | Target (6 months) |
|---|---|
| GitHub stars | 500+ |
| npm weekly downloads | 200+ |
| MCP registry listing | Listed on mcp.so, awesome-mcp-servers |
| Blog/social mentions | Featured in 3+ JP tech blogs (Qiita, Zenn) |
| Personal portfolio impact | Conversation starter in every interview |

---

## Risks

| Risk | Mitigation |
|---|---|
| Japanese conventions are nuanced — might get something wrong | Open source, invite JP developer community to contribute/correct |
| MCP ecosystem is young, adoption unclear | Low cost to build, high portfolio value regardless of adoption |
| Maintaining Japanese data (postal codes change, new eras) | Use APIs where possible, document data freshness |
| Scope creep — trying to cover all of Japanese design | Strict phased roadmap, MVP-first approach |
