# AGENTS.md — japan-ux-mcp

Guide for AI coding agents (Claude Code, Cursor, Codex, Copilot…) working in this repo.

## What this project is

**Japan Design** — an MCP server that enforces Japanese **UI** (typography, colour, layout) and **UX** (forms, keigo, trust, seasonal) conventions on real CSS/markup, so AI generates culturally correct Japanese interfaces instead of Western defaults.

- npm: `japan-ux-mcp` · registry name: `io.github.mrslbt/japan-ux`
- Local **stdio** server, **read-only**, **deterministic**, bundled data only — no API keys, no network.
- Flagship tool: **`review_jp_ui`** — the front-end correctness enforcer (scores any UI against the Japanese standard with JLReq/JIS citations + fixes).

## Quick commands

```bash
npm install        # deps
npm run build      # tsc → dist/   (must pass before commit)
npm test           # build + node --test test/*.test.mjs   (must pass before commit)
npm run smoke      # build + a live MCP round-trip (lists tools, calls review_jp_ui)
npm run dev        # tsc --watch
```

Pre-commit: `npm run build && npm test`. Both must pass. 18 tests today.

## Architecture (the whole mental model)

```
src/
├── index.ts            # McpServer — registers every tool/prompt/resource + server instructions
├── meta.ts             # READONLY annotation + withTitles() param-title helper
├── tools/
│   ├── review-jp-ui.ts # FLAGSHIP — composes typography + colour + font-payload checks
│   ├── check-jp-typography.ts, audit-japan-ux.ts, transform-for-japan.ts, … (one file per tool)
└── data/               # bundled, offline rule data (typography-rules, visual-rules, keigo, seasonal, …)
test/                   # integration + regression (.test.mjs) and smoke.mjs
```

11 tools · 10 prompts · 9 resources. The SDK is `@modelcontextprotocol/sdk` (1.29+), zod 4.

## How to add or change a tool

Every tool is registered in `index.ts` with **annotations + parameter titles**. Use this exact shape — do not drop `withTitles` or `READONLY`:

```ts
import { READONLY, withTitles } from "./meta.js";

server.tool(
  "your_tool_name",                                   // snake_case, verb-first
  "Verb-first description, ≤2 sentences, names the next tool to call.",
  withTitles({
    some_field: z.string().describe("English description with a concrete example."),
  }),
  READONLY,                                           // every tool is read-only + deterministic
  async (params) => {
    const result = yourToolFn({ ...params });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);
```

Keep tool logic in `src/tools/<name>.ts`, rule data in `src/data/<name>.ts`. Then add a test in `test/integration.test.mjs` (and update the expected-tools list + count) and run `npm test`.

## The honesty rule (non-negotiable — it's the brand)

This server makes claims about Japanese design. Every claim must be **labelled by its basis**:

- **`spec`** → codified in **W3C JLReq (Requirements for Japanese Text Layout)** or **JIS X 4051**. Only line-breaking (kinsoku), ruby, vertical text, justification, and the no-italics fact qualify.
- **`convention`** → documented Japanese *web practice* (e.g. line-height 1.8, 16px body). Real, but **not** a spec clause.

Never present a convention as a hard spec. Never invent a Japanese convention — if you can't source it, don't ship it. See `src/tools/review-jp-ui.ts` (the `SOURCES` map) for the pattern.

## Release / version sync

Bump the version in **all four** places (they must match) and keep the names aligned:

1. `package.json` → `version`
2. `src/index.ts` → the `McpServer({ version })`
3. `server.json` → top-level `version` **and** `packages[0].version`
4. `package.json` `mcpName` **must equal** `server.json` `name` (`io.github.mrslbt/japan-ux`) — the registry validates npm ownership against this.

Then: `npm run build && npm test` → `git push` → `npm publish` → `mcp-publisher publish`. The npm package must be published **before** the registry publish (the registry verifies it). `server.json` `description` is capped at **100 chars**.

## Conventions

- Bundled data only — never add network calls or API keys; load data at module level, not inside handlers.
- Bilingual where it matters (EN + JA in tool output/copy).
- Keep `dist/` out of git; npm ships `files: ["dist"]` only.
