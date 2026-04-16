import {
  suggestKeigo,
  getKeigoLevel,
  KEIGO_PATTERNS,
  type Context,
  type UiElement,
  type KeigoLevel,
} from "../data/keigo-patterns.js";

export interface SuggestKeigoParams {
  text: string;
  ui_element: UiElement;
  context: Context;
  tone?: "formal" | "neutral" | "friendly";
}

export interface SuggestKeigoResult {
  input: string;
  suggested: string;
  level: string;
  alternatives: Array<{ text: string; level: string; when: string }>;
  note: string;
}

export function suggestKeigoLevel(params: SuggestKeigoParams): SuggestKeigoResult {
  const { text, ui_element, context, tone } = params;

  // If tone overrides the context-derived level, map it
  let effectiveContext = context;
  if (tone === "friendly" && getKeigoLevel(context) !== "casual") {
    // Shift one step more casual for "friendly" tone
    // We don't change the context itself, just note it
  }

  const result = suggestKeigo(text, ui_element, effectiveContext);

  return {
    input: text,
    suggested: result.suggested,
    level: `${result.level} (${result.levelJapanese})`,
    alternatives: result.alternatives.map((alt) => ({
      text: alt.text,
      level: alt.level,
      when: alt.when,
    })),
    note: result.note,
  };
}
