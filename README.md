# japan-ux-mcp

**Japanese UX patterns for AI.** An MCP server that gives Claude, Cursor, and other AI tools deep knowledge of Japanese design conventions — so they generate culturally correct Japanese UI instead of Western defaults.

**6 tools** | **6 prompts** | **4 resources** | **Zero API keys needed**

---

## The problem

AI tools generate Western UX patterns by default. When building for Japan, you spend more time correcting the AI than designing:

- Forms with `First Name / Last Name` instead of `姓 / 名` + furigana
- Single phone field instead of three separate fields (XXX-XXXX-XXXX)
- `MM/DD/YYYY` instead of `年月日` with Japanese era support
- Western address format instead of `〒` postal code auto-fill flow
- Casual error messages where proper keigo is expected
- "John Smith" placeholder text instead of realistic Japanese data

**japan-ux-mcp fixes this.** Install once, and your AI already knows Japanese conventions.

---

## Install

### Claude Code (recommended)

Run this in your terminal:

```bash
claude mcp add japan-ux -- npx -y japan-ux-mcp
```

That's it. Restart Claude Code and the tools are available in every session.

### Manual config (Claude Code / Cursor / Claude Desktop)

Add to your MCP config file:

<details>
<summary><strong>Claude Code</strong> — <code>~/.claude/.mcp.json</code></summary>

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
<summary><strong>Claude Desktop</strong> — <code>claude_desktop_config.json</code></summary>

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

Config location:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

</details>

<details>
<summary><strong>Cursor</strong> — <code>.cursor/mcp.json</code></summary>

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
git clone https://github.com/marselbait/japan-ux-mcp.git
cd japan-ux-mcp
npm install
npm run build
```

Then point your MCP config to the built file:

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

Once installed, these tools are called **automatically** by your AI based on context. No slash commands needed for tools — just describe what you want.

| Tool | What it does |
|------|-------------|
| `generate_jp_form` | Generates complete Japanese form markup — correct 姓/名 order, furigana, 〒 postal auto-fill, 3-field phone, 年月日 dates, context-appropriate keigo |
| `validate_jp_form` | Audits existing forms against Japanese conventions — returns score (0-100), issues with severity, and code fixes |
| `generate_jp_placeholder` | Realistic Japanese test data — names (kanji + katakana + romaji), addresses with real postal codes, phone numbers, dates in both Gregorian and Japanese era format |
| `suggest_keigo_level` | Maps English UI text to the correct Japanese politeness level based on business context. Covers buttons, errors, confirmations, empty states, and more |
| `score_japan_readiness` | Scores any page 0-100 across 5 categories: forms, copy, trust signals, typography, and cultural awareness |
| `transform_for_japan` | Takes Western markup, returns Japan-ready version with before/after score and a changelog explaining every change |

---

## Prompts

Prompts are workflow templates you can invoke directly. In Claude Code, access them through the prompt selector or by asking Claude to use them.

| Prompt | What it does |
|--------|-------------|
| `japan_form` | Walk through building a Japanese form step-by-step |
| `japan_audit` | Audit pasted markup for Japanese UX issues |
| `japan_transform` | Transform Western markup to Japan-ready with scoring |
| `japan_testdata` | Generate realistic Japanese test data |
| `japan_keigo` | Get the right politeness level for any UI text |
| `japan_score` | Score a page description for Japan-readiness |

---

## Resources

Reference data accessible to your AI at any time.

| Resource | Content |
|----------|---------|
| `keigo-guide` | Complete keigo reference — 4 politeness levels, 8 business contexts, 30+ UI copy patterns |
| `form-checklist` | Japanese form UX checklist — every convention to verify before shipping |
| `phone-formats` | Japanese phone number formats with field splitting rules |
| `era-calendar` | Japanese era calendar (令和/平成/昭和/大正/明治) with conversion rules |

---

## Quick demo

### Without japan-ux-mcp
```
You: "Build a registration form"
AI:  <input name="firstName" placeholder="First Name" />   // wrong
     <input name="phone" />                                  // wrong
     <button>Submit</button>                                 // wrong
