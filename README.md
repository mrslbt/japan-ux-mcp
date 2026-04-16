# japan-ux-mcp

An MCP server with Japanese UX patterns for designers and developers building websites and interfaces for Japan.

It helps your assistant produce Japan-ready forms, copy, typography, trust signals, and seasonal context: `姓 / 名` order, furigana, 3-field phone numbers, 〒 postal flow, keigo-aware labels, and Japanese typography rules.

`10 tools` · `10 prompts` · `9 resources` · `15 data files` · `no API keys`

---

## Why this exists

AI generates Western UX by default. If you're building for Japan, you know what happens:

- `First Name / Last Name` instead of `姓 / 名` with furigana
- One phone input instead of the standard three-field split
- `MM/DD/YYYY` instead of `年月日` with era support
- Flat address fields instead of the `〒` postal code cascade
- Blunt error messages where keigo is expected
- Arial at 1.5 line-height instead of Noto Sans JP at 1.8+
- No 特定商取引法 page, no phone number in the header, no 会社概要
- Zero seasonal awareness (launching during Golden Week, Christmas treated as family holiday)

You can correct it every single time, or install this once.

---

## Install

### One-line install

<details open>
<summary><strong>Claude Code</strong></summary>

```bash
claude mcp add japan-ux -- npx -y japan-ux-mcp
```

Restart Claude Code after running this.

</details>

### JSON config

Pick your client. The server config is the same everywhere.

<details>
<summary><strong>Claude Code</strong> <code>~/.claude/.mcp.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": {
      "command": "npx",
      "args": ["-y", "japan-ux-mcp"]
    }
  }
}
```

</details>

<details>
<summary><strong>Cursor</strong> <code>~/.cursor/mcp.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": {
      "command": "npx",
      "args": ["-y", "japan-ux-mcp"]
    }
  }
}
```

</details>

