#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { generateJpForm } from "./tools/generate-jp-form.js";
import { validateJpForm } from "./tools/validate-jp-form.js";
import { generateJpPlaceholder } from "./tools/generate-jp-placeholder.js";
import { suggestKeigoLevel } from "./tools/suggest-keigo-level.js";
import { scoreJapanReadiness } from "./tools/score-japan-readiness.js";
import { transformForJapan } from "./tools/transform-for-japan.js";

const server = new McpServer({
  name: "japan-ux-mcp",
  version: "1.0.0",
});

// ─── Tool: generate_jp_form ─────────────────────────────────────────────────
server.tool(
  "generate_jp_form",
  "Generate culturally correct Japanese form markup with proper field order (姓→名), furigana, 3-field phone, 〒 postal address, 年月日 dates, and context-appropriate keigo. Use this when building any form for a Japanese audience.",
  {
    type: z.enum(["registration", "contact", "checkout", "inquiry", "login"]).describe("Type of form to generate"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).describe("Business context — determines keigo politeness level"),
    fields: z.array(z.enum(["name", "email", "phone", "address", "date_of_birth", "company"])).describe("Fields to include in the form"),
    format: z.enum(["html", "jsx", "tsx"]).default("html").describe("Output format"),
    include_validation: z.boolean().default(true).describe("Include validation patterns"),
    include_labels: z.boolean().default(true).describe("Include field labels"),
    language: z.enum(["ja", "en", "bilingual"]).default("ja").describe("Label language"),
  },
  async (params) => {
    const result = generateJpForm({
      type: params.type,
      context: params.context,
      fields: params.fields,
      format: params.format,
      include_validation: params.include_validation,
      include_labels: params.include_labels,
      language: params.language,
    });
    return {
      content: [
        { type: "text", text: result.markup },
        { type: "text", text: "\n\n---\n**Notes:**\n" + result.notes.map((n) => `- ${n}`).join("\n") },
      ],
    };
  }
);

