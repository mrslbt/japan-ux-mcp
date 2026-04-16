import type { Context } from "../data/keigo-patterns.js";

interface AuditIssue {
  category: string;
  severity: "critical" | "major" | "minor" | "info";
  rule_id: string;
  finding: string;
  recommendation: string;
}

interface AuditCategoryResult {
  score: number;
  issues: AuditIssue[];
  passed: string[];
}

export interface AuditParams {
  markup: string;
  css?: string;
  url_description?: string;
  site_type: "corporate" | "ecommerce" | "b2b_saas" | "lp" | "media" | "government";
  target_audience?: string;
}

export interface AuditResult {
  overall_score: number;
  grade: string;
  summary: string;
  categories: {
    layout: AuditCategoryResult;
    typography: AuditCategoryResult;
    visual: AuditCategoryResult;
    navigation: AuditCategoryResult;
    trust: AuditCategoryResult;
    content: AuditCategoryResult;
    mobile: AuditCategoryResult;
  };
  top_fixes: Array<{
    priority: number;
    category: string;
    fix: string;
    impact: string;
  }>;
  japan_specific_strengths: string[];
}

export function auditJapanUx(params: AuditParams): AuditResult {
  const { markup, css = "", url_description = "", site_type } = params;
  const lower = markup.toLowerCase();
  const cssLower = css.toLowerCase();
  const combined = lower + " " + cssLower;
  const desc = url_description.toLowerCase();

  // ── Layout audit ──
  const layoutIssues: AuditIssue[] = [];
  const layoutPassed: string[] = [];
  let layoutScore = 100;

  // Check for information density signals
  const hasMultipleSections = (lower.match(/<section|<article|class=["'][^"']*section/g) || []).length;
  if (hasMultipleSections >= 3) {
    layoutPassed.push("Multiple content sections detected (good density)");
  } else if (hasMultipleSections < 2) {
    layoutIssues.push({
      category: "layout",
      severity: "major",
      rule_id: "density_expected",
      finding: "Sparse layout with few content sections. Japanese users expect information density.",
      recommendation: "Add more content sections. Japanese audiences trust dense, thorough layouts over minimal ones.",
    });
    layoutScore -= 15;
  }

  // Check for breadcrumbs
  if (/breadcrumb|パンくず|aria-label=["']?breadcrumb/i.test(lower)) {
    layoutPassed.push("Breadcrumb navigation present");
  } else {
    layoutIssues.push({
      category: "layout",
      severity: "minor",
      rule_id: "structure_breadcrumbs",
      finding: "No breadcrumb navigation detected.",
      recommendation: "Add パンくずリスト (breadcrumbs) below the header on interior pages.",
    });
    layoutScore -= 5;
  }

  // Check for CTA repetition
  const ctaCount = (lower.match(/お問い合わせ|資料請求|無料相談|contact|inquiry|cta/g) || []).length;
  if (ctaCount >= 2) {
    layoutPassed.push("CTA appears multiple times (good for conversion)");
  } else if (site_type === "lp" || site_type === "b2b_saas") {
    layoutIssues.push({
      category: "layout",
      severity: "minor",
      rule_id: "structure_cta_repetition",
      finding: "CTA appears only once. Japanese LPs repeat CTAs at multiple scroll points.",
      recommendation: "Place CTA after the hero, mid-page, and before the footer.",
    });
    layoutScore -= 5;
  }

  // Check for news/updates section (corporate)
  if (site_type === "corporate" || site_type === "government") {
    if (/お知らせ|ニュース|news|what.*new|更新情報/i.test(lower)) {
      layoutPassed.push("News/updates section present (お知らせ)");
    } else {
      layoutIssues.push({
        category: "layout",
        severity: "major",
        rule_id: "structure_news_list",
        finding: "No お知らせ (news/updates) section on corporate page.",
        recommendation: "Add a date-stamped news list. Empty or missing news sections signal a neglected company.",
      });
      layoutScore -= 10;
    }
  }

  layoutScore = Math.max(0, layoutScore);

  // ── Typography audit ──
  const typoIssues: AuditIssue[] = [];
  const typoPassed: string[] = [];
  let typoScore = 100;

  // Check for italics
  if (/font-style\s*:\s*italic/i.test(combined)) {
    typoIssues.push({
      category: "typography",
      severity: "critical",
      rule_id: "hierarchy_no_italics",
      finding: "font-style: italic applied to content. Japanese has no native italic form.",
      recommendation: "Remove italics. Use bold, color, or size for emphasis in Japanese text.",
    });
    typoScore -= 15;
  } else {
    typoPassed.push("No italics applied to Japanese text");
  }

  // Check line-height
  const lhMatch = combined.match(/line-height\s*:\s*([0-9.]+)/);
  if (lhMatch && parseFloat(lhMatch[1]) < 1.7) {
    typoIssues.push({
      category: "typography",
      severity: "critical",
      rule_id: "line_height_body",
      finding: `Line-height ${lhMatch[1]} is too tight for Japanese. Minimum is 1.8.`,
      recommendation: "Increase line-height to 1.8-2.0 for Japanese body text.",
    });
    typoScore -= 15;
  } else if (lhMatch && parseFloat(lhMatch[1]) >= 1.8) {
    typoPassed.push("Line-height meets Japanese standard");
  }

  // Check font stack
  if (/font-family/i.test(combined)) {
    if (/noto|hiragino|yu\s*gothic|meiryo|sans-jp|zen.*gothic|m\s*plus/i.test(combined)) {
      typoPassed.push("Japanese font specified in font-family");
    } else {
      typoIssues.push({
        category: "typography",
        severity: "major",
        rule_id: "font_stack_system",
        finding: "No Japanese font in font-family stack.",
        recommendation: 'Add "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif to font-family.',
      });
      typoScore -= 10;
    }
  }

  // Check word-break
  if (/word-break\s*:\s*keep-all/i.test(combined)) {
    typoPassed.push("word-break: keep-all enabled (kinsoku shori)");
  } else {
    typoIssues.push({
      category: "typography",
      severity: "major",
      rule_id: "wrapping_kinsoku",
      finding: "word-break: keep-all not found. Japanese text may break at illegal positions.",
      recommendation: "Add word-break: keep-all to text containers.",
    });
    typoScore -= 10;
  }

  typoScore = Math.max(0, typoScore);

  // ── Visual audit ──
  const visualIssues: AuditIssue[] = [];
  const visualPassed: string[] = [];
  let visualScore = 100;

  // Check for names in red text (look for red styling on elements that contain name-related attributes or text)
  const redNamePattern = /(?:color\s*:\s*(?:red|#[fF][0-9a-fA-F]0{4}|#[eE][0-9a-fA-F]{5}|rgb\(2[0-5][0-9]\s*,\s*[0-3]))[^}]*(?:name|名前|氏名)|(?:name|名前|氏名)[^}]*(?:color\s*:\s*(?:red|#[fF][0-9a-fA-F]0{4}|#[eE][0-9a-fA-F]{5}|rgb\(2[0-5][0-9]\s*,\s*[0-3]))/i;
  if (redNamePattern.test(combined)) {
    visualIssues.push({
      category: "visual",
      severity: "critical",
      rule_id: "color_no_red_names",
      finding: "Red text color on name-related content. Writing names in red = death association in Japan.",
      recommendation: "Use black or dark gray for all personal name text.",
    });
    visualScore -= 20;
  }

  // Check for manga/illustration (positive signal for Japanese sites)
  if (/mascot|character|キャラ|illust|manga|イラスト/i.test(lower)) {
    visualPassed.push("Character/illustration usage detected (builds approachability)");
  }

  // Dark theme warning
  if (/dark-mode|dark-theme|prefers-color-scheme:\s*dark/i.test(combined)) {
    visualIssues.push({
      category: "visual",
      severity: "info",
      rule_id: "color_dark_theme_lag",
      finding: "Dark theme detected. Dark mode adoption is 2-3 years behind in Japan.",
      recommendation: "Keep light theme as default. Offer dark mode as opt-in only.",
    });
    visualScore -= 3;
  }

  visualScore = Math.max(0, visualScore);

  // ── Navigation audit ──
  const navIssues: AuditIssue[] = [];
  const navPassed: string[] = [];
  let navScore = 100;

  // Check for visible phone number
  if (/tel:|phone|電話|☎/i.test(lower)) {
    navPassed.push("Phone number present");
  } else {
    navIssues.push({
      category: "navigation",
      severity: "major",
      rule_id: "header_phone_number",
      finding: "No phone number detected. Japanese users expect a visible phone number for trust.",
      recommendation: "Add phone number to header with clickable tel: link on mobile.",
    });
    navScore -= 15;
  }

  // Check for hamburger on non-mobile context
  if (/hamburger|menu-toggle|☰/i.test(lower) && !/media.*max-width|@media.*mobile|responsive/i.test(combined)) {
    navIssues.push({
      category: "navigation",
      severity: "minor",
      rule_id: "menu_hamburger_mobile_only",
      finding: "Hamburger menu may be visible on PC. Japanese PC users expect visible navigation links.",
      recommendation: "Show full horizontal navigation on PC. Reserve hamburger for mobile only.",
    });
    navScore -= 5;
  }

  // Check for back-to-top
  if (/back.*top|page.*top|scroll.*top|ページトップ|▲.*top/i.test(lower)) {
    navPassed.push("Back-to-top button present");
  } else {
    navIssues.push({
      category: "navigation",
      severity: "minor",
      rule_id: "breadcrumb_back_to_top",
      finding: "No 'back to top' button. Standard on long-scroll Japanese pages.",
      recommendation: "Add a fixed ページトップへ戻る button in the bottom-right corner.",
    });
    navScore -= 3;
  }

  // Check footer completeness
  const footerChecks = [
    { pattern: /copyright|©|\(c\)/i, name: "Copyright notice" },
    { pattern: /プライバシー|privacy|個人情報/i, name: "Privacy policy link" },
    { pattern: /会社概要|company.*info|about/i, name: "Company information" },
  ];
  for (const check of footerChecks) {
    if (check.pattern.test(lower)) {
      navPassed.push(`${check.name} found`);
    } else {
      navIssues.push({
        category: "navigation",
        severity: "major",
        rule_id: "footer_required_links",
        finding: `Missing ${check.name} in page.`,
        recommendation: `Add ${check.name} to footer. Required for Japanese site credibility.`,
      });
      navScore -= 8;
    }
  }

  // Tokushoho check for ecommerce
  if (site_type === "ecommerce" && !/特定商取引/i.test(lower)) {
    navIssues.push({
      category: "navigation",
      severity: "critical",
      rule_id: "footer_required_links",
      finding: "Missing 特定商取引法に基づく表記 link. Legally required for all ecommerce in Japan.",
      recommendation: "Add 特定商取引法に基づく表記 link to footer. This is a legal requirement.",
    });
    navScore -= 20;
  }

  navScore = Math.max(0, navScore);

  // ── Trust audit ──
  const trustIssues: AuditIssue[] = [];
  const trustPassed: string[] = [];
  let trustScore = 100;

  // Company info presence
  if (/会社概要|company.*overview|about.*company/i.test(lower)) {
    trustPassed.push("Company overview section present");
  } else if (site_type !== "lp") {
    trustIssues.push({
      category: "trust",
      severity: "major",
      rule_id: "trust_missing_info_suspicion",
      finding: "No company overview (会社概要). Japan's uncertainty avoidance (score: 92) makes this critical.",
      recommendation: "Add 会社概要 with: company name, representative, address, founding date, capital, employees.",
    });
    trustScore -= 15;
  }

  // Social proof
  if (/導入事例|case.*stud|お客様の声|testimonial|review/i.test(lower)) {
    trustPassed.push("Social proof (case studies or testimonials) present");
  } else if (site_type === "b2b_saas" || site_type === "corporate") {
    trustIssues.push({
      category: "trust",
      severity: "major",
      rule_id: "trust_case_studies",
      finding: "No case studies (導入事例) or testimonials (お客様の声) detected.",
      recommendation: "Add named case studies with company, person, challenge, and result.",
    });
    trustScore -= 15;
  }

  // Customer logos
  if (/logo.*client|client.*logo|導入企業|partner|customer.*logo/i.test(lower)) {
    trustPassed.push("Customer logo section present");
  } else if (site_type === "b2b_saas") {
    trustIssues.push({
      category: "trust",
      severity: "minor",
      rule_id: "trust_customer_logos",
      finding: "No customer logo section. B2B buyers look for recognizable client logos.",
      recommendation: "Add a 導入企業 (customer logos) grid with 6+ logos.",
    });
    trustScore -= 8;
  }

  // Proof numbers
  if (/\d{1,3}(,\d{3})*\s*(社|件|名|万|人|%)/i.test(markup)) {
    trustPassed.push("Specific proof numbers present (builds credibility)");
  } else {
    trustIssues.push({
      category: "trust",
      severity: "minor",
      rule_id: "trust_proof_numbers_hero",
      finding: "No specific proof numbers (e.g., 1,247社, 業務効率30%改善).",
      recommendation: "Add concrete numbers near the hero: customer count, improvement metrics, years in business.",
    });
    trustScore -= 5;
  }

  trustScore = Math.max(0, trustScore);

  // ── Content audit ──
  const contentIssues: AuditIssue[] = [];
  const contentPassed: string[] = [];
  let contentScore = 100;

  // Japanese text presence
  if (/[\u3000-\u9fff\uff00-\uffef]/.test(markup)) {
    contentPassed.push("Japanese text present");
  } else {
    contentIssues.push({
      category: "content",
      severity: "critical",
      rule_id: "content_japanese_text",
      finding: "No Japanese text detected. The page appears entirely in English.",
      recommendation: "All user-facing text should be in Japanese for a Japanese audience.",
    });
    contentScore -= 30;
  }

  // FAQ section
  if (/faq|よくある質問|q&a|質問/i.test(lower)) {
    contentPassed.push("FAQ section present (よくある質問)");
  } else if (site_type === "b2b_saas" || site_type === "ecommerce") {
    contentIssues.push({
      category: "content",
      severity: "minor",
      rule_id: "content_faq",
      finding: "No FAQ (よくある質問) section. Japanese users expect and heavily use FAQ sections.",
      recommendation: "Add a よくある質問 section with common questions and detailed answers.",
    });
    contentScore -= 5;
  }

  // Pricing table for B2B
  if (site_type === "b2b_saas") {
    if (/料金|pricing|plan|プラン/i.test(lower)) {
      contentPassed.push("Pricing/plan information present");
    } else {
      contentIssues.push({
        category: "content",
        severity: "major",
        rule_id: "content_pricing",
        finding: "No pricing plan (料金プラン) section detected for B2B SaaS.",
        recommendation: "Add a 料金プラン comparison table. Japanese B2B buyers want transparent pricing.",
      });
      contentScore -= 10;
    }
  }

  // Implementation flow for B2B
  if (site_type === "b2b_saas" || site_type === "corporate") {
    if (/導入の流れ|implementation.*flow|ご利用.*流れ|step.*1|ステップ/i.test(lower)) {
      contentPassed.push("Implementation flow (導入の流れ) present");
    } else {
      contentIssues.push({
        category: "content",
        severity: "minor",
        rule_id: "content_flow",
        finding: "No 導入の流れ (implementation flow) section.",
        recommendation: "Add a numbered step-by-step implementation flow diagram.",
      });
      contentScore -= 5;
    }
  }

  contentScore = Math.max(0, contentScore);

  // ── Mobile audit ──
  const mobileIssues: AuditIssue[] = [];
  const mobilePassed: string[] = [];
  let mobileScore = 100;

  // Viewport meta
  if (/viewport/i.test(lower)) {
    mobilePassed.push("Viewport meta tag present");
  } else {
    mobileIssues.push({
      category: "mobile",
      severity: "critical",
      rule_id: "mobile_viewport",
      finding: "No viewport meta tag detected.",
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
    });
    mobileScore -= 20;
  }

  // tel: links
  if (/href=["']?tel:/i.test(lower)) {
    mobilePassed.push("Clickable tel: link for mobile");
  } else if (/phone|電話|tel/i.test(lower)) {
    mobileIssues.push({
      category: "mobile",
      severity: "minor",
      rule_id: "mobile_tel_link",
      finding: "Phone number present but no clickable tel: link for mobile.",
      recommendation: "Wrap phone numbers in <a href=\"tel:+81XXXXXXXXXX\"> for mobile tap-to-call.",
    });
    mobileScore -= 5;
  }

  // Touch target size check
  const smallTargets = combined.match(/width\s*:\s*(\d+)px.*height\s*:\s*(\d+)px/g);
  if (smallTargets) {
    for (const target of smallTargets) {
      const dims = target.match(/(\d+)px/g);
      if (dims && dims.length >= 2) {
        const w = parseInt(dims[0]);
        const h = parseInt(dims[1]);
        if (w > 0 && h > 0 && (w < 44 || h < 44)) {
          mobileIssues.push({
            category: "mobile",
            severity: "minor",
            rule_id: "mobile_touch_targets",
            finding: `Small touch target detected (${w}x${h}px). Minimum 44x44px, especially for Japan's aging population.`,
            recommendation: "Increase touch targets to at least 44x44px.",
          });
          mobileScore -= 5;
          break;
        }
      }
    }
  }

  mobileScore = Math.max(0, mobileScore);

  // ── Overall score ──
  const weights = {
    layout: 0.15,
    typography: 0.15,
    visual: 0.10,
    navigation: 0.15,
    trust: 0.20,
    content: 0.15,
    mobile: 0.10,
  };

  const overallScore = Math.round(
    layoutScore * weights.layout +
    typoScore * weights.typography +
    visualScore * weights.visual +
    navScore * weights.navigation +
    trustScore * weights.trust +
    contentScore * weights.content +
    mobileScore * weights.mobile
  );

  // Grade
  let grade: string;
  if (overallScore >= 90) grade = "A";
  else if (overallScore >= 80) grade = "B";
  else if (overallScore >= 70) grade = "C";
  else if (overallScore >= 60) grade = "D";
  else grade = "F";

  // Summary
  let summary: string;
  if (overallScore >= 85) {
    summary = "Strong Japan-readiness. This site follows most Japanese UX conventions. Minor polish would round out the experience.";
  } else if (overallScore >= 70) {
    summary = "Solid foundation with gaps. Japanese users would find most patterns familiar, but missing elements (trust signals, typography, content depth) would stand out.";
  } else if (overallScore >= 50) {
    summary = "Noticeable gaps in Japanese UX conventions. The site reads as a localization rather than a Japan-native experience. Several categories need attention.";
  } else {
    summary = "This site does not follow Japanese web conventions. It would feel foreign to Japanese users and likely underperform in the market.";
  }

  // Collect all issues and rank by severity for top fixes
  const allIssues = [
    ...layoutIssues, ...typoIssues, ...visualIssues,
    ...navIssues, ...trustIssues, ...contentIssues, ...mobileIssues,
  ];

  const severityOrder = { critical: 0, major: 1, minor: 2, info: 3 };
  allIssues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  const topFixes = allIssues.slice(0, 7).map((issue, i) => ({
    priority: i + 1,
    category: issue.category,
    fix: issue.recommendation,
    impact: issue.severity === "critical" ? "High" : issue.severity === "major" ? "Medium" : "Low",
  }));

  // Japan-specific strengths
  const strengths: string[] = [];
  for (const cat of [layoutPassed, typoPassed, visualPassed, navPassed, trustPassed, contentPassed, mobilePassed]) {
    strengths.push(...cat);
  }

  return {
    overall_score: overallScore,
    grade,
    summary,
    categories: {
      layout: { score: layoutScore, issues: layoutIssues, passed: layoutPassed },
      typography: { score: typoScore, issues: typoIssues, passed: typoPassed },
      visual: { score: visualScore, issues: visualIssues, passed: visualPassed },
      navigation: { score: navScore, issues: navIssues, passed: navPassed },
      trust: { score: trustScore, issues: trustIssues, passed: trustPassed },
      content: { score: contentScore, issues: contentIssues, passed: contentPassed },
      mobile: { score: mobileScore, issues: mobileIssues, passed: mobilePassed },
    },
    top_fixes: topFixes,
    japan_specific_strengths: strengths,
  };
}
