# japan-ux-mcp

Japanese UX conventions as an MCP server. Plugs into Claude Code, Cursor, or Claude Desktop so your AI stops generating Western-default forms and actually understands how Japanese websites work.

**6 tools** · **6 prompts** · **4 resources** · **No API keys**

---

## Why this exists

AI generates Western UX by default. If you're building for Japan, you already know the pain:

- `First Name / Last Name` instead of `姓 / 名` with furigana
- One phone input instead of the standard three-field split
- `MM/DD/YYYY` instead of `年月日` with era support
- Flat address fields instead of the `〒` postal code cascade
- Blunt error messages where keigo is expected
- "John Smith" as placeholder text

You can correct the AI every time, or you can install this once and stop thinking about it.

---

## Install

### Claude Code

```bash
claude mcp add japan-ux -- npx -y japan-ux-mcp
```

Restart Claude Code. Done.

### Manual config

Add to your MCP config file:

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

macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%\Claude\claude_desktop_config.json`

</details>

<details>
<summary><strong>Cursor</strong> <code>.cursor/mcp.json</code></summary>

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

### From source

```bash
git clone https://github.com/mrslbt/japan-ux-mcp.git
cd japan-ux-mcp
npm install && npm run build
```

Then in your MCP config:

```json
{
  "mcpServers": {
    "japan-ux": {
      "command": "node",
      "args": ["/path/to/japan-ux-mcp/dist/index.js"]
    }
  }
}
```

---

## Tools

Tools get called automatically based on context. You just describe what you need.

| Tool | Description |
|------|------------|
| `generate_jp_form` | Generates Japanese form markup with correct 姓/名 order, furigana, 〒 postal auto-fill, 3-field phone, 年月日 dates |
| `validate_jp_form` | Audits existing forms against JP conventions. Returns a 0-100 score, issues by severity, code fixes |
| `generate_jp_placeholder` | Realistic test data: names in kanji/katakana/romaji, real postal codes, formatted phone numbers, era dates |
| `suggest_keigo_level` | Takes English UI text, returns the correct Japanese at the right politeness level for your business context |
| `score_japan_readiness` | Scores a page across 5 categories: forms, copy, trust signals, typography, cultural awareness |
| `transform_for_japan` | Converts Western markup to Japan-ready. Shows before/after score and explains each change |

---

## Prompts

Workflow templates you can invoke directly in Claude Code.

| Prompt | Description |
|--------|------------|
| `japan_form` | Walks through building a Japanese form |
| `japan_audit` | Audit pasted markup for JP UX issues |
| `japan_transform` | Transform Western markup with before/after scoring |
| `japan_testdata` | Generate Japanese test data for prototypes |
| `japan_keigo` | Get the right politeness level for UI text |
| `japan_score` | Score a page description for Japan-readiness |

---

## Resources

Reference data your AI can pull up when needed.

| Resource | What's in it |
|----------|-------------|
| `keigo-guide` | 4 politeness levels × 8 business contexts, 30+ UI copy patterns |
| `form-checklist` | Every Japanese form convention to check before shipping |
| `phone-formats` | Mobile, landline, toll-free, IP phone patterns with field rules |
| `era-calendar` | 令和 through 明治, date ranges, conversion logic |

---

## Before / after

**Without japan-ux-mcp:**
```
You: "Build a registration form"
AI:  <input name="firstName" placeholder="First Name" />
     <input name="phone" />
     <button>Submit</button>
You: "No, Japanese style..." → 30 min of back and forth
```

**With japan-ux-mcp:**
```
You: "Build a registration form for a Japanese ecommerce site"
AI:  [calls generate_jp_form]
     姓/名 + furigana, 〒 postal, 3-field phone,
     年月日 dates, "ご購入手続きへ" button
```

---

## Example prompts

Copy-paste these into Claude Code or Cursor after installing:

**Build a form**
```
Build a registration form for a Japanese B2B SaaS product.
Include name, email, phone, company, and address. Use TSX with Tailwind.
```

**Audit an existing form**
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

**Transform Western to Japanese**
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

**Keigo for UI copy**
```
I need Japanese UI copy for a banking app:
- Error: "Invalid email address"
- Error: "Session expired"
- Button: "Submit application"
- Empty state: "No transactions yet"
- Confirmation: "Are you sure you want to delete?"
```

**Test data**
```
Generate 10 Japanese user profiles for a prototype.
Mixed gender, ages 25-45. Include full address and company.
```

**Score a page**
```
Score this checkout page for Japan-readiness:
Single name field, email, one phone field, US-style address,
"Buy Now" button, no company info in footer, no privacy policy.
```

**Design direction**
```
I'm designing a luxury ryokan booking site for Japanese domestic travelers.
What design direction should I take? Keigo level, colors, typography, trust signals.
```

---

## What's bundled

Everything runs locally. No external APIs, no keys, no network calls.

| Data | Details |
|------|---------|
| 47 prefectures | Code, name, kana, romaji, region |
| 100 names | 50 surnames + 50 given names (kanji/kana/romaji) |
| 12 addresses | Real postal codes across major Japanese cities |
| 6 phone formats | Mobile, landline, toll-free, IP, Navi Dial |
| 5 eras | 令和 through 明治 with start/end dates |
| 30 keigo patterns | UI strings at 4 politeness levels × 9 element types |
| 6 width rules | Full-width/half-width validation per field type |
| Conversion utils | ０１２→012, ＠→@, Gregorian→era dates |

---

## Conventions covered

| Convention | How it works in Japanese UX |
|-----------|---------------------------|
| Name order | Family name (姓) first, given name (名) second |
| Furigana | Katakana pronunciation fields (セイ/メイ) below name inputs |
| Phone | 3 separate fields, not one. Pattern: XXX-XXXX-XXXX |
| Address | 〒 postal code auto-fills prefecture + city. Order goes large to small |
| Dates | 年/月/日 fields with optional era display (令和6年 = 2024) |
| Keigo | 4 politeness levels mapped to 8 business contexts |
| Character width | Auto-convert full-width digits/symbols to half-width on input |
| Trust signals | 特定商取引法 page, company info, phone number in header |
| Field labels | 必須 (required, red badge) and 任意 (optional) |
| Confirmation | 確認画面 screen before final submission |

---

## Who uses this

- Developers outside Japan building Japanese-facing products
- Japanese companies whose AI tools keep defaulting to Western patterns
- Localization teams (translation is maybe 30% of the work, this covers the rest)
- Designers who build with AI and need it to know Japanese patterns out of the box

---

## Roadmap

- [x] 6 core tools (forms, validation, placeholders, keigo, scoring, transformation)
- [x] MCP prompts and resources
- [ ] Seasonal context, cultural audit, typography checker
- [ ] Reference site database by business vertical
- [ ] Design direction matrix, address formatter
- [ ] JIS X 8341 accessibility checks
- [ ] Community patterns, visual examples

---

## Docs

| File | Contents |
|------|---------|
| [TOOLS.md](TOOLS.md) | Full input/output specs with examples for every tool |
| [PROMPTS.md](PROMPTS.md) | 10 workflow templates + interview demo script |
| [DATA.md](DATA.md) | All bundled data: prefectures, names, phones, eras, keigo |
| [COMPETITORS.md](COMPETITORS.md) | Competitive landscape and positioning |
| [PRD.md](PRD.md) | Product requirements and design decisions |
| [ROADMAP.md](ROADMAP.md) | Phased build plan |

---

## License

[MIT](LICENSE)

---

Built by [Marsel Bait](https://github.com/mrslbt) · Tokyo
