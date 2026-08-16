import test from "node:test";
import assert from "node:assert/strict";

import { suggestKeigoLevel } from "../dist/tools/suggest-keigo-level.js";
import { scoreJapanReadiness } from "../dist/tools/score-japan-readiness.js";
import { transformForJapan } from "../dist/tools/transform-for-japan.js";
import { generateJpForm } from "../dist/tools/generate-jp-form.js";
import { designDirectionForJapan } from "../dist/tools/design-direction-for-japan.js";
import { checkJpTypography } from "../dist/tools/check-jp-typography.js";
import { auditJapanUx } from "../dist/tools/audit-japan-ux.js";
import { getSeasonalContext } from "../dist/tools/get-seasonal-context.js";
import { fullwidthAsciiToHalfwidth } from "../dist/data/fullwidth-halfwidth.js";

test("unknown keigo text does not fall back to an unrelated canned phrase", () => {
  const buttonResult = suggestKeigoLevel({
    text: "Download invoice",
    ui_element: "button",
    context: "corporate",
  });
  assert.match(buttonResult.suggested, /^\[Translation needed for:/);

  const errorResult = suggestKeigoLevel({
    text: "Unexpected server failure",
    ui_element: "error_message",
    context: "corporate",
  });
  assert.match(errorResult.suggested, /^\[Translation needed for:/);
});

test("japan readiness scoring does not require furigana on an email-only form", () => {
  const result = scoreJapanReadiness({
    markup: '<form><label>Email <input name="email" type="email" /></label></form>',
    context: "consumer_app",
    include_suggestions: true,
  });

  assert.ok(!result.breakdown.forms.issues.includes("No furigana fields"));
});

test("transform_for_japan rewrites unlabeled firstName/lastName inputs", () => {
  const result = transformForJapan({
    markup: '<form><input name="firstName" /><input name="lastName" /><button>Submit</button></form>',
    context: "consumer_app",
    format: "html",
    preserve_styling: true,
  });

  assert.match(result.transformed_markup, /name="sei"/);
  assert.match(result.transformed_markup, /name="mei"/);
  assert.doesNotMatch(result.transformed_markup, /name="firstName"/);
  assert.doesNotMatch(result.transformed_markup, /name="lastName"/);
});

test("preserve_styling controls whether synthesized fields keep source classes", () => {
  const markup = '<form><input class="keepme" name="name" /><button>Submit</button></form>';

  const preserved = transformForJapan({
    markup,
    context: "consumer_app",
    format: "html",
    preserve_styling: true,
  });
  const stripped = transformForJapan({
    markup,
    context: "consumer_app",
    format: "html",
    preserve_styling: false,
  });

  assert.match(preserved.transformed_markup, /class="keepme"/);
  assert.doesNotMatch(stripped.transformed_markup, /class="keepme"/);
});

test("generated date-of-birth year validation uses the current year", () => {
  const currentYear = new Date().getFullYear();
  const { markup } = generateJpForm({
    type: "registration",
    context: "consumer_app",
    fields: ["date_of_birth"],
    format: "html",
    include_validation: true,
    include_labels: true,
    language: "ja",
  });

  assert.match(markup, new RegExp(`max="${currentYear}"`));
});

test("design direction infers Japan-specific guidance from loose brand, audience, and industry input", () => {
  const result = designDirectionForJapan({
    brand_type: "premium",
    audience: "domestic travelers",
    industry: "luxury ryokan",
  });

  assert.equal(result.normalized_inputs.brand_type, "premium_elegant");
  assert.equal(result.normalized_inputs.audience, "domestic_travelers");
  assert.equal(result.normalized_inputs.industry, "luxury");
  assert.equal(result.normalized_inputs.recommended_context, "luxury_hospitality");
  assert.ok(result.color_palette.length > 0);
  assert.ok(result.typography.display_stack.includes("Noto Serif JP"));
  assert.ok(result.cta_style.labels.includes("ご予約"));
  assert.ok(result.trust_layout.hero.length > 0);
  assert.ok(result.section_priorities.some((section) => section.section.includes("アクセス")));
});

test("tone override shifts keigo level instead of ignoring it", () => {
  const friendlier = suggestKeigoLevel({
    text: "Invalid email address",
    ui_element: "error_message",
    context: "corporate",
    tone: "friendly",
  });
  const moreFormal = suggestKeigoLevel({
    text: "Invalid email address",
    ui_element: "error_message",
    context: "consumer_app",
    tone: "formal",
  });

  assert.match(friendlier.level, /^neutral /);
  assert.equal(friendlier.suggested, "メールアドレスが正しくありません");
  assert.match(moreFormal.level, /^formal /);
  assert.equal(moreFormal.suggested, "メールアドレスの形式が正しくありません。正しいメールアドレスをご入力ください。");
});

test("fullwidth ascii conversion preserves katakana long vowel marks", () => {
  assert.equal(fullwidthAsciiToHalfwidth("ＡＢＣ－１２３ー"), "ABC-123ー");
});

test("typography audit does not claim font-size compliance when no font sizes exist", () => {
  const result = checkJpTypography({
    css: 'body { font-family: "Noto Sans JP", sans-serif; line-height: 1.8; word-break: keep-all; overflow-wrap: break-word; font-feature-settings: "palt"; }',
    context: "corporate",
  });

  assert.ok(!result.passed.includes("Font sizes meet kanji readability minimum"));
});

test("mobile audit flags touch targets when either dimension is below 44px", () => {
  const result = auditJapanUx({
    markup: `
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <button style="width:30px;height:50px">Menu</button>
    `,
    site_type: "lp",
  });

  assert.ok(result.categories.mobile.issues.some((issue) => issue.rule_id === "mobile_touch_targets"));
});

test("seasonal context includes Tanabata in July active events", () => {
  const result = getSeasonalContext({ month: 7, day: 7 });

  assert.ok(result.active_events.some((event) => event.id === "tanabata"));
});

test("transform: sibling <label>Name</label><input name=name> keeps every field (v2.1.0 deleted them)", () => {
  const r = transformForJapan({
    markup: '<form><label>Name</label><input type="text" name="name" placeholder="John Smith"><label>Phone</label><input type="tel" name="phone"><button>Submit</button></form>',
    context: "ecommerce",
    format: "html",
    preserve_styling: false,
  });
  const html = r.transformed_markup;
  // the v2.1.0 bug: the wrapped-label regex crossed </label> boundaries,
  // deleted the name input, and the 姓/名 fieldset never inserted
  assert.ok(html.includes('name="sei"'), "姓 field must exist");
  assert.ok(html.includes('name="mei"'), "名 field must exist");
  assert.ok(html.includes("sei_kana"), "furigana must exist");
  assert.ok(html.includes('name="phone"'), "phone field must exist");
  assert.ok(html.includes("<button"), "button must survive");
  assert.ok(!/<label>Name<\/label>/.test(html), "orphan Name label removed");
  assert.ok(!/<label>Phone<\/label>/.test(html), "orphan Phone label removed");
});

test("transform: phone becomes a single field (デジタル庁), not a 3-field split", () => {
  const r = transformForJapan({
    markup: '<form><input type="tel" name="phone"></form>',
    context: "ecommerce",
    format: "html",
    preserve_styling: false,
  });
  assert.ok(!r.transformed_markup.includes("phone1"), "no legacy 3-field split");
  assert.ok(r.transformed_markup.includes('autocomplete="tel-national"'));
});

test("typography: a 12-13px size cannot both warn and claim the sizes-pass line", () => {
  const r = checkJpTypography({ css: "body { font-size: 12px; font-family: 'Noto Sans JP', sans-serif; line-height: 1.8; }" });
  const warned = r.issues.some((i) => i.rule_id === "sizing_kanji_minimum");
  const passClaimed = r.passed.includes("Font sizes meet kanji readability minimum");
  assert.ok(warned, "12px should warn");
  assert.ok(!passClaimed, "pass line must not appear alongside the warning");
});

test("seasonal: month defaults are wired (handler requires month, index fills today)", () => {
  // direct handler call still requires month — this guards the data path for Aug
  const r = getSeasonalContext({ month: 8, day: 16 });
  assert.equal(r.current_microseason.id, "risshuu");
  assert.ok(r.active_events.some((e) => e.id === "obon"));
});
