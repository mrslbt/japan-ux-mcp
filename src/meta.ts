import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ZodRawShape } from "zod";

/**
 * Every tool in this server is read-only, deterministic, and makes no external
 * calls — it analyses/generates from bundled data only.
 */
export const READONLY: ToolAnnotations = {
  readOnlyHint: true,
  idempotentHint: true,
  openWorldHint: false,
};

const ACRONYMS: Record<string, string> = {
  jp: "JP",
  ui: "UI",
  ux: "UX",
  css: "CSS",
  url: "URL",
  b2b: "B2B",
  id: "ID",
  dob: "DOB",
};

function titleFromKey(key: string): string {
  return key
    .split("_")
    .map((w) => ACRONYMS[w.toLowerCase()] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Adds a human-readable `title` to every field in a Zod shape (shown in Claude's
 * UI and counted separately in Smithery's parameter score). Returns the same
 * shape type so tool handler argument inference is preserved.
 */
export function withTitles<T extends ZodRawShape>(shape: T): T {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(shape).map(([k, v]) => [k, (v as any).meta({ title: titleFromKey(k) })])
  ) as T;
}