// ─── Tool: validate_jp_form ─────────────────────────────────────────────────
server.tool(
  "validate_jp_form",
  "Audit an existing form against Japanese UX conventions. Checks for: name field order (姓/名), furigana, 3-field phone, postal code auto-fill, keigo-appropriate button text, full-width character handling. Returns score (0-100), issues with fixes, and what passed.",
  {
    form_markup: z.string().describe("HTML/JSX form markup to audit"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).describe("Business context for keigo expectations"),
  },
  async (params) => {
    const result = validateJpForm({
      form_markup: params.form_markup,
      context: params.context,
    });
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// ─── Tool: generate_jp_placeholder ──────────────────────────────────────────
server.tool(
  "generate_jp_placeholder",
  "Generate realistic Japanese test data for prototypes and development. Returns names (kanji + katakana furigana + romaji), addresses (real postal codes and prefectures), phone numbers (correct 3-field format), company names, and dates (both Gregorian and Japanese era format like 平成4年3月15日).",
  {
    count: z.number().min(1).max(50).default(5).describe("Number of records to generate"),
    fields: z.array(z.enum(["name", "email", "phone", "address", "company", "date_of_birth"])).describe("Data fields to include"),
    gender: z.enum(["mixed", "male", "female"]).default("mixed").describe("Gender for name generation"),
    age_range: z.string().optional().describe('Age range like "20-40" for date_of_birth generation'),
  },
  async (params) => {
    const result = generateJpPlaceholder({
      count: params.count,
      fields: params.fields,
      gender: params.gender,
      age_range: params.age_range,
    });
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// ─── Tool: suggest_keigo_level ──────────────────────────────────────────────
server.tool(
  "suggest_keigo_level",
  "Suggest appropriately polite Japanese UI text based on context. Maps business context to keigo level (casual → very_formal) and returns the right Japanese translation for buttons, error messages, empty states, confirmations, and more. Includes alternatives for different formality levels.",
  {
    text: z.string().describe("English UI text to translate (e.g. 'Invalid email address', 'Submit', 'No results found')"),
    ui_element: z.enum(["error_message", "button", "label", "tooltip", "empty_state", "confirmation", "onboarding", "notification", "success_message"]).describe("Type of UI element"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate", "banking", "youth_app", "luxury_hospitality"]).describe("Business context — determines keigo level"),
    tone: z.enum(["formal", "neutral", "friendly"]).optional().describe("Optional tone override"),
  },
  async (params) => {
    const result = suggestKeigoLevel({
      text: params.text,
      ui_element: params.ui_element,
      context: params.context,
      tone: params.tone,
    });
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// ─── Tool: score_japan_readiness ────────────────────────────────────────────
server.tool(
  "score_japan_readiness",
  "Score any page or component for Japan-readiness on a 0-100 scale. Analyzes 5 categories: forms (name order, furigana, phone, postal), copy (keigo, Japanese text, placeholders), trust (特定商取引法, phone number, company info), typography (font, size, line-height), and cultural (seasonal awareness, imagery). Returns breakdown with issues and quick wins per category.",
  {
    markup: z.string().describe("HTML/JSX markup to analyze"),
    description: z.string().optional().describe("Description of the page/component for additional context"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).describe("Business context"),
    include_suggestions: z.boolean().default(true).describe("Include priority fix suggestions with impact estimates"),
  },
  async (params) => {
    const result = scoreJapanReadiness({
      markup: params.markup,
      description: params.description,
      context: params.context,
      include_suggestions: params.include_suggestions,
    });
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// ─── Tool: transform_for_japan ──────────────────────────────────────────────
server.tool(
  "transform_for_japan",
  "Transform Western markup into Japan-ready markup. Automatically fixes: name field order (firstName/lastName → 姓/名), adds furigana, splits phone into 3 fields, restructures address to 〒 postal format, translates buttons with appropriate keigo, replaces Western placeholder data with Japanese examples. Shows before/after scores and explains every change.",
  {
    markup: z.string().describe("Western HTML/JSX markup to transform"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).describe("Business context — determines keigo level and conventions"),
    format: z.enum(["html", "jsx", "tsx"]).default("html").describe("Output format"),
    preserve_styling: z.boolean().default(true).describe("Preserve existing CSS classes and styles"),
  },
  async (params) => {
    const result = transformForJapan({
      markup: params.markup,
      context: params.context,
      format: params.format,
      preserve_styling: params.preserve_styling,
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              original_score: result.original_score,
              transformed_score: result.transformed_score,
              improvement: result.improvement,
              changes_made: result.changes_made,
            },
            null,
            2
          ),
        },
        { type: "text", text: "\n\n---\n**Transformed markup:**\n```\n" + result.transformed_markup + "\n```" },
      ],
    };
  }
);

// ─── MCP Prompts (show up as slash commands in Claude Code) ─────────────────

server.prompt(
  "japan_form",
  "Generate a culturally correct Japanese form. Specify the type and context.",
  {
    type: z.enum(["registration", "contact", "checkout", "inquiry", "login"]).describe("Form type"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).describe("Business context"),
  },
  async ({ type, context }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Generate a complete Japanese ${type} form for a ${context.replace("_", " ")} product.\n\nInclude all standard fields: name (姓/名 + furigana), email, phone (3-field), address (〒 postal code with auto-fill), and a submit button with appropriate keigo.\n\nUse the generate_jp_form tool with format "tsx" and language "ja". Then explain each Japanese UX convention applied.`,
        },
      },
    ],
  })
);

server.prompt(
  "japan_audit",
  "Audit HTML/JSX markup for Japanese UX issues. Paste your form markup.",
  {
    markup: z.string().describe("Form HTML/JSX to audit"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).default("consumer_app").describe("Business context"),
  },
  async ({ markup, context }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Audit this form for Japanese UX conventions using the validate_jp_form tool with context "${context}":\n\n${markup}\n\nFor each issue found, explain why it matters to Japanese users and show the fix.`,
        },
      },
    ],
  })
);

server.prompt(
  "japan_transform",
  "Transform Western markup into Japan-ready markup with before/after scoring.",
  {
    markup: z.string().describe("Western HTML/JSX to transform"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).default("consumer_app").describe("Business context"),
  },
  async ({ markup, context }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Transform this Western markup for the Japanese market using the transform_for_japan tool with context "${context}":\n\n${markup}\n\nShow the before/after scores and explain every change made.`,
        },
      },
    ],
  })
);

server.prompt(
  "japan_testdata",
  "Generate realistic Japanese test data for prototypes.",
  {
    count: z.string().default("5").describe("Number of records"),
  },
  async ({ count }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Generate ${count} realistic Japanese user profiles using generate_jp_placeholder. Include: name (kanji + furigana + romaji), email, phone, full address with postal code, company name, and date of birth in both Gregorian and Japanese era format.`,
        },
      },
    ],
  })
);

