# japan-ux-mcp

[![npm version](https://img.shields.io/npm/v/japan-ux-mcp.svg)](https://www.npmjs.com/package/japan-ux-mcp)
[![npm downloads](https://img.shields.io/npm/dm/japan-ux-mcp.svg)](https://www.npmjs.com/package/japan-ux-mcp)
[![MCP Badge](https://lobehub.com/badge/mcp-full/mrslbt-japan-ux-mcp?theme=light)](https://lobehub.com/mcp/mrslbt-japan-ux-mcp)
[![japan-ux-mcp MCP server](https://glama.ai/mcp/servers/mrslbt/japan-ux-mcp/badges/card.svg)](https://glama.ai/mcp/servers/mrslbt/japan-ux-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Model Context Protocol server for Japanese web UX conventions. Generates and audits forms, typography, layout, trust signals, legal requirements, keigo, and seasonal design.

Ten tools, ten prompts, nine resources. Runs locally, no API keys.

## Install

```bash
claude mcp add japan-ux -- npx -y japan-ux-mcp
```

### JSON config

The server config is the same across clients; only the file path differs.

<details>
<summary>Claude Code — <code>~/.claude/.mcp.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": { "command": "npx", "args": ["-y", "japan-ux-mcp"] }
  }
}
```

</details>

<details>
<summary>Cursor — <code>~/.cursor/mcp.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": { "command": "npx", "args": ["-y", "japan-ux-mcp"] }
  }
}
```

</details>

<details>
<summary>Windsurf — <code>~/.codeium/windsurf/mcp_config.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": { "command": "npx", "args": ["-y", "japan-ux-mcp"] }
  }
}
```

</details>

<details>
<summary>VS Code (GitHub Copilot) — <code>.vscode/mcp.json</code></summary>

```json
{
  "servers": {
    "japan-ux": { "type": "stdio", "command": "npx", "args": ["-y", "japan-ux-mcp"] }
  }
}
```

</details>

<details>
<summary>Cline (VS Code extension)</summary>

Open Cline's MCP settings panel and add:

```json
{
  "mcpServers": {
    "japan-ux": { "command": "npx", "args": ["-y", "japan-ux-mcp"] }
  }
}
```

</details>

<details>
<summary>Claude Desktop — <code>claude_desktop_config.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": { "command": "npx", "args": ["-y", "japan-ux-mcp"] }
  }
}
```

Config path:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

</details>

<details>
<summary>Zed — <code>~/.config/zed/settings.json</code></summary>

```json
{
  "context_servers": {
    "japan-ux": { "command": { "path": "npx", "args": ["-y", "japan-ux-mcp"] } }
  }
}
```

</details>

### From source

```bash
git clone https://github.com/mrslbt/japan-ux-mcp.git
cd japan-ux-mcp
npm install && npm run build
```

Point the client config at the built entry:

```json
{ "command": "node", "args": ["/absolute/path/to/japan-ux-mcp/dist/index.js"] }
```

## Tools

| Tool | Description |
|---|---|
| `generate_jp_form` | Outputs Japanese form markup: 姓/名 order, furigana, 〒 postal auto-fill, 3-field phone, 年月日 dates. |
| `validate_jp_form` | Scores a form against JP conventions (0-100) with issues, severity, and code fixes. |
| `generate_jp_placeholder` | Returns test data: names in kanji/katakana/romaji, real postal codes, formatted phone numbers, era dates. |
| `suggest_keigo_level` | Converts English UI text to Japanese at the appropriate politeness level for a given business context. |
| `score_japan_readiness` | Rates a page across five categories: forms, copy, trust signals, typography, cultural fit. |
| `transform_for_japan` | Rewrites Western markup into Japan-ready markup with a before/after score and per-change explanations. |
| `check_jp_typography` | Audits CSS for Japanese typography: font stacks, line-height, kinsoku shori, sizing, palt. |
| `get_seasonal_context` | Returns the current season, active events, 24 microseasons (二十四節気), and launch blackout windows. |
| `audit_japan_ux` | Seven-category audit (layout, typography, visual, navigation, trust, content, mobile) with a letter grade. |
| `design_direction_for_japan` | Produces a Japan-specific design brief from brand type, audience, and industry. |

## Prompts

| Prompt | Description |
|---|---|
| `japan_form` | Walks through building a Japanese form. |
| `japan_audit` | Audits pasted markup for JP UX issues. |
| `japan_transform` | Transforms Western markup with before/after scoring. |
| `japan_testdata` | Generates Japanese test data for prototypes. |
| `japan_keigo` | Returns UI text at the appropriate politeness level. |
| `japan_score` | Scores a page description for Japan-readiness. |
| `japan_typography` | Checks CSS for Japanese typography issues. |
| `japan_seasonal` | Returns seasonal design context for a specific month. |
| `japan_full_audit` | Runs a full seven-category Japanese UX audit. |
| `japan_design_direction` | Generates a Japan-specific visual direction. |

## Resources

| Resource | Content |
|---|---|
| `keigo-guide` | Four politeness levels across eight business contexts, 30+ UI copy patterns. |
| `form-checklist` | Japanese form conventions for pre-ship review. |
| `phone-formats` | Mobile, landline, toll-free, IP phone patterns with field-split rules. |
| `era-calendar` | 令和 through 明治 with date ranges and conversion formulas. |
| `typography-guide` | Font stacks, type scale, line-height, kinsoku shori, CSS suggestions. |
| `seasonal-calendar` | 24 events, 24 microseasons, seasonal palettes, launch blackout dates. |
| `trust-checklist` | Trust signals, legal pages, and social proof by site type. |
| `color-guide` | Japanese color meanings, the red-name taboo, visual design rules. |
| `layout-guide` | Grid, spacing, density, responsive breakpoints, structural patterns. |

## Example prompts

```
Build a registration form for a Japanese B2B SaaS product. Include name,
email, phone, company, and address. Use TSX with Tailwind.
```

```
Audit this form for Japanese conventions:
<form>
  <input name="firstName" placeholder="First Name" />
  <input name="lastName" placeholder="Last Name" />
  <input name="email" />
  <input name="phone" />
  <button>Submit</button>
</form>
```

```
Transform this form for the Japanese market (fintech context):
<form>
  <label>First Name <input name="firstName" /></label>
  <label>Last Name <input name="lastName" /></label>
  <label>Phone <input name="phone" /></label>
  <label>Address <input name="address" /></label>
  <button type="submit">Submit</button>
</form>
```

```
I need Japanese UI copy for a banking app:
- Error: "Invalid email address"
- Button: "Submit application"
- Empty state: "No transactions yet"
- Confirmation: "Are you sure you want to delete?"
```

```
Check this CSS for Japanese typography issues:
body { font-family: Arial; font-size: 14px; line-height: 1.4; font-style: italic; }
```

```
Run a Japanese UX audit on this B2B SaaS landing page. Hero with English
tagline, feature grid, pricing table, no phone number in header, no
company info page, single-column layout.
```

## Bundled data

All data ships with the package. No external APIs, no keys, no network calls.

| Data | Count | Details |
|---|---|---|
| Prefectures | 47 | Code, name, kana, romaji, region |
| Names | 100 | 50 surnames + 50 given names in kanji/kana/romaji |
| Addresses | 12 | Real postal codes across major cities |
| Phone formats | 6 | Mobile, landline, toll-free, IP, Navi Dial |
| Eras | 5 | 令和 through 明治 with start/end dates |
| Keigo patterns | 30 | UI strings at 4 politeness levels across 9 element types |
| Width rules | 6 | Full-width/half-width validation per field type |
| Layout rules | 28 | Grid, spacing, density, responsive, structural patterns |
| Typography rules | 24 | Font stacks, sizing, line-height, wrapping, rendering |
| Font stacks | 7 | System, web, serif, mixed modern/elegant/rounded/corporate |
| Visual rules | 21 | Color meanings, imagery, icons, shadows, corners |
| Navigation rules | 16 | Header, footer, menu, search, breadcrumb, pagination |
| Trust signals | 20 | Company info, social proof, certifications, contact |
| Legal requirements | 10 | 特定商取引法, APPI, 景品表示法, 薬機法, and more |
| Seasonal events | 25 | Full year with design impact and business notes |
| Microseasons | 24 | 二十四節気 with approximate dates |
| Color meanings | 9 | Japanese-specific color associations with hex values |
| Platform patterns | 30+ | LINE, QR codes, mobile payments, IME handling, social sharing |
| Accessibility rules | 20+ | JIS X 8341-3, aging population, screen readers, furigana |
| Content patterns | 15+ | Density, copy, product pages, localization rules |

## Conventions covered

### Forms and input

| Convention | Practice |
|---|---|
| Name order | Family name (姓) first, given name (名) second |
| Furigana | Katakana reading fields (セイ/メイ) below each name input |
| Phone | Three separate fields. Pattern: XXX-XXXX-XXXX |
| Address | 〒 postal code auto-fills prefecture + city. Large-to-small order |
| Dates | Separate 年/月/日 inputs with optional era display (令和6年 = 2024) |
| Character width | Auto-convert full-width digits and symbols to half-width on input |
| Confirmation | 確認画面 review screen before final submission |

### Typography

| Convention | Practice |
|---|---|
| No italics | Japanese has no italic form. Use bold, color, or size for emphasis |
| Line-height 1.8+ | Kanji density requires more vertical space than Latin text |
| 16px body minimum | Kanji readability breaks below 14px |
| Kinsoku shori | `word-break: keep-all` + `line-break: strict`. Never start a line with punctuation |
| Font stacks | Hiragino Sans, Yu Gothic, Meiryo cascade. Noto Sans JP for web fonts |
| Mixed EN/JP | English font first, Japanese fallback: `"Inter", "Noto Sans JP", sans-serif` |

### Layout and structure

| Convention | Practice |
|---|---|
| Information density | Dense layouts are trusted. Sparse reads as hiding information |
| 1280px PC / 375px mobile | Standard artboard sizes with 140-160px side margins |
| Section spacing | 100px between major sections (PC), 60px on mobile |
| Alternating zigzag | Image-left/text-right, then reverse. Standard on Japanese LPs |
| Breadcrumbs | Required on all interior pages |
| Repeat CTAs | Place conversion buttons at multiple scroll points |

### Trust and legal

| Convention | Practice |
|---|---|
| 特定商取引法 | Required legal disclosure for ecommerce. Seller info, returns, payment |
| 会社概要 | Company profile page with address, CEO name, capital, founding year |
| Phone in header | Visible phone number signals legitimacy. 0120 toll-free preferred |
| Privacy policy | 個人情報保護方針 required by APPI (amended April 2022) |
| Proof numbers | Specific metrics near hero: 1,247社導入, 業務効率30%改善 |
| Keigo | Four politeness levels mapped to eight business contexts |

### Visual and color

| Convention | Practice |
|---|---|
| Red = prosperity | Not danger. Used freely as a primary brand color |
| No red names | Red-on-white for names carries a death association. Use dark text |
| Black + white alone | Funeral association. Add an accent color |
| Bright palettes | Dense, colorful layouts are normal. Dark theme adoption lags the West |
| Manga/anime illustration | Used across industries, including banks and government |

### Seasonal

| Convention | Practice |
|---|---|
| 4 seasons, 24 microseasons | Each has distinct color palettes and design motifs |
| Golden Week (Apr 29 - May 5) | Launch blackout. Most businesses closed |
| Obon (Aug 13-16) | Launch blackout. Travel peak |
| Christmas is romantic | Couples celebrate. Families gather at New Year |
| お中元 / お歳暮 | Mid-year and year-end gift seasons. Major ecommerce windows |

## Client support

| Client | Support |
|---|---|
| Claude Code | Tools, prompts, resources |
| Cursor | Tools, prompts, resources |
| Windsurf | Tools, prompts, resources |
| VS Code (GitHub Copilot) | Tools, prompts, resources |
| Cline | Tools, prompts, resources |
| Claude Desktop | Tools, prompts, resources |
| Zed | Tools and resources |
| Any stdio MCP client | Tools, prompts, resources |

## 日本語

日本のWeb UX慣習のためのMCPサーバーです。姓名順、フリガナ、3分割電話番号、〒住所フロー、敬語レベル、タイポグラフィ、信頼シグナル、特定商取引法などの法要件、季節デザインをツール・プロンプト・リソースとして提供します。

Claude Code、Cursor、Windsurf など MCP 対応クライアントで動作します。ローカル動作、APIキー不要。

## Need a custom MCP?

I build production MCP servers and AI-native tooling for teams. If you'd like one tailored to your stack, reach out: [marselbait.me](https://marselbait.me) · marselbait@gmail.com.

## Disclaimer

This server returns guidance, style rules, and cultural context for building Japanese-facing products. It does not call any brand's API or act on a brand's behalf. Company and service names that appear in examples or recommendations (banks, mobile carriers, payment services, delivery companies, etc.) are referenced as cultural context for users in Japan, not as endorsements or affiliations. All trademarks belong to their respective owners.

## License

[MIT](LICENSE)

---

## More MCPs

| MCP | What it does |
|-----|-------------|
| [rippr](https://github.com/mrslbt/rippr) | YouTube transcript ripper for humans and AI agents |
| [Rakuten](https://github.com/mrslbt/rakuten-mcp) | Search Rakuten's marketplace, books, and hotels |
| [Xendit](https://github.com/mrslbt/xendit-mcp) | Xendit payment APIs: invoices, disbursements, balances |

---

Built by [Marsel Bait](https://github.com/mrslbt) in Tokyo
