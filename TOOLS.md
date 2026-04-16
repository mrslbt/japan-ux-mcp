# Tool Reference — japan-ux-mcp

This file documents the tools that are actually shipped by the MCP server today.

If you are looking for ideas or future directions, keep those in `PRD.md`. This file stays limited to the live surface area.

---

## Shipped tools

| Tool | Use it when | Returns |
|------|-------------|---------|
| `generate_jp_form` | You need a Japanese form from scratch | Form markup plus notes on the conventions applied |
| `validate_jp_form` | You already have a form and want a convention check | Score, issues, and passed items |
| `generate_jp_placeholder` | You need realistic Japanese test data | Names, addresses, phone numbers, companies, dates |
| `suggest_keigo_level` | You need Japanese UI copy at the right politeness level | Suggested text, alternatives, level, note |
| `score_japan_readiness` | You want a quick 0-100 readiness score | Score breakdown, issues, and suggested fixes |
| `transform_for_japan` | You want to convert Western form markup for Japan | Transformed markup, score delta, change log |
| `check_jp_typography` | You want a Japanese typography audit for CSS | Score, issues, passed checks, font recommendation |
| `get_seasonal_context` | You want the current Japanese seasonal design context | Season, events, microseason, design recommendations, warnings |
| `audit_japan_ux` | You want a broader Japanese UX audit beyond forms | Letter grade, category scores, findings, top fixes |
| `design_direction_for_japan` | You want a practical visual direction for a Japanese site | Density, palette, typography, imagery, CTAs, trust layout |

---

## `generate_jp_form`

Use it when:
- You are starting a Japanese registration, contact, checkout, inquiry, or login flow
- You want the AI to begin with Japanese structure instead of Western defaults

Key inputs:
- `type`: `registration | contact | checkout | inquiry | login`
- `context`: `b2b_saas | consumer_app | government | ecommerce | corporate`
- `fields`: any mix of `name`, `email`, `phone`, `address`, `date_of_birth`, `company`
- `format`: `html | jsx | tsx`

Returns:
- Complete markup
- Notes explaining the conventions used

What it bakes in:
- `姓 / 名` ordering
- Furigana fields
- `〒` postal flow
- 3-field phone input
- `年 / 月 / 日` style date handling
- Context-appropriate keigo for buttons and labels

---

## `validate_jp_form`

Use it when:
- A form already exists and you want to check if it feels Japan-native

Key inputs:
- `form_markup`
- `context`

Returns:
- A score out of 100
- Issue list with severity
- Passed checks

Typical findings:
- Western name order
- Missing furigana
- Single phone field
- Missing postal code flow
- Button text that is too blunt for the context

---

## `generate_jp_placeholder`

Use it when:
- You need believable Japanese demo or prototype data

Key inputs:
- `count`
- `fields`
- `gender`
- `age_range`

Returns:
- Japanese names in kanji, kana, and romaji
- Japanese addresses with postal codes
- Correctly structured phone numbers
- Company names
- Dates including Japanese era format when relevant

---

## `suggest_keigo_level`

Use it when:
- You have English UI copy and want the right Japanese tone
- You need to make an interface more formal or slightly friendlier without losing context

Key inputs:
- `text`
- `ui_element`
- `context`
- optional `tone`

Returns:
- Recommended Japanese text
- Politeness level
- Alternatives at other levels
- A note explaining the choice

Works well for:
- Error messages
- Buttons
- Empty states
- Confirmations
- Onboarding copy

---

## `score_japan_readiness`

Use it when:
- You want a fast diagnostic on a page or component

Key inputs:
- `markup`
- optional `description`
- `context`
- `include_suggestions`

Returns:
- Overall score
- Category breakdown
- Issues
- Quick wins and suggestions

Scoring areas:
- Forms
- Copy
- Trust
- Typography
- Cultural fit

---

## `transform_for_japan`

Use it when:
- You already have Western-style markup and want a Japan-ready version

Key inputs:
- `markup`
- `context`
- `format`
- `preserve_styling`

Returns:
- Original score
- Transformed score
- Improvement amount
- Change log
- Transformed markup

This is the most obvious demo tool in the repo because the before/after is easy to understand instantly.

---

## `check_jp_typography`

Use it when:
- You want to verify that typography choices actually work for Japanese text

Key inputs:
- `css`
- optional `markup`
- optional `context`

Returns:
- Score
- Issues and fixes
- Passed checks
- Recommended font stack

Checks include:
- Japanese font stacks
- Line height
- Font size
- `word-break: keep-all`
- `font-feature-settings: "palt"`
- Text-on-image legibility

---

## `get_seasonal_context`

Use it when:
- You are planning a campaign, LP, or content release for Japan

Key inputs:
- `month`
- optional `day`

Returns:
- Current season
- Active events
- Upcoming events
- Current microseason
- Design recommendations
- Launch/deploy warnings

Examples:
- Golden Week launch risk
- Obon closure risk
- Spring sakura context
- July `Tanabata` context

---

## `audit_japan_ux`

Use it when:
- You need a broader audit than forms alone
- You want to review a landing page, corporate site, ecommerce page, or content page

Key inputs:
- `markup`
- optional `css`
- optional `url_description`
- `site_type`
- optional `target_audience`

Returns:
- Overall score and letter grade
- Category scores
- Full issue list
- Top prioritized fixes

Audit areas:
- Layout
- Typography
- Visual
- Navigation
- Trust
- Content
- Mobile

---

## `design_direction_for_japan`

Use it when:
- You are starting from a brief, not existing markup
- You want a practical Japanese design direction for a specific vertical and audience

Key inputs:
- `brand_type`
- `audience`
- `industry`

Returns:
- Normalized brand, audience, and industry profiles
- Recommended context and keigo level
- Visual direction and density guidance
- Color palette
- Typography direction
- Imagery style
- CTA style
- Trust layout
- Section priorities
- Things to avoid

Good example:
- `brand_type: premium`
- `audience: domestic travelers`
- `industry: luxury ryokan`

This will return a design brief that is much closer to how a Japanese designer would frame the project than a generic AI answer.

---

## Notes

- The server is local-first and does not require API keys.
- The live MCP definitions are in [src/index.ts](src/index.ts).
- Regression coverage lives in [test/regression.test.mjs](test/regression.test.mjs).