server.prompt(
  "japan_keigo",
  "Get the right Japanese politeness level for UI text.",
  {
    text: z.string().describe("English UI text (e.g. 'Invalid email', 'Submit', 'Are you sure?')"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate", "banking", "youth_app", "luxury_hospitality"]).default("consumer_app").describe("Business context"),
    element: z.enum(["error_message", "button", "label", "tooltip", "empty_state", "confirmation", "onboarding", "notification", "success_message"]).default("button").describe("UI element type"),
  },
  async ({ text, context, element }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Suggest the correct Japanese keigo level for this UI text using suggest_keigo_level:\n\nText: "${text}"\nElement: ${element}\nContext: ${context}\n\nShow the recommended translation, alternatives at different politeness levels, and explain when to use each.`,
        },
      },
    ],
  })
);

server.prompt(
  "japan_score",
  "Score a page or component for Japan-readiness (0-100).",
  {
    description: z.string().describe("Describe the page: what fields, buttons, layout, content"),
    context: z.enum(["b2b_saas", "consumer_app", "government", "ecommerce", "corporate"]).default("consumer_app").describe("Business context"),
  },
  async ({ description, context }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Score this page for Japan-readiness using score_japan_readiness with context "${context}":\n\n${description}\n\nShow the overall score, category breakdown (forms, copy, trust, typography, cultural), and top priority fixes ranked by impact.`,
        },
      },
    ],
  })
);

// ─── MCP Resources (reference data accessible to Claude) ────────────────────

server.resource(
  "keigo-guide",
  "japan-ux://keigo-guide",
  { description: "Complete Japanese keigo (politeness) reference for UI copy — 4 levels across 8 business contexts with 30+ pattern examples", mimeType: "text/markdown" },
  async () => ({
    contents: [
      {
        uri: "japan-ux://keigo-guide",
        mimeType: "text/markdown",
        text: `# Japanese Keigo Guide for UI Copy

## Politeness Levels
| Level | Japanese | When to use |
|-------|----------|-------------|
| casual | カジュアル | Youth-oriented apps only |
| neutral (丁寧語 teineigo) | です/ます form | Consumer apps, general audience |
| formal (尊敬語 sonkeigo) | Honorific | B2B SaaS, e-commerce, corporate |
| very_formal (謙譲語 kenjogo) | Humble | Government, banking, luxury hospitality |

## Context → Level Mapping
| Context | Keigo Level |
|---------|-------------|
| government | very_formal |
| banking | very_formal |
| luxury_hospitality | very_formal |
| b2b_saas | formal |
| corporate | formal |
| ecommerce | formal |
| consumer_app | neutral |
| youth_app | casual |

## Common UI Patterns

### Error Messages
- **casual**: メールアドレスが違うよ
- **neutral**: メールアドレスが正しくありません
- **formal**: メールアドレスの形式が正しくありません。正しいメールアドレスをご入力ください。
- **very_formal**: 恐れ入りますが、メールアドレスの形式が正しくないようです。お手数ですが、正しいメールアドレスをご入力くださいますようお願い申し上げます。

### Buttons
- Submit: 送信 → 送信する → 送信する → ご送信
- Register: 登録する → 登録する → ご登録内容を確認する → お申し込み内容を確認する
- Purchase: 買う → 購入する → ご購入手続きへ → ご購入手続きへ進む
- Cancel: キャンセル → キャンセル → キャンセルする → 取り消す

### Empty States
- No results: 見つからなかった → 該当する結果がありません → 該当する結果が見つかりませんでした。条件を変更して再度お試しください。

### Key Rule
Japanese error messages should **guide the user to the correct action**, not just state what's wrong. Always include a constructive suggestion.`,
      },
    ],
  })
);

