import type { Context } from "../data/keigo-patterns.js";

interface CategoryScore {
  score: number;
  issues: string[];
  quick_wins: string[];
}

interface PriorityFix {
  fix: string;
  impact: string;
  effort: "low" | "medium" | "high";
}

export interface ScoreParams {
  markup: string;
  description?: string;
  context: Context;
  include_suggestions: boolean;
}

export interface ScoreResult {
  japan_readiness_score: number;
  verdict: string;
  breakdown: {
    forms: CategoryScore;
    copy: CategoryScore;
    trust: CategoryScore;
    typography: CategoryScore;
    cultural: CategoryScore;
  };
  priority_fixes: PriorityFix[];
}

function hasPersonalNameField(markup: string): boolean {
  return (
    /name=["']?(?:name|full.?name|first.?name|firstname|first_name|given.?name|last.?name|lastname|last_name|family.?name|surname|sei|mei)\b/i.test(markup)
    || /(?:お名前|氏名)(?!順)/.test(markup)
  );
}

function hasFuriganaField(markup: string): boolean {
  return (
    /name=["']?(?:sei_kana|mei_kana|furigana|kana)\b/i.test(markup)
    || /フリガナ|ふりがな/.test(markup)
  );
}

export function scoreJapanReadiness(params: ScoreParams): ScoreResult {
  const { markup, description, context, include_suggestions } = params;
  const lower = markup.toLowerCase();
  const desc = (description || "").toLowerCase();

  // ===== Forms =====
  const formsIssues: string[] = [];
  const formsWins: string[] = [];
  let formsScore = 100;

  if (/first.?name|firstname|last.?name|lastname/i.test(markup)) {
    formsIssues.push("Western name order (first/last instead of 姓/名)");
    formsWins.push("Reverse name fields to 姓→名");
    formsScore -= 25;
  }
  if (/name=["']?name["']?/i.test(markup) && !/name=["']?sei/i.test(markup)) {
    formsIssues.push("Single name field (should split to 姓/名)");
    formsWins.push("Split name into 姓 and 名 fields");
    formsScore -= 25;
  }
  if (hasPersonalNameField(markup) && !hasFuriganaField(markup)) {
    formsIssues.push("No furigana fields");
    formsWins.push("Add furigana row (セイ / メイ)");
    formsScore -= 20;
  }
  const phoneCount = (lower.match(/name=["']?phone/g) || []).length;
  if (phoneCount === 1) {
    formsIssues.push("Single phone field (should be 3 separate fields)");
    formsWins.push("Split phone into 3 fields (XXX-XXXX-XXXX)");
    formsScore -= 15;
  }
  if (/address|住所/i.test(lower) && !/postal|zip|郵便|〒/i.test(lower)) {
    formsIssues.push("No postal code auto-fill");
    formsWins.push("Add 〒 postal code with address auto-fill");
    formsScore -= 15;
  }
  formsScore = Math.max(0, formsScore);

  // ===== Copy =====
  const copyIssues: string[] = [];
  const copyWins: string[] = [];
  let copyScore = 100;

  const englishButtons = markup.match(/<button[^>]*>(submit|send|register|sign up|next|save|cancel|delete|confirm)/gi);
  if (englishButtons && englishButtons.length > 0) {
    copyIssues.push("English button text — no Japanese labels");
    copyWins.push("Translate buttons with appropriate keigo");
    copyScore -= 25;
  }
  if (/invalid|error occurred|wrong|incorrect|failed/i.test(markup)) {
    copyIssues.push("Error messages too blunt — no constructive guidance");
    copyWins.push("Add polite guidance to error messages (e.g. 正しい○○をご入力ください)");
    copyScore -= 15;
  }
  // Check for Japanese text presence
  const hasJapanese = /[\u3000-\u9fff\uff00-\uffef]/.test(markup);
  if (!hasJapanese) {
    copyIssues.push("No Japanese text detected — entirely Western content");
    copyScore -= 30;
  }
  // Check placeholder text
  if (/placeholder=["']?(john|jane|smith|doe|123 main|new york)/i.test(markup)) {
    copyIssues.push("Western placeholder data (John Smith, 123 Main St) — use Japanese examples");
    copyWins.push("Replace with Japanese placeholders (田中太郎, 東京都渋谷区...)");
    copyScore -= 10;
  }
  copyScore = Math.max(0, copyScore);

  // ===== Trust =====
  const trustIssues: string[] = [];
  const trustWins: string[] = [];
  let trustScore = 100;

  const isEcommerce = /ecommerce|checkout|cart|shop/.test(context + " " + desc);
  if (isEcommerce && !/特定商取引/i.test(markup)) {
    trustIssues.push("No 特定商取引法 (commercial transaction law) disclosure");
    trustWins.push("Add 特定商取引法に基づく表記 link to footer");
    trustScore -= 25;
  }
  if (!/tel:|phone|電話|☎/i.test(lower) && !/href=["']?tel:/i.test(lower)) {
    trustIssues.push("No phone number visible — Japanese users expect this for trust");
    trustWins.push("Add phone number to header");
    trustScore -= 20;
  }
  if (!/会社概要|company.?info|about.?us|運営会社/i.test(lower)) {
    trustIssues.push("No company information visible");
    trustWins.push("Add 会社概要 (company overview) link");
    trustScore -= 15;
  }
  if (!/プライバシー|privacy|個人情報/i.test(lower)) {
    trustIssues.push("No privacy policy link visible");
    trustWins.push("Add 個人情報保護方針 link");
    trustScore -= 10;
  }
  trustScore = Math.max(0, trustScore);

  // ===== Typography =====
  const typoIssues: string[] = [];
  const typoWins: string[] = [];
  let typoScore = 100;

  const lineHeightMatch = markup.match(/line-height:\s*([0-9.]+)/);
  if (lineHeightMatch && parseFloat(lineHeightMatch[1]) < 1.7) {
    typoIssues.push(`Line-height ${lineHeightMatch[1]} too tight for Japanese body text`);
    typoWins.push("Increase to 1.8 for Japanese text readability");
    typoScore -= 20;
  }
  const fontSizeMatch = markup.match(/font-size:\s*(\d+)px/);
  if (fontSizeMatch && parseInt(fontSizeMatch[1]) < 14) {
    typoIssues.push(`Font size ${fontSizeMatch[1]}px too small for kanji readability`);
    typoWins.push("Increase body text to 16px");
    typoScore -= 20;
  }
  if (/font-family/i.test(lower) && !/noto|hiragino|yu\s*gothic|meiryo|メイリオ|游ゴシック|sans-jp/i.test(lower)) {
    typoIssues.push("No Japanese font specified in font stack");
    typoWins.push('Add "Noto Sans JP" or "Hiragino Sans" to font-family');
    typoScore -= 15;
  }
  typoScore = Math.max(0, typoScore);

  // ===== Cultural =====
  const culturalIssues: string[] = [];
  const culturalWins: string[] = [];
  let culturalScore = 100;

  if (!/季節|season|春|夏|秋|冬|桜|sakura|紅葉|新緑/i.test(lower)) {
    culturalIssues.push("No seasonal awareness in design");
    culturalWins.push("Add seasonal accent color or imagery");
    culturalScore -= 15;
  }
  if (/stock.?photo|unsplash|pexels|istock/i.test(lower)) {
    culturalIssues.push("Generic stock imagery detected — may not resonate with Japanese audience");
    culturalWins.push("Use Japan-specific photography or illustrations");
    culturalScore -= 10;
  }
  if (isEcommerce && !/のし|gift.?wrap|ギフト|贈答/i.test(lower)) {
    culturalIssues.push("E-commerce without gift-wrapping (のし/贈答) options");
    culturalWins.push("Add gift-wrapping options with のし selector for Japanese gift-giving culture");
    culturalScore -= 10;
  }
  culturalScore = Math.max(0, culturalScore);

  // ===== Overall score =====
  const weights = { forms: 0.3, copy: 0.25, trust: 0.2, typography: 0.15, cultural: 0.1 };
  const overallScore = Math.round(
    formsScore * weights.forms +
    copyScore * weights.copy +
    trustScore * weights.trust +
    typoScore * weights.typography +
    culturalScore * weights.cultural
  );

  // Verdict
  let verdict: string;
  if (overallScore >= 80) {
    verdict = "Good Japan-readiness. Minor refinements would polish the experience further.";
  } else if (overallScore >= 60) {
    verdict = "Decent foundation but notable gaps in Japanese UX conventions. Several fixes needed before launch.";
  } else if (overallScore >= 40) {
    verdict = "Significant issues. Japanese users would notice this was built without local UX knowledge.";
  } else {
    verdict = "This site would feel foreign to Japanese users. Critical fixes needed in forms and trust signals.";
  }

  // Priority fixes
  const allFixes = [
    ...formsIssues.map((f) => ({ fix: f, cat: "forms" as const })),
    ...copyIssues.map((f) => ({ fix: f, cat: "copy" as const })),
    ...trustIssues.map((f) => ({ fix: f, cat: "trust" as const })),
    ...typoIssues.map((f) => ({ fix: f, cat: "typography" as const })),
    ...culturalIssues.map((f) => ({ fix: f, cat: "cultural" as const })),
  ];

  const impactMap: Record<string, { impact: string; effort: "low" | "medium" | "high" }> = {
    forms: { impact: "+10-15 points", effort: "low" },
    copy: { impact: "+8-12 points", effort: "medium" },
    trust: { impact: "+10 points", effort: "medium" },
    typography: { impact: "+5-8 points", effort: "low" },
    cultural: { impact: "+3-5 points", effort: "medium" },
  };

  const priorityFixes: PriorityFix[] = include_suggestions
    ? allFixes.slice(0, 5).map((item) => ({
        fix: item.fix,
        ...impactMap[item.cat],
      }))
    : [];

  return {
    japan_readiness_score: overallScore,
    verdict,
    breakdown: {
      forms: { score: formsScore, issues: formsIssues, quick_wins: formsWins },
      copy: { score: copyScore, issues: copyIssues, quick_wins: copyWins },
      trust: { score: trustScore, issues: trustIssues, quick_wins: trustWins },
      typography: { score: typoScore, issues: typoIssues, quick_wins: typoWins },
      cultural: { score: culturalScore, issues: culturalIssues, quick_wins: culturalWins },
    },
    priority_fixes: priorityFixes,
  };
}
