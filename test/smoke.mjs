import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import assert from "node:assert/strict";

const transport = new StdioClientTransport({ command: "node", args: ["dist/index.js"] });
const client = new Client({ name: "japan-ux-smoke", version: "1.0.0" }, { capabilities: {} });
await client.connect(transport);

try {
  const { tools } = await client.listTools();
  assert.ok(tools.length >= 11, `expected >= 11 tools, got ${tools.length}`);
  assert.ok(
    tools.every((t) => t.annotations?.readOnlyHint === true),
    "every tool must declare readOnlyHint"
  );
  const hasParamTitles = tools.some((t) =>
    Object.values(t.inputSchema?.properties ?? {}).some((p) => typeof p?.title === "string")
  );
  assert.ok(hasParamTitles, "tools should expose parameter titles");

  const res = await client.callTool({
    name: "review_jp_ui",
    arguments: { css: "body{font-size:13px;line-height:1.4;font-family:'Inter',sans-serif}", context: "corporate" },
  });
  const parsed = JSON.parse(res.content.map((c) => c.text).join("\n"));
  assert.equal(parsed.verdict, "fail", "Western stylesheet should fail the Japanese UI standard");

  console.log(
    `✅ smoke: ${tools.length} tools, all READONLY, param titles present, review_jp_ui → ${parsed.verdict} (${parsed.score}/100)`
  );
} finally {
  await client.close();
}