server.resource(
  "form-checklist",
  "japan-ux://form-checklist",
  { description: "Japanese form UX checklist — every convention to check before shipping a form for Japanese users", mimeType: "text/markdown" },
  async () => ({
    contents: [
      {
        uri: "japan-ux://form-checklist",
        mimeType: "text/markdown",
        text: `# Japanese Form UX Checklist

## Name Fields
- [ ] Family name (姓) comes BEFORE given name (名)
- [ ] Fields labeled 姓 and 名, not "First Name" / "Last Name"
- [ ] Furigana fields (セイ / メイ) below each name field
- [ ] Furigana accepts only full-width katakana (ァ-ヶー)
- [ ] name attributes: sei, mei, sei_kana, mei_kana

## Phone Number
- [ ] Split into 3 separate fields (XXX-XXXX-XXXX)
- [ ] Dashes displayed between fields (not typed by user)
- [ ] Half-width digits only (auto-convert ０１２ → 012)
- [ ] Field 1: 2-5 digits, Field 2: 1-4 digits, Field 3: 4 digits
- [ ] Supports: 090/080/070 (mobile), 03 (Tokyo), 06 (Osaka), 0120 (toll-free)

## Address
- [ ] Starts with 〒 postal code (XXX-XXXX format)
- [ ] Postal code triggers auto-fill for prefecture + city
- [ ] Order: postal code → prefecture (都道府県) → city (市区町村) → block (番地) → building (建物名)
- [ ] Prefecture as dropdown (47 options)
- [ ] Building/room number as separate optional field

## Date of Birth
- [ ] Separate fields: 年 / 月 / 日 (not a date picker)
- [ ] Optional: show Japanese era (令和/平成) alongside Gregorian year
- [ ] Era year 1 displays as 元年, not 1年

## Email
- [ ] Half-width validation (auto-convert ＠ → @, ．→ .)
- [ ] Placeholder: example@example.co.jp (not .com)

## Buttons & Labels
- [ ] Required fields marked with 必須 badge (red)
- [ ] Optional fields marked with 任意
- [ ] Submit button uses appropriate keigo for context
- [ ] Confirmation screen (確認画面) before final submission

## Validation
- [ ] Auto-convert full-width digits to half-width on numeric fields
- [ ] Error messages guide to correct action (not just "invalid")
- [ ] Inline validation preferred over submit-time validation

## Trust & Legal
- [ ] 個人情報保護方針 (Privacy Policy) link near form
- [ ] SSL/security badge visible
- [ ] For e-commerce: 特定商取引法に基づく表記 link`,
      },
    ],
  })
);

server.resource(
  "phone-formats",
  "japan-ux://phone-formats",
  { description: "Japanese phone number formats — mobile, landline, toll-free, IP phone patterns with field splitting rules", mimeType: "text/markdown" },
  async () => ({
    contents: [
      {
        uri: "japan-ux://phone-formats",
        mimeType: "text/markdown",
        text: `# Japanese Phone Number Formats

| Type | Prefixes | Total Digits | Field Split | Example |
|------|----------|-------------|-------------|---------|
| Mobile | 070, 080, 090 | 11 | 3-4-4 | 090-1234-5678 |
| IP Phone | 050 | 11 | 3-4-4 | 050-1234-5678 |
| Tokyo | 03 | 10 | 2-4-4 | 03-1234-5678 |
| Osaka | 06 | 10 | 2-4-4 | 06-1234-5678 |
| Toll-free | 0120 | 10 | 4-3-3 | 0120-123-456 |
| Navi Dial | 0570 | 10 | 4-3-3 | 0570-123-456 |

## Form Implementation
- Always use 3 separate input fields
- Display dashes between fields (user doesn't type them)
- Field 1: pattern="[0-9]{2,5}" maxlength="5"
- Field 2: pattern="[0-9]{1,4}" maxlength="4"
- Field 3: pattern="[0-9]{4}" maxlength="4"
- Auto-convert full-width digits (０１２) to half-width (012)`,
      },
    ],
  })
);

server.resource(
  "era-calendar",
  "japan-ux://era-calendar",
  { description: "Japanese era calendar — Reiwa, Heisei, Showa, Taisho, Meiji with date ranges and conversion rules", mimeType: "text/markdown" },
  async () => ({
    contents: [
      {
        uri: "japan-ux://era-calendar",
        mimeType: "text/markdown",
        text: `# Japanese Era Calendar (年号)

| Era | Kanji | Abbrev | Start | End |
|-----|-------|--------|-------|-----|
| Reiwa | 令和 | R | 2019-05-01 | current |
| Heisei | 平成 | H | 1989-01-08 | 2019-04-30 |
| Showa | 昭和 | S | 1926-12-25 | 1989-01-07 |
| Taisho | 大正 | T | 1912-07-30 | 1926-12-24 |
| Meiji | 明治 | M | 1868-01-25 | 1912-07-29 |

## Conversion
- Era year 1 = 元年 (gannen), NOT "1年"
- Example: 2024 = 令和6年, 1990 = 平成2年
- Formula: Gregorian year - era start year + 1 = era year

## Form Usage
- Date fields: separate 年/月/日 inputs
- Show era alongside Gregorian: "1990年 (平成2年)"
- Government forms may require era format as primary`,
      },
    ],
  })
);

// ─── Start server ───────────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Failed to start japan-ux-mcp server:", error);
  process.exit(1);
});