<details>
<summary><strong>Windsurf</strong> <code>~/.codeium/windsurf/mcp_config.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": {
      "command": "npx",
      "args": ["-y", "japan-ux-mcp"]
    }
  }
}
```

</details>

<details>
<summary><strong>VS Code (GitHub Copilot)</strong> <code>.vscode/mcp.json</code></summary>

```json
{
  "servers": {
    "japan-ux": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "japan-ux-mcp"]
    }
  }
}
```

You can also add it to your User Settings (`settings.json`) under `mcp.servers` to make it available across all projects.

</details>

<details>
<summary><strong>Cline (VS Code extension)</strong></summary>

Open Cline's MCP settings panel and add:

```json
{
  "mcpServers": {
    "japan-ux": {
      "command": "npx",
      "args": ["-y", "japan-ux-mcp"]
    }
  }
}
```

</details>

<details>
<summary><strong>Claude Desktop</strong> <code>claude_desktop_config.json</code></summary>

```json
{
  "mcpServers": {
    "japan-ux": {
      "command": "npx",
      "args": ["-y", "japan-ux-mcp"]
    }
  }
}
```

Config file location:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

</details>

<details>
<summary><strong>Zed</strong> <code>~/.config/zed/settings.json</code></summary>

```json
{
  "context_servers": {
    "japan-ux": {
      "command": {
        "path": "npx",
        "args": ["-y", "japan-ux-mcp"]
      }
    }
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

Then point your client config to the built file:

```json
{
  "command": "node",
  "args": ["/absolute/path/to/japan-ux-mcp/dist/index.js"]
}
```

---

## Tools

These are available as MCP tools. You can call them directly, or let the client use them when the prompt clearly points to a Japanese UX task.

| Tool | What it does |
|------|-------------|
| `generate_jp_form` | Outputs Japanese form markup: 姓/名 name order, furigana, 〒 postal auto-fill, 3-field phone, 年月日 dates |
| `validate_jp_form` | Checks existing forms against JP conventions. Returns a 0-100 score with issues, severity, and code fixes |
| `generate_jp_placeholder` | Creates test data: names in kanji/katakana/romaji, real postal codes, formatted phone numbers, era dates |
| `suggest_keigo_level` | Takes English UI text, returns Japanese at the right politeness level for the business context |
| `score_japan_readiness` | Rates a page across 5 categories: forms, copy, trust signals, typography, cultural fit |
| `transform_for_japan` | Rewrites Western markup as Japan-ready. Shows before/after score, explains each change |
| `check_jp_typography` | Audits CSS for Japanese typography: font stacks, line-height, kinsoku shori, font sizing, palt |
| `get_seasonal_context` | Returns current season, active events, 24 microseasons (二十四節気), launch blackout warnings |
| `audit_japan_ux` | Full 7-category audit: layout, typography, visual, navigation, trust, content, mobile. Letter grade A-F |
| `design_direction_for_japan` | Turns brand type, audience, and industry into a Japan-specific design brief: density, palette, typography, imagery, CTAs, trust layout |

---

## Prompts

Prompt templates you can call from any MCP client that supports them.

| Prompt | What it does |
|--------|-------------|
| `japan_form` | Walks through building a Japanese form |
| `japan_audit` | Audit pasted markup for JP UX issues |
| `japan_transform` | Transform Western markup with before/after scoring |
| `japan_testdata` | Generate Japanese test data for prototypes |
| `japan_keigo` | Get the right politeness level for UI text |
| `japan_score` | Score a page description for Japan-readiness |
| `japan_typography` | Check CSS for Japanese typography issues |
| `japan_seasonal` | Get seasonal design context for a specific month |
| `japan_full_audit` | Run a full 7-category Japanese UX audit |
| `japan_design_direction` | Generate a Japan-specific visual direction for a site or interface |

---

## Resources

Reference data your AI can access during a session.

| Resource | Content |
|----------|---------|
| `keigo-guide` | 4 politeness levels across 8 business contexts, 30+ UI copy patterns |
| `form-checklist` | Japanese form conventions checklist for pre-ship review |
| `phone-formats` | Mobile, landline, toll-free, IP phone patterns with field-splitting rules |
| `era-calendar` | 令和 through 明治 with date ranges and conversion formulas |
| `typography-guide` | Font stacks, type scale, line-height rules, kinsoku shori, CSS suggestions |
| `seasonal-calendar` | 24 events, 24 microseasons, seasonal color palettes, launch blackout dates |
| `trust-checklist` | Trust signals, legal pages, social proof requirements by site type |
| `color-guide` | Japanese color meanings, the red-name taboo, visual design rules |
| `layout-guide` | Grid, spacing, density conventions, responsive breakpoints, structural patterns |

---

## Before / after

Without this MCP:
```
You: "Build a registration form"
AI:  <input name="firstName" placeholder="First Name" />
     <input name="phone" />
     <button>Submit</button>
You: "No, Japanese style..." → 30 min of back and forth
```

With this MCP:
```
You: "Build a registration form for a Japanese ecommerce site"
AI:  [calls generate_jp_form]
     姓/名 + furigana, 〒 postal, 3-field phone,
     年月日 dates, "ご購入手続きへ" button
```

---

## Example prompts

These work in any MCP client. Copy-paste and go.

### Build a form
```
Build a registration form for a Japanese B2B SaaS product.
Include name, email, phone, company, and address. Use TSX with Tailwind.
```

### Audit an existing form
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

### Transform Western to Japanese
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

### Keigo for UI copy
```
I need Japanese UI copy for a banking app:
- Error: "Invalid email address"
- Error: "Session expired"
- Button: "Submit application"
- Empty state: "No transactions yet"
- Confirmation: "Are you sure you want to delete?"
```

### Check typography
```
Check this CSS for Japanese typography issues:

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  font-style: italic;
}
```

### Get seasonal context
```
I'm designing a campaign landing page. What's the current Japanese seasonal context?
What colors, motifs, and events should I consider? Any launch blackout dates coming up?
```

### Run a full UX audit
```
Run a Japanese UX audit on this B2B SaaS landing page.
It has: hero with English tagline, feature grid, pricing table,
no phone number in header, no company info page, single-column layout.
```

### Generate test data
```
Generate 10 Japanese user profiles for a prototype.
Mixed gender, ages 25-45. Include full address and company.
```

### Get design direction
```
I'm designing a luxury ryokan booking site for Japanese domestic travelers.
What design direction should I take? Keigo level, colors, typography, trust signals.
```

---

## What's bundled

Everything runs locally. No external APIs, no keys, no network calls.

| Data | Count | Details |
|------|-------|---------|
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

---

## Conventions covered

### Forms and input
| Convention | What it means in practice |
|-----------|--------------------------|
| Name order | Family name (姓) first, given name (名) second |
| Furigana | Katakana reading fields (セイ/メイ) below each name input |
| Phone | 3 separate fields. Pattern: XXX-XXXX-XXXX |
| Address | 〒 postal code auto-fills prefecture + city. Large to small order |
| Dates | Separate 年/月/日 inputs with optional era display (令和6年 = 2024) |
| Character width | Auto-convert full-width digits and symbols to half-width on input |
| Confirmation | 確認画面 review screen before final submission |

### Typography
| Convention | What it means in practice |
|-----------|--------------------------|
| No italics | Japanese has no italic form. Use bold, color, or size for emphasis |
| Line-height 1.8+ | Kanji density requires more vertical space than Latin text |
| 16px body minimum | Kanji readability breaks below 14px |
| Kinsoku shori | word-break: keep-all + line-break: strict. Never start a line with punctuation |
| Font stacks | Hiragino Sans, Yu Gothic, Meiryo cascade. Noto Sans JP for web fonts |
| Mixed EN/JP | English font first, Japanese fallback: "Inter", "Noto Sans JP", sans-serif |

### Layout and structure
| Convention | What it means in practice |
|-----------|--------------------------|
| Information density | Dense layouts are trusted. Sparse feels like hiding information |
| 1280px PC / 375px mobile | Standard Japanese artboard sizes with 140-160px side margins |
| Section spacing | 100px between major sections (PC), 60px on mobile |
| Alternating zigzag | Image-left/text-right, then reverse. Standard on Japanese LPs |
| Breadcrumbs | Required on all interior pages |
| Repeat CTAs | Place conversion buttons at multiple scroll points |

### Trust and legal
| Convention | What it means in practice |
|-----------|--------------------------|
| 特定商取引法 | Required legal disclosure for all ecommerce. Seller info, returns, payment |
| 会社概要 | Company profile page with address, CEO name, capital, founding year |
| Phone in header | Visible phone number signals legitimacy. 0120 toll-free preferred |
| Privacy policy | 個人情報保護方針 required by APPI (amended April 2022) |
| Proof numbers | Specific metrics near hero: 1,247社導入, 業務効率30%改善 |
| Keigo | 4 politeness levels mapped to 8 business contexts |

### Visual and color
| Convention | What it means in practice |
|-----------|--------------------------|
| Red = prosperity | Not danger. Used freely as primary brand color |
| No red names | Writing names in red = death association. Always use dark text |
| Black + white = funeral | Add an accent color to break the association |
| Bright palettes | Dense, colorful layouts are normal. Dark theme lags behind the West |
| Manga/anime illustration | Used across all industries, including banks and government |

### Seasonal
| Convention | What it means in practice |
|-----------|--------------------------|
| 4 seasons, 24 microseasons | Each has distinct color palettes and design motifs |
| Golden Week (Apr 29-May 5) | Do not launch products. Most businesses closed |
| Obon (Aug 13-16) | Businesses closed, travel peak. Avoid launches |
| Christmas is romantic | Couples celebrate, not families. Families gather at New Year |
| お中元 / お歳暮 | Mid-year and year-end gift seasons. Major ecommerce events |

---

## Who uses this

Developers outside Japan who are building Japanese-facing products and are tired of manually correcting every form, label, and error message.

Japanese companies whose AI tools keep defaulting to Western patterns even though the product is entirely in Japanese.

Localization teams. Translation gets you maybe 30% of the way. The other 70% is structural: field order, phone splitting, postal cascades, keigo levels, trust signals, legal pages, seasonal awareness. That's what this covers.

Designers who build with AI and want Japanese patterns available from the start without explaining them every session.

---

## Works with

| Client | Support |
|--------|---------|
| Claude Code | Full (tools, prompts, resources) |
| Cursor | Full |
| Windsurf | Full |
| VS Code (GitHub Copilot) | Full |
| Cline | Full |
| Claude Desktop | Full |
| Zed | Tools and resources |
| Any stdio MCP client | Full |

---

## License

[MIT](LICENSE)

---

Built by [Marsel Bait](https://github.com/mrslbt) in Tokyo