You: "No, Japanese style..." [30 minutes of corrections]
```

### With japan-ux-mcp
```
You: "Build a registration form for a Japanese ecommerce site"
AI:  Calls generate_jp_form → correct 姓/名 + furigana, 〒 postal,
     3-field phone, 年月日 dates, "ご購入手続きへ" button
Done. Zero corrections.
```

---

## Example prompts to try

Once installed, try these in Claude Code or Cursor:

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
Transform this form for the Japanese market. It's for a fintech app:
<form>
  <label>First Name <input name="firstName" /></label>
  <label>Last Name <input name="lastName" /></label>
  <label>Phone <input name="phone" /></label>
  <label>Address <input name="address" /></label>
  <button type="submit">Submit</button>
</form>
```

### Get correct keigo for UI copy
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
Generate 10 realistic Japanese user profiles for a prototype.
Mixed gender, ages 25-45. Include full address and company.
```

### Score a page
```
Score this checkout page for Japan-readiness:
Single name field, email, one phone field, US-style address,
a "Buy Now" button, no company info in footer, no privacy policy link.
```

### Design direction
```
I'm designing a luxury ryokan booking site for domestic Japanese travelers.
What's the right design direction — keigo level, colors, typography, trust signals?
```

---

## What's inside

### Bundled data (no API keys needed)

- **47 prefectures** — code, name, kana, romaji, region
- **100 names** — 50 surnames + 50 given names, each with kanji/kana/romaji
- **12 sample addresses** — real postal codes across major cities
- **6 phone formats** — mobile, landline, toll-free, IP phone patterns
- **5 Japanese eras** — 令和 through 明治 with date ranges
- **30 keigo patterns** — UI strings at 4 politeness levels across 9 element types
- **6 width rules** — full-width/half-width validation for common field types
- **Conversion utilities** — full-width → half-width, Gregorian → era dates

### Japanese conventions handled

| Convention | What it means |
|-----------|--------------|
| **Name order** | Family name (姓) before given name (名) |
| **Furigana** | Katakana pronunciation fields (セイ/メイ) below name fields |
| **Phone format** | 3 separate fields: area-exchange-subscriber |
| **Postal address** | 〒 postal code auto-fills prefecture + city, large-to-small order |
| **Date format** | 年/月/日 with Japanese era support (令和6年 = 2024) |
| **Keigo** | 4 politeness levels mapped to 8 business contexts |
| **Full-width/half-width** | Auto-convert ０１２ → 012, ＠ → @ on input |
| **Trust signals** | 特定商取引法 disclosure, company info, phone in header |
| **Required/optional** | 必須 (red badge) / 任意 labels |
| **Confirmation screen** | 確認画面 before final submission |

---

## Who is this for

- **Foreign developers building for Japan** — stop guessing Japanese conventions
- **Japanese companies using AI tools** — your AI finally understands local UX
- **Localization teams** — translation is 30% of localization, this handles the other 70%
- **Designers who vibe-code** — build Japanese sites faster with AI that already knows the patterns

---

## Roadmap

- [x] **Phase 1** — 6 core tools (forms, validation, placeholders, keigo, scoring, transformation)
- [x] **Phase 1** — MCP prompts and resources
- [ ] **Phase 2** — Seasonal context, cultural audit, typography checker, reference site database
- [ ] **Phase 3** — Design direction matrix, address formatter, accessibility (JIS X 8341)
- [ ] **Phase 4** — Visual examples, community patterns, Figma integration

---

## Documentation

- [Tool Specifications](TOOLS.md) — Full input/output specs with examples for every tool
- [Prompt Templates](PROMPTS.md) — 10 workflow templates + interview demo script
- [Data Reference](DATA.md) — All bundled data: prefectures, names, phone formats, eras, keigo patterns
- [Competitive Analysis](COMPETITORS.md) — How japan-ux-mcp compares to existing tools
- [Product Requirements](PRD.md) — Design decisions and target audience
- [Build Roadmap](ROADMAP.md) — Phased development plan

---

## License

[MIT](LICENSE)

---

Built by [Marsel Bait](https://github.com/marselbait) in Tokyo
