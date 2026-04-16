# Prompt Templates — japan-ux-mcp

> How to use each tool effectively. These double as demo scripts for interviews and portfolio presentations.

---

## Workflow 1: Building a Japanese registration form

**Scenario**: You need a registration form for a Japanese SaaS product.

**Prompt**:
```
Build a registration form for a Japanese B2B SaaS product.
Include: name, email, phone, company name, and company address.
Use TSX with Tailwind. Make it production-ready.
```

**What happens**: AI calls `generate_jp_form` with context `b2b_saas` and returns complete TSX with:
- 姓/名 fields with furigana (セイ/メイ)
- Company name (会社名) with furigana (カイシャメイ)
- 〒 postal code with auto-fill setup
- 3-field phone number
- Proper button text: "登録する" or "お申し込み" depending on context
- Form validation patterns for each field

**Follow-up prompts**:
```
Add validation error messages in appropriate Japanese (polite but clear).
```
```
Generate 5 test user profiles to populate this form.
```

---

## Workflow 2: Auditing an existing form

**Scenario**: You have a form built by a non-Japanese developer and need to check it.

**Prompt**:
```
Audit this form for Japanese UX conventions. Here's the markup:
[paste form HTML/JSX]
```

**What happens**: AI calls `validate_jp_form` and returns a scored audit with:
- Critical issues (wrong name order, missing furigana)
- High issues (single phone field, missing postal auto-fill)
- Medium issues (button text too casual for context)
- Code suggestions for each fix

**Follow-up prompts**:
```
Fix all critical and high issues. Keep the existing styling.
```

---

## Workflow 3: Writing UI copy with correct politeness

**Scenario**: You're writing error messages, button labels, or empty states for a Japanese app.

**Prompt**:
```
I need Japanese UI copy for these elements in a banking app:
- Error: password too short
- Error: session expired
- Empty state: no transactions yet
- Button: submit application
- Confirmation: are you sure you want to delete?
```

**What happens**: AI calls `suggest_keigo_level` for each element with context `government` (banking = formal) and returns:
- Appropriately formal Japanese text for each
- Alternative phrasings at different politeness levels
- Notes on why certain phrasing was chosen

**Follow-up prompts**:
```
The client says this is for a younger audience (20s). Can we make it slightly less formal while still being respectful?
```

---

## Workflow 4: Generating test data for prototypes

**Scenario**: You're building a Figma prototype or a demo and need realistic Japanese data.

**Prompt**:
```
Generate 10 realistic Japanese user profiles for a prototype.
Mix of ages 25-65, mixed gender. Include full address and company info.
```

**What happens**: AI calls `generate_jp_placeholder` and returns 10 complete profiles with:
- Proper Japanese names with furigana and romaji
- Realistic addresses with real postal codes
- Correctly formatted phone numbers
- Japanese-style email addresses (example.co.jp)
- Company names in 株式会社 format
- Dates in both Gregorian and Japanese era format

---

## Workflow 5: Seasonal design decisions

**Scenario**: You're designing a campaign page and need to align with Japanese seasonal context.

**Prompt**:
```
What seasonal elements should I consider for a Japanese e-commerce site launching a campaign this week?
```

**What happens**: AI calls `get_seasonal_context` with today's date and returns:
- Current season and cultural events
- Upcoming holidays (with notes like "avoid launching during Golden Week")
- Seasonal color palette with hex codes
- Design suggestions appropriate for the time of year

**Follow-up prompts**:
```
Generate a color palette for a spring campaign targeting women 30-50.
```

---

## Workflow 6: Cultural review before launch

**Scenario**: Final check before shipping a Japanese-facing product.

**Prompt**:
```
Review this page for cultural issues before we launch in Japan:
[describe or paste the page layout, colors, features, copy]
```

**What happens**: AI calls `cultural_ux_audit` and returns:
- Cultural red flags (color meanings, icon issues, missing trust signals)
- Legal requirements (特定商取引法 for e-commerce, etc.)
- Trust signal recommendations
- Localization gaps beyond translation

---

## Workflow 7: Typography check for Japanese content

**Scenario**: You've set up typography for a site but aren't sure it works for Japanese text.

**Prompt**:
```
Check my typography setup for Japanese content:
Font: Inter for English, Noto Sans JP for Japanese
Body size: 14px
Line height: 1.5
```

