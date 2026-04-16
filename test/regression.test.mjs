import test from "node:test";
import assert from "node:assert/strict";

import { suggestKeigoLevel } from "../dist/tools/suggest-keigo-level.js";
import { scoreJapanReadiness } from "../dist/tools/score-japan-readiness.js";
import { transformForJapan } from "../dist/tools/transform-for-japan.js";
import { generateJpForm } from "../dist/tools/generate-jp-form.js";
import { designDirectionForJapan } from "../dist/tools/design-direction-for-japan.js";

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
