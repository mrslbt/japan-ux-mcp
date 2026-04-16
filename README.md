# japan-ux-mcp

Japanese UX conventions as an MCP server. Works with Claude Code, Cursor, Windsurf, VS Code (Copilot), Claude Desktop, Cline, Zed, and any other MCP-compatible client.

Your AI stops generating Western-default forms and starts producing correct Japanese UI: proper name order, furigana, 3-field phone numbers, postal code auto-fill, keigo at the right politeness level.

`6 tools` · `6 prompts` · `4 resources` · `no API keys`

---

## Why this exists

AI generates Western UX by default. If you're building for Japan, you know what happens:

- `First Name / Last Name` instead of `姓 / 名` with furigana
- One phone input instead of the standard three-field split
- `MM/DD/YYYY` instead of `年月日` with era support
- Flat address fields instead of the `〒` postal code cascade
- Blunt error messages where keigo is expected
- "John Smith" as placeholder text

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

These get called automatically when the AI recognizes a Japanese UX context. You don't need to reference them by name.

| Tool | What it does |
|------|-------------|
| `generate_jp_form` | Outputs Japanese form markup: 姓/名 name order, furigana, 〒 postal auto-fill, 3-field phone, 年月日 dates |
| `validate_jp_form` | Checks existing forms against JP conventions. Returns a 0-100 score with issues, severity, and code fixes |
| `generate_jp_placeholder` | Creates test data: names in kanji/katakana/romaji, real postal codes, formatted phone numbers, era dates |
| `suggest_keigo_level` | Takes English UI text, returns Japanese at the right politeness level for the business context |
| `score_japan_readiness` | Rates a page across 5 categories: forms, copy, trust signals, typography, cultural fit |
| `transform_for_japan` | Rewrites Western markup as Japan-ready. Shows before/after score, explains each change |

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

---

## Resources

Reference data your AI can access during a session.

| Resource | Content |
|----------|---------|
| `keigo-guide` | 4 politeness levels across 8 business contexts, 30+ UI copy patterns |
| `form-checklist` | Japanese form conventions checklist for pre-ship review |
| `phone-formats` | Mobile, landline, toll-free, IP phone patterns with field-splitting rules |
| `era-calendar` | 令和 through 明治 with date ranges and conversion formulas |

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

### Generate test data
```
Generate 10 Japanese user profiles for a prototype.
Mixed gender, ages 25-45. Include full address and company.
```

### Score a page
```
Score this checkout page for Japan-readiness:
Single name field, email, one phone field, US-style address,
"Buy Now" button, no company info in footer, no privacy policy.
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
| Conversion utils | 4 | ０１２→012, ＠→@, Gregorian→era, era→Gregorian |

---

## Japanese conventions covered

| Convention | What it means in practice |
|-----------|--------------------------|
| Name order | Family name (姓) first, given name (名) second |
| Furigana | Katakana reading fields (セイ/メイ) below each name input |
| Phone | 3 separate fields. Pattern: XXX-XXXX-XXXX |
| Address | 〒 postal code auto-fills prefecture + city. Large to small order |
| Dates | Separate 年/月/日 inputs with optional era display (令和6年 = 2024) |
| Keigo | 4 politeness levels mapped to 8 business contexts |
| Character width | Auto-convert full-width digits and symbols to half-width on input |
| Trust signals | 特定商取引法 disclosure page, company info, phone number in header |
| Field labels | 必須 (required, red badge) and 任意 (optional) |
| Confirmation | 確認画面 review screen before final submission |

---

## Who uses this

Developers outside Japan who are building Japanese-facing products and are tired of manually correcting every form, label, and error message.

Japanese companies whose AI tools keep defaulting to Western patterns even though the product is entirely in Japanese.

Localization teams. Translation gets you maybe 30% of the way. The other 70% is structural: field order, phone splitting, postal cascades, keigo levels. That's what this covers.

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

## Roadmap

- [x] 6 core tools: forms, validation, placeholders, keigo, scoring, transformation
- [x] MCP prompts and resources
- [ ] Seasonal context and cultural audit
- [ ] Typography checker for JP/EN mixed text
- [ ] Reference site database by business vertical
- [ ] Design direction matrix
- [ ] Address formatter with postal code API
- [ ] JIS X 8341 accessibility checks
- [ ] Community-contributed patterns

---

## Docs

| File | What's in it |
|------|-------------|
| [TOOLS.md](TOOLS.md) | Input/output specs with examples for every tool |
| [PROMPTS.md](PROMPTS.md) | 10 workflow templates and an interview demo script |
| [DATA.md](DATA.md) | All bundled data: prefectures, names, phones, eras, keigo |
| [COMPETITORS.md](COMPETITORS.md) | Competitive landscape and how this fits in |
| [PRD.md](PRD.md) | Product requirements and design decisions |
| [ROADMAP.md](ROADMAP.md) | Phased build plan |

---

## License

[MIT](LICENSE)

---

Built by [Marsel Bait](https://github.com/mrslbt) in Tokyo
