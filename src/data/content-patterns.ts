export type ContentCategory = "density" | "copy" | "product" | "structure" | "localization";
export type SiteType =
  | "ecommerce"
  | "b2b_saas"
  | "corporate"
  | "media"
  | "government"
  | "consumer_app"
  | "landing_page"
  | "service_site"
  | "portfolio"
  | "recruitment";

export interface ContentRule {
  id: string;
  category: ContentCategory;
  rule: string;
  details: string;
  context: SiteType[];
}

export const CONTENT_RULES: ContentRule[] = [
  // ─── Density ───────────────────────────────────────────────────────
  {
    id: "content_more_text_trusted",
    category: "density",
    rule: "More text is always better for Japanese consumers",
    details:
      "Japanese users associate comprehensive text with trustworthiness and professionalism. A sparse, minimalist product page feels suspicious—like the company is hiding something. Long-form product descriptions, detailed specifications, exhaustive FAQ sections, and thorough explanations all signal credibility. This is the opposite of the Western 'less is more' design philosophy. Do not cut copy for brevity—add more detail instead.",
    context: ["ecommerce", "b2b_saas", "corporate", "service_site", "landing_page"],
  },
  {
    id: "content_info_density_trusted",
    category: "density",
    rule: "Information density is trusted, not overwhelming",
    details:
      "Japanese web design embraces information density. Pages like Rakuten Ichiba, Yahoo! Japan, and Kakaku.com are content-rich by design, not by accident. Users perceive dense layouts as comprehensive and helpful. White space is valued for readability, but not at the cost of removing useful information. Every section of the page should serve content—avoid decorative empty areas that could hold product details, social proof, or navigation aids.",
    context: ["ecommerce", "media", "service_site", "landing_page"],
  },
  {
    id: "content_subheadings_scanning",
    category: "density",
    rule: "Sub-headings above every body text block for scanning",
    details:
      "Japanese users scan pages by reading sub-headings (見出し) before deciding whether to read the body text. Every content section must have a clear, descriptive heading. Do not write 'creative' or vague headings—write literal, descriptive ones. Sub-headings should summarize the section content completely enough that a user scanning only headings understands the page. Use visual hierarchy (font size, weight, color, background) to make headings instantly distinguishable from body text.",
    context: ["ecommerce", "b2b_saas", "corporate", "media", "service_site", "landing_page"],
  },
  {
    id: "content_numbered_steps",
    category: "density",
    rule: "Numbered step-by-step explanations preferred over free-form descriptions",
    details:
      "Japanese users strongly prefer numbered, sequential explanations over paragraph-style descriptions. Steps provide clarity, set expectations (user knows there are 3 steps, not infinite), and feel thorough. Use numbered steps for: how-to guides, onboarding flows, registration processes, return policies, troubleshooting guides, and feature explanations. Number every step explicitly—do not rely on bullet points or paragraph flow.",
    context: ["ecommerce", "b2b_saas", "corporate", "service_site", "landing_page", "consumer_app"],
  },

  // ─── Copy ──────────────────────────────────────────────────────────
  {
    id: "content_catchcopy",
    category: "copy",
    rule: "Catchcopy (キャッチコピー) headline on hero section is mandatory",
    details:
      "Every landing page, product page, and service page needs a キャッチコピー (catch copy)—a concise, impactful headline in the hero section. This is Japan's equivalent of a value proposition headline but more concise and emotionally resonant. It should be short (one line preferred), memorable, and convey the core benefit or emotional promise. Often written in a mix of kanji and hiragana for visual rhythm. Sub-copy (サブコピー) below it elaborates with one or two supporting sentences.",
    context: ["ecommerce", "b2b_saas", "corporate", "landing_page", "service_site"],
  },
  {
    id: "content_passive_browsing",
    category: "copy",
    rule: "Japanese users are passive browsers—guide them with osusume (recommended) lists",
    details:
      "Japanese online shoppers and service seekers tend to browse passively rather than actively searching with specific intent. They respond well to curated guidance: おすすめ (osusume/recommended) sections, ランキング (rankings), 人気 (popular items), スタッフおすすめ (staff picks), and 今週の注目 (this week's highlights). These editorial curation elements reduce decision paralysis and build trust through implied expert selection.",
    context: ["ecommerce", "media", "consumer_app", "service_site"],
  },
  {
    id: "content_high_context",
    category: "copy",
    rule: "High-context communication: meaning is layered, copy can be indirect",
    details:
      "Japan is a high-context culture (高コンテクスト文化). Copy does not need to state everything explicitly—implications, tone, and social context carry meaning. Indirect phrasing is often more persuasive than direct claims. Instead of 'We are the best', use phrases that let the reader draw that conclusion: '多くのお客様にご愛顧いただいております' (We are favored by many customers). Avoid aggressive Western-style direct selling copy. Suggest, hint, and let social proof speak.",
    context: ["ecommerce", "b2b_saas", "corporate", "landing_page", "service_site"],
  },
  {
    id: "content_reason_section",
    category: "copy",
    rule: "Include 'reason' sections: なぜ○○が選ばれるのか (why people choose us)",
    details:
      "A '選ばれる理由' (reasons we are chosen) or 'なぜ○○が選ばれるのか' section is a standard and expected content block on Japanese service, product, and B2B pages. It typically lists 3-5 numbered reasons with icons or illustrations. The framing is passive voice—'why we are chosen' rather than 'why you should choose us'—aligning with the high-context, non-aggressive selling style. Each reason should include a specific, concrete detail or number.",
    context: ["b2b_saas", "corporate", "landing_page", "service_site"],
  },
  {
    id: "content_before_after",
    category: "copy",
    rule: "Before/after comparisons with specific numbers",
    details:
      "Before/after (ビフォーアフター) comparisons are highly persuasive in Japanese marketing. They work for: time savings ('作業時間が1日3時間→30分に', work time reduced from 3 hours to 30 minutes per day), cost reduction, efficiency gains, quality improvements, and physical transformations. Always include specific numbers—vague claims like 'greatly improved' are not compelling. Present as a visual comparison with clear labels: 導入前 (before implementation) / 導入後 (after implementation).",
    context: ["b2b_saas", "landing_page", "service_site", "ecommerce"],
  },

  // ─── Product ───────────────────────────────────────────────────────
  {
    id: "content_complete_specs",
    category: "product",
    rule: "Complete product specifications required: every feature, ingredient, allergy note",
    details:
      "Japanese product pages must be exhaustively detailed. For food: every ingredient, allergy information (アレルギー表示 for 28 specified allergens), nutritional facts, origin of ingredients, expiry information, storage instructions, and manufacturer details. For electronics: every specification, compatibility, included accessories, dimensions, weight, and certifications. Omitting details erodes trust—users assume missing information means the product has deficiencies.",
    context: ["ecommerce"],
  },
  {
    id: "content_analytical_decisions",
    category: "product",
    rule: "Analytical decision-making: 'does this meet my needs?' not aspirational marketing",
    details:
      "Japanese consumers make purchasing decisions analytically, comparing specifications and details rather than responding to aspirational lifestyle marketing. Product pages should facilitate comparison: specification tables, feature lists with checkmarks, compatibility information, and detailed use-case descriptions. Users want to methodically verify that the product meets their specific requirements. Comparison tables (比較表) against competitors or between product tiers are expected and valued.",
    context: ["ecommerce", "b2b_saas", "service_site"],
  },
  {
    id: "content_product_photos",
    category: "product",
    rule: "Show photo of every item, variant, and angle",
    details:
      "Product pages must show photographs of every color variant, every size option, every included accessory, and multiple angles (front, back, side, detail shots, in-use shots). For apparel: show on a model AND flat-lay, show close-up of fabric texture, show size chart on a body diagram. For food: show the actual product (not just packaging), show serving suggestion, show size relative to a common object. Insufficient product photos are a top reason for cart abandonment in Japanese e-commerce.",
    context: ["ecommerce"],
  },
  {
    id: "content_faq_expected",
    category: "product",
    rule: "FAQ sections are expected and well-used",
    details:
      "よくある質問 (FAQ / Frequently Asked Questions) sections are standard on Japanese websites and are heavily used by Japanese consumers before making purchase decisions or contacting support. Place FAQ sections on product pages, service pages, and as a dedicated site section. Structure with accordion UI (question visible, answer expands on click). Cover: shipping, returns, payment methods, product details, sizing, compatibility, and account management. Japanese users will check the FAQ before contacting support—make it comprehensive.",
    context: ["ecommerce", "b2b_saas", "corporate", "service_site", "consumer_app"],
  },

  // ─── Structure ─────────────────────────────────────────────────────
  {
    id: "content_implementation_flow",
    category: "structure",
    rule: "導入の流れ (implementation flow) section for B2B",
    details:
      "B2B and service pages must include a '導入の流れ' (implementation flow) or 'ご利用の流れ' (usage flow) section. This is a step-by-step visual diagram showing the process from initial inquiry to full implementation. Typically 4-6 steps with icons, short titles, and brief descriptions. Steps often include: お問い合わせ (inquiry) → ヒアリング (hearing/consultation) → ご提案 (proposal) → ご契約 (contract) → 導入・設定 (implementation/setup) → 運用開始 (operation start). This reduces anxiety about the unknown process.",
    context: ["b2b_saas", "corporate", "service_site"],
  },
  {
    id: "content_pricing_comparison",
    category: "structure",
    rule: "料金プラン (pricing plan) comparison tables",
    details:
      "Pricing pages must use comparison tables (料金プラン比較表) showing all plan tiers side by side. Include: plan name, monthly and annual price (税込/税抜 clearly labeled), feature checklist for each tier, recommended plan highlighted (おすすめプラン), user/seat limits, storage limits, and support level. Japanese users expect tax-inclusive pricing (税込) displayed prominently—the Consumption Tax Act (消費税法) requires tax-inclusive display for B2C. For B2B, showing 税抜 (before tax) is acceptable but always clarify.",
    context: ["b2b_saas", "service_site", "landing_page"],
  },
  {
    id: "content_user_journey",
    category: "structure",
    rule: "User journey visualization (利用の流れ)",
    details:
      "Consumer-facing services should include a '利用の流れ' (usage flow) section showing how the service works from the user's perspective. This is similar to 導入の流れ but for end-users rather than business buyers. Typically 3-5 steps: アカウント作成 (create account) → プロフィール設定 (set up profile) → サービス利用開始 (start using service). Use illustrations or icons for each step. Number each step clearly. This hand-holding approach reduces friction for first-time users.",
    context: ["consumer_app", "service_site", "landing_page", "ecommerce"],
  },

  // ─── Localization ──────────────────────────────────────────────────
  {
    id: "content_english_spelling_verify",
    category: "localization",
    rule: "English spelling must be verified by copy-paste from dictionary, never from memory",
    details:
      "When including English text on Japanese websites (product names, feature labels, navigation terms, taglines), always verify spelling by copying from an authoritative source. Japanese designers and copywriters commonly introduce subtle English spelling errors that native English speakers immediately notice, damaging brand credibility especially for international or premium-positioned brands. Common errors: 'infomation' (information), 'Contanct' (Contact), 'Shedule' (Schedule).",
    context: ["ecommerce", "b2b_saas", "corporate", "landing_page", "service_site", "consumer_app", "portfolio", "recruitment"],
  },
  {
    id: "content_proper_nouns",
    category: "localization",
    rule: "Double-check all proper nouns",
    details:
      "Proper nouns (company names, product names, place names, personal names) must be verified for correct spelling and stylization. Check official sources for: capitalization (iPhone not Iphone, PayPay not Paypay), spacing (App Store not AppStore), special characters (Yahoo! with exclamation mark), and Japanese rendering (official katakana for foreign brand names). Incorrect proper nouns signal carelessness and can cause legal issues with trademarked names.",
    context: ["ecommerce", "b2b_saas", "corporate", "landing_page", "service_site", "media", "consumer_app"],
  },
  {
    id: "content_no_engrish",
    category: "localization",
    rule: "Verify English text does not contain 'Engrish'",
    details:
      "Engrish refers to unnatural or incorrect English commonly found on Japanese products and websites. It includes grammatical errors, unnatural phrasing, and direct translations from Japanese that don't work in English. Examples: 'Let's enjoy shopping!' (unnatural), 'We will do our best effort' (grammatical), 'High quality and safety' (missing article). For any user-facing English text, have it reviewed by a native English speaker. For Japanese-only sites, decorative English is fine—but if English text is meant to be read, it must be correct.",
    context: ["ecommerce", "b2b_saas", "corporate", "landing_page", "service_site", "consumer_app", "portfolio", "recruitment"],
  },
];
