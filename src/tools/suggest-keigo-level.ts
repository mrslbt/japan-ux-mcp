import {
  suggestKeigo,
  getKeigoLevel,
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

  // Tone can shift the keigo level up or down from the context default
  let effectiveContext = context;
  if (tone) {
    const levelOrder: KeigoLevel[] = ["casual", "neutral", "formal", "very_formal"];
    const currentLevel = getKeigoLevel(context);
    const currentIdx = levelOrder.indexOf(currentLevel);
    if (tone === "friendly" && currentIdx > 0) {
      // Map to a context that produces one level more casual
      const targetLevel = levelOrder[currentIdx - 1];
      const contextForLevel = Object.entries({ youth_app: "casual", consumer_app: "neutral", b2b_saas: "formal", government: "very_formal" } as Record<string, KeigoLevel>);
      const match = contextForLevel.find(([, v]) => v === targetLevel);
      if (match) effectiveContext = match[0] as Context;
    } else if (tone === "formal" && currentIdx < levelOrder.length - 1) {
      const targetLevel = levelOrder[currentIdx + 1];
      const contextForLevel = Object.entries({ youth_app: "casual", consumer_app: "neutral", b2b_saas: "formal", government: "very_formal" } as Record<string, KeigoLevel>);
      const match = contextForLevel.find(([, v]) => v === targetLevel);
      if (match) effectiveContext = match[0] as Context;
    }
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
