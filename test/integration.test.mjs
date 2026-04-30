import test from "node:test";
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const EXPECTED_TOOLS = [
  "generate_jp_form",
  "validate_jp_form",
  "generate_jp_placeholder",
  "suggest_keigo_level",
  "score_japan_readiness",
  "transform_for_japan",
  "check_jp_typography",
  "get_seasonal_context",
  "audit_japan_ux",
  "design_direction_for_japan",
];

async function withClient(fn) {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/index.js"],
  });
  const client = new Client(
    { name: "japan-ux-integration-test", version: "1.0.0" },
    { capabilities: {} }
  );
  await client.connect(transport);
  try {
    return await fn(client);
  } finally {
    await client.close();
  }
}

test("MCP server connects and lists all 10 tools", async () => {
  await withClient(async (client) => {
    const tools = await client.listTools();
    const names = tools.tools.map((t) => t.name).sort();
    assert.deepEqual(names, [...EXPECTED_TOOLS].sort());
  });
});

test("MCP: generate_jp_form returns markup with 姓/名 split", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "generate_jp_form",
      arguments: {
        type: "registration",
        context: "consumer_app",
        fields: ["name", "email"],
        format: "html",
        include_validation: true,
        include_labels: true,
        language: "ja",
      },
    });
    assert.ok(!result.isError, "tool should not error");
    const text = result.content.map((c) => c.text).join("\n");
    assert.match(text, /name="sei"/);
    assert.match(text, /name="mei"/);
    assert.match(text, /name="email"/);
  });
});

test("MCP: suggest_keigo_level returns Japanese translation", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "suggest_keigo_level",
      arguments: {
        text: "Invalid email address",
        ui_element: "error_message",
        context: "consumer_app",
      },
    });
    assert.ok(!result.isError);
    const text = result.content.map((c) => c.text).join("\n");
    assert.match(text, /メールアドレス/);
  });
});

test("MCP: get_seasonal_context surfaces July events", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "get_seasonal_context",
      arguments: { month: 7, day: 7 },
    });
    assert.ok(!result.isError);
    const text = result.content.map((c) => c.text).join("\n");
    assert.match(text, /tanabata/i);
  });
});

test("MCP: audit_japan_ux flags small touch targets", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "audit_japan_ux",
      arguments: {
        markup: '<button style="width:30px;height:50px">Menu</button>',
        site_type: "lp",
      },
    });
    assert.ok(!result.isError);
    const text = result.content.map((c) => c.text).join("\n");
    assert.match(text, /mobile_touch_targets/);
  });
});

test("MCP: validate_jp_form returns a score for English form", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "validate_jp_form",
      arguments: {
        form_markup: '<form><input name="firstName" /><input name="lastName" /></form>',
        context: "consumer_app",
      },
    });
    assert.ok(!result.isError);
    const text = result.content.map((c) => c.text).join("\n");
    const parsed = JSON.parse(text);
    assert.ok(typeof parsed.score === "number");
    assert.ok(parsed.score >= 0 && parsed.score <= 100);
  });
});