**What happens**: AI calls `check_jp_typography` and returns:
- Font compatibility assessment
- Line height recommendation for Japanese text (usually needs to be higher)
- Font size guidance (14px is minimum for kanji readability)
- Mixed-text rendering tips

---

## Workflow 8: Transforming a Western form for Japan (the mic-drop demo)

**Scenario**: You have an existing Western form and want to see exactly what needs to change for Japan.

**Prompt**:
```
Transform this form for the Japanese market. It's for a B2B SaaS product:
<form>
  <input name="firstName" placeholder="First Name" />
  <input name="lastName" placeholder="Last Name" />
  <input name="email" placeholder="Email" />
  <input name="phone" placeholder="Phone" />
  <input name="address" placeholder="Address" />
  <button type="submit">Submit</button>
</form>
```

**What happens**: AI calls `transform_for_japan` and returns:
- The original markup scored (likely ~12/100)
- A fully transformed Japanese version (~89/100)
- A change log explaining every modification and WHY
- The score improvement (+77 points)

**Follow-up prompts**:
```
Now generate 5 test users to fill this transformed form.
```

---

## Workflow 9: Scoring a page for Japan-readiness

**Scenario**: You want a quick health check on how Japan-ready your site is.

**Prompt**:
```
Score this page for Japan-readiness:
It's an e-commerce checkout with a single name field, email, one phone field,
US-style address, a "Buy Now" button, and no company info in the footer.
```

**What happens**: AI calls `score_japan_readiness` and returns:
- Overall score: 22/100
- Category breakdown (forms: 15, copy: 30, trust: 10, typography: 40, cultural: 15)
- Priority fixes ranked by impact and effort
- A verdict: "This site would feel foreign to Japanese users"

**Follow-up prompts**:
```
Fix the top 3 issues and show me the updated score.
```

---

## Workflow 10: Getting design direction for a Japanese vertical

**Scenario**: Starting a new project for a Japanese client and need the right design direction.

**Prompt**:
```
I'm designing a luxury ryokan booking website targeting domestic Japanese travelers 40-60.
What's the right design direction?
```

**What happens**: AI calls `get_design_context` with vertical "luxury_hospitality" + audience "general" and returns:
- Keigo level recommendation (very formal — 謙譲語 + 尊敬語)
- Color palette with traditional Japanese color names and hex codes
- Typography direction (Mincho for headings, vertical text for atmosphere)
- Form conventions specific to hospitality
- Trust signals required
- Layout notes (sparse, photography-dominant, seasonal rotation)

**Follow-up**: AI calls `get_reference_sites` with vertical "luxury_hospitality" and shows:
- Hoshinoya, Aman Tokyo, Beniya Mukayu as references
- Specific patterns each site uses well

---

## Interview demo script

> Use this when presenting japan-ux-mcp in an interview or portfolio review.

**Setup**: Have Claude Code or Cursor open with japan-ux-mcp installed.

**Demo flow** (5 minutes):

**Opening** (30 sec):
"AI tools generate Western-default UI. When building for Japan, you spend more time correcting the AI than actually designing. I built an MCP server that fixes this."

**Demo 1 — The transformation** (90 sec):
Type: `Transform this Western form for the Japanese market. It's for a fintech app:` + paste a basic Western form.
- Show the before/after: score jumps from 12 → 89
- Point out the changes: furigana, 3-field phone, 〒 postal address, keigo button text
- "Every change is explained with WHY — the AI doesn't just fix it, it teaches you."

**Demo 2 — Test data** (30 sec):
Type: `Generate 5 test users for this form.`
- Show realistic Japanese names, addresses, phone numbers populating the form
- "No more John Doe and 123 Main Street in Japanese product demos."

**Demo 3 — Design direction** (60 sec):
Type: `I'm designing a luxury hotel booking site for Japanese travelers. What's the right design direction?`
- Show the complete context output: keigo level, color palette with traditional Japanese names, typography, trust signals
- Show reference sites: "Here's how Hoshinoya and Aman Tokyo approach this."

**Demo 4 — Seasonal awareness** (30 sec):
Type: `What seasonal elements should I consider for today?`
- Show seasonal colors, cultural events, design suggestions
- "The AI knows it's spring in Japan and adjusts its recommendations."

**Closing** (30 sec):
"This is open source on GitHub, published on npm, and I use it every day. There are 10,000+ MCP servers — this is the only one that understands Japanese design conventions. Zero competitors."
