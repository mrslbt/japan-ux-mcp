# Prompt Recipes — japan-ux-mcp

These are practical ways to use the shipped prompts and tools in the repo today.

This file stays aligned with the current MCP surface. It is not a brainstorm doc.

---

## MCP prompt templates

| Prompt | Best for | Usually triggers |
|--------|----------|------------------|
| `japan_form` | Building a Japanese form from scratch | `generate_jp_form` |
| `japan_audit` | Auditing existing form markup | `validate_jp_form` |
| `japan_transform` | Converting Western form markup | `transform_for_japan` |
| `japan_testdata` | Generating Japanese placeholder data | `generate_jp_placeholder` |
| `japan_keigo` | Getting correct Japanese UI politeness | `suggest_keigo_level` |
| `japan_score` | Getting a quick 0-100 readiness check | `score_japan_readiness` |
| `japan_typography` | Auditing CSS for Japanese typography | `check_jp_typography` |
| `japan_seasonal` | Getting seasonal design context | `get_seasonal_context` |
| `japan_full_audit` | Running a broader Japanese UX audit | `audit_japan_ux` |
| `japan_design_direction` | Getting a Japan-specific visual brief | `design_direction_for_japan` |

---

## Workflow 1: Build a Japanese registration form

Prompt:
```text
Build a registration form for a Japanese B2B SaaS product.
Include name, email, phone, company, and address. Use TSX with Tailwind.
```

What happens:
- The assistant can call `generate_jp_form`
- It returns Japanese-ready structure instead of Western defaults

What to look for:
- `姓 / 名`
- Furigana
- 3-field phone
- `〒` postal flow
- Keigo-aware submit copy

---

## Workflow 2: Audit an existing form

Prompt:
```text
Audit this form for Japanese conventions:
<form>
  <input name="firstName" placeholder="First Name" />
  <input name="lastName" placeholder="Last Name" />
  <input name="email" />
  <input name="phone" />
  <button>Submit</button>
</form>
```

What happens:
- The assistant calls `validate_jp_form`
- You get a score, issue list, and clear fixes

Good follow-up:
```text
Fix the critical issues and keep the existing styling.
```

---

## Workflow 3: Transform Western markup for Japan

Prompt:
```text
Transform this form for the Japanese market:
<form>
  <label>First Name <input name="firstName" /></label>
  <label>Last Name <input name="lastName" /></label>
  <label>Phone <input name="phone" /></label>
  <label>Address <input name="address" /></label>
  <button type="submit">Submit</button>
</form>
```

What happens:
- The assistant calls `transform_for_japan`
- You get before/after scores plus transformed markup

Why this is a strong demo:
- The value is obvious even to non-designers

---

## Workflow 4: Get keigo-aware UI copy

Prompt:
```text
I need Japanese UI copy for a banking app:
- Error: "Invalid email address"
- Error: "Session expired"
- Button: "Submit application"
- Empty state: "No transactions yet"
- Confirmation: "Are you sure you want to delete?"
```

What happens:
- The assistant calls `suggest_keigo_level`
- You get suggested copy, alternatives, and tone guidance

Good follow-up:
```text
Make it one step friendlier without making it casual.
```

---

## Workflow 5: Generate realistic Japanese test data

Prompt:
```text
Generate 10 Japanese user profiles for a prototype.
Mixed gender, ages 25-45. Include full address and company.
```

What happens:
- The assistant calls `generate_jp_placeholder`
- You get realistic Japanese names, addresses, phone formats, and companies

---

## Workflow 6: Check typography for Japanese content

Prompt:
```text
Check this CSS for Japanese typography issues:

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  font-style: italic;
}
```

What happens:
- The assistant calls `check_jp_typography`
- You get a score, issues, fixes, and a better font recommendation

---

## Workflow 7: Get seasonal context

Prompt:
```text
I'm designing a campaign landing page. What's the current Japanese seasonal context?
What colors, motifs, and events should I consider? Any launch blackout dates coming up?
```

What happens:
- The assistant calls `get_seasonal_context`
- You get seasonal cues, current events, microseason context, and warnings like Golden Week or Obon

---

## Workflow 8: Run a full UX audit

Prompt:
```text
Run a Japanese UX audit on this B2B SaaS landing page.
It has: hero with English tagline, feature grid, pricing table,
no phone number in header, no company info page, single-column layout.
```

What happens:
- The assistant calls `audit_japan_ux`
- You get a letter grade, category scores, and top fixes

This is the right prompt when the problem is bigger than forms alone.

---

## Workflow 9: Score a page for Japan-readiness

Prompt:
```text
Score this page for Japan-readiness:
It's an e-commerce checkout with a single name field, email, one phone field,
US-style address, a "Buy Now" button, and no company info in the footer.
```

What happens:
- The assistant calls `score_japan_readiness`
- You get a fast health check and prioritized improvement list

This is lighter than the full audit and better for quick iteration.

---

## Workflow 10: Get design direction for a Japanese vertical

Prompt:
```text
I'm designing a luxury ryokan booking site for Japanese domestic travelers.
What design direction should I take?
```

What happens:
- The assistant calls `design_direction_for_japan`
- You get a practical brief covering density, palette, typography, imagery, CTA style, trust layout, and section priorities

This is the best starting point when you have a brief but not a finished design yet.

---

## Five-minute demo script

Use this when presenting the project to a recruiter, TA, hiring manager, or portfolio reviewer.

Opening:
`AI tools generate Western-default UX. When I build for Japan, I end up correcting the AI more than designing. I built an MCP server that gives the AI Japanese UX conventions from the start.`

Demo 1:
- Prompt: `Transform this Western form for the Japanese market`
- Show the before/after change
- Point out `姓 / 名`, furigana, phone splitting, `〒` postal flow, keigo button text

Demo 2:
- Prompt: `Generate 5 Japanese user profiles for this form`
- Show realistic names, addresses, and phone numbers

Demo 3:
- Prompt: `I'm designing a luxury ryokan booking site for Japanese domestic travelers. What design direction should I take?`
- Show the output for visual direction, typography, trust signals, and CTA tone

Demo 4:
- Prompt: `What's the current Japanese seasonal context for this campaign?`
- Show event and launch warnings like Golden Week or Obon

Closing:
`This turns local Japanese design knowledge into reusable infrastructure for AI-assisted website building.`

---

## Notes

- The live prompt definitions are in [src/index.ts](src/index.ts).
- The README is the best public-facing overview.
- For future ideas, use `PRD.md`, not this file.
