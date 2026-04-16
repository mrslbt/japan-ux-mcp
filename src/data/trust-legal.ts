// =============================================================================
// Trust Signals & Legal Requirements for Japanese Web/UX
// =============================================================================
// Japan scores 89 on Hofstede's Uncertainty Avoidance Index — the highest of
// any major market. Missing company info, absent legal pages, or unverifiable
// claims trigger immediate suspicion. This file codifies every trust and legal
// element a site targeting Japan needs.
// =============================================================================

export type TrustCategory =
  | "company_info"
  | "legal"
  | "social_proof"
  | "certification"
  | "contact";

export type BusinessContext =
  | "b2b"
  | "b2c"
  | "ecommerce"
  | "corporate"
  | "all";

export type Severity = "required" | "recommended" | "nice_to_have";

export interface TrustSignal {
  id: string;
  category: TrustCategory;
  requirement: string;
  details: string;
  context: BusinessContext[];
  severity: Severity;
}

export interface LegalRequirement {
  id: string;
  law_name_ja: string;
  law_name_en: string;
  applies_to: string;
  what_to_display: string;
  details: string;
}

// ---------------------------------------------------------------------------
// Trust Signals
// ---------------------------------------------------------------------------

export const TRUST_SIGNALS: TrustSignal[] = [
  // ── Company Information ──────────────────────────────────────────────
  {
    id: "trust_registered_address",
    category: "company_info",
    requirement: "Registered company address (本店所在地)",
    details:
      "Display the full registered address on the company profile page. Japanese users routinely verify addresses via the National Tax Agency corporate database (法人番号公表サイト). A prestigious Tokyo address (Chiyoda-ku, Minato-ku, Shibuya-ku) signals credibility; a residential address or virtual office raises flags.",
    context: ["all"],
    severity: "required",
  },
  {
    id: "trust_founding_year",
    category: "company_info",
    requirement: "Founding year (設立年)",
    details:
      "Older companies are trusted more. Display in Japanese era format alongside Western year (e.g. 平成15年 / 2003年). For startups, pair founding year with growth metrics to offset recency.",
    context: ["all"],
    severity: "required",
  },
  {
    id: "trust_capital_amount",
    category: "company_info",
    requirement: "Capital amount (資本金)",
    details:
      "1M yen (¥1,000,000) — the legal minimum — looks undercapitalized and signals a micro-operation. ¥5,000,000 is the minimum credible threshold. ¥10,000,000+ is standard for mid-size firms. If venture-backed, show the full amount (e.g. ¥500,000,000) — it demonstrates investor confidence. Always format with 万円 or 億円 notation.",
    context: ["b2b", "corporate", "ecommerce"],
    severity: "required",
  },
  {
    id: "trust_ceo_director_names",
    category: "company_info",
    requirement: "CEO / representative director names (代表者名)",
    details:
      "Japanese users Google the CEO's name to verify legitimacy. Display the full legal name in kanji. For B2B SaaS, include a brief bio and photo. Anonymous leadership is a dealbreaker — it suggests the company has something to hide.",
    context: ["all"],
    severity: "required",
  },
  {
    id: "trust_office_address_prestige",
    category: "company_info",
    requirement: "Office address credibility signal",
    details:
      "Beyond registration, the actual office location matters. Tokyo's Marunouchi, Roppongi Hills, Shibuya Scramble Square, or Osaka's Grand Front signal serious operations. WeWork/Regus addresses are recognized and slightly discounted. Regional companies should emphasize local establishment instead.",
    context: ["b2b", "corporate"],
    severity: "recommended",
  },
  {
    id: "trust_company_registration_number",
    category: "company_info",
    requirement: "Corporate number (法人番号) visible",
    details:
      "The 13-digit corporate number is publicly searchable on the NTA site. Displaying it proactively signals transparency. Particularly important for ecommerce and financial services.",
    context: ["ecommerce", "b2b", "corporate"],
    severity: "recommended",
  },
  {
    id: "trust_missing_info_suspicion",
    category: "company_info",
    requirement: "Completeness of company profile (会社概要)",
    details:
      "Japan's uncertainty avoidance score (89) means ANY missing field triggers suspicion. The 会社概要 page must include: company name, representative, address, founding date, capital, number of employees, main banks (取引銀行), and major clients if B2B. An incomplete profile is worse than no profile — it implies you are hiding something.",
    context: ["all"],
    severity: "required",
  },

  // ── Social Proof ─────────────────────────────────────────────────────
  {
    id: "trust_proof_numbers_hero",
    category: "social_proof",
    requirement: "Proof numbers near hero section",
    details:
      "Place concrete numbers directly below or within the hero: customer count (導入社数), user count, improvement percentages (e.g. 業務効率30%改善). Japanese audiences expect quantitative proof, not just qualitative claims. Use specific numbers (1,247社) not rounded ones (1,200+).",
    context: ["all"],
    severity: "required",
  },
  {
    id: "trust_case_studies",
    category: "social_proof",
    requirement: "導入事例 (case studies) section",
    details:
      "Mandatory for B2B post-Series A. Each case study should include: company name, industry, company size, challenge, solution, measurable result. Name the actual person interviewed with their title. Anonymous case studies carry almost no weight. Organize by industry for easy scanning.",
    context: ["b2b", "corporate"],
    severity: "required",
  },
  {
    id: "trust_customer_testimonials",
    category: "social_proof",
    requirement: "お客様の声 (customer testimonials)",
    details:
      "Include real names, photos, company names, and titles. Video testimonials are highest-trust. For B2C, use a dedicated review/testimonial page. Star ratings alone (without text) are viewed skeptically. Feature a mix of industries and company sizes.",
    context: ["all"],
    severity: "required",
  },
  {
    id: "trust_customer_logos",
    category: "social_proof",
    requirement: "Customer logo section (導入企業)",
    details:
      "Display recognizable logos in a grid or carousel. For B2B, prioritize enterprise/government logos — a single 大手企業 logo outweighs ten startup logos. Group by industry if you have enough. Minimum 6 logos to look credible; fewer looks like you are stretching.",
    context: ["b2b", "corporate"],
    severity: "required",
  },
  {
    id: "trust_award_badges",
    category: "social_proof",
    requirement: "Award badges and recognition near top",
    details:
      "Place awards, rankings (e.g. ITreview Grid Award, Boxil SaaS AWARD), and media recognition badges above the fold or immediately after the hero. Japanese B2B buyers use ranking sites heavily. Include the year to show currency. Expired awards (2+ years old) should be moved lower.",
    context: ["b2b", "corporate"],
    severity: "recommended",
  },
  {
    id: "trust_media_coverage",
    category: "social_proof",
    requirement: "メディア掲載 (media coverage)",
    details:
      "Display logos and links for media outlets that covered the company: Nikkei, TechCrunch Japan, Impress, ASCII.jp, etc. 'As seen in' sections carry weight. TV appearances (NHK, TV Tokyo WBS) are especially powerful. Include the date and article title.",
    context: ["all"],
    severity: "recommended",
  },
  {
    id: "trust_industry_sections",
    category: "social_proof",
    requirement: "Industry-specific sections (業種別)",
    details:
      "Japanese buyers want to see that you serve THEIR industry specifically. Create dedicated sections or pages for target verticals: manufacturing (製造業), finance (金融), retail (小売), healthcare (医療), government (自治体). Each should have its own case studies, features, and compliance notes.",
    context: ["b2b", "corporate"],
    severity: "recommended",
  },

  // ── Contact ──────────────────────────────────────────────────────────
  {
    id: "trust_phone_header",
    category: "contact",
    requirement: "Phone number in header (not just footer)",
    details:
      "A visible phone number in the global header signals legitimacy and availability. Use the 0120 (toll-free) format if possible — it implies scale. Even if most inquiries come via form, the number must be present. B2B sites without a header phone number lose credibility instantly. Format: 0120-XXX-XXX or 03-XXXX-XXXX.",
    context: ["b2b", "ecommerce", "corporate"],
    severity: "required",
  },

  // ── Certifications ───────────────────────────────────────────────────
  {
    id: "trust_truste_badge",
    category: "certification",
    requirement: "TRUSTe certification badge",
    details:
      "For data-sensitive B2B products (HR, finance, healthcare), the TRUSTe/TrustArc certification badge signals independent privacy verification. Display in footer and on pages that collect personal data. The Japanese market recognizes TRUSTe specifically due to JIPDEC promotion.",
    context: ["b2b"],
    severity: "recommended",
  },
  {
    id: "trust_ssl_badge",
    category: "certification",
    requirement: "SSL certificate badge visible",
    details:
      "While HTTPS is baseline, Japanese ecommerce sites still display SSL badges (GlobalSign, DigiCert) prominently — especially on checkout and form pages. The visual badge matters more than the lock icon for older demographics. Place near form submit buttons.",
    context: ["ecommerce", "b2c"],
    severity: "recommended",
  },
  {
    id: "trust_privacy_mark",
    category: "certification",
    requirement: "Privacy Mark (プライバシーマーク / Pマーク) display",
    details:
      "The JIPDEC Privacy Mark (JIS Q 15001) is the most recognized data-protection certification in Japan. Display the mark in the footer and on privacy-related pages. For B2B enterprise sales, it is often a procurement requirement. The mark must link to the JIPDEC verification page.",
    context: ["b2b", "corporate"],
    severity: "recommended",
  },

  // ── Legal ────────────────────────────────────────────────────────────
  {
    id: "trust_legal_footer_links",
    category: "legal",
    requirement: "Legal page links in footer",
    details:
      "The footer must include links to: 特定商取引法に基づく表記, プライバシーポリシー, 利用規約, and 会社概要 at minimum. Missing any of these immediately signals an untrustworthy or amateur operation. Order and naming must match Japanese conventions exactly.",
    context: ["all"],
    severity: "required",
  },
];

// ---------------------------------------------------------------------------
// Legal Requirements
// ---------------------------------------------------------------------------

export const LEGAL_REQUIREMENTS: LegalRequirement[] = [
  {
    id: "law_tokushoho",
    law_name_ja: "特定商取引法に基づく表記",
    law_name_en: "Act on Specified Commercial Transactions (Tokutei Sho Torihiki Ho)",
    applies_to:
      "ALL online commerce — any site that sells products, services, or subscriptions to consumers in Japan",
    what_to_display:
      "Seller name, address, phone number, representative name, price (tax-inclusive), payment methods, delivery timing, return/cancellation policy, additional fees (shipping, handling)",
    details:
      "This is the single most important legal page for Japanese ecommerce. It must be accessible within one click from any product or checkout page. The Consumer Affairs Agency actively enforces violations. Omitting any required field can result in administrative orders. Since April 2022, the law requires prices to be displayed as tax-inclusive (総額表示). The page is typically titled 特定商取引法に基づく表記 or 特商法表記 and placed in the footer navigation.",
  },
  {
    id: "law_privacy",
    law_name_ja: "個人情報保護方針 (個人情報保護法に基づく)",
    law_name_en: "Act on the Protection of Personal Information (APPI)",
    applies_to:
      "Any business handling personal information of individuals in Japan — effectively every website with user accounts, forms, or analytics",
    what_to_display:
      "Purpose of data collection (利用目的), data sharing with third parties (第三者提供), data handling procedures, user rights (disclosure, correction, deletion requests), contact for inquiries, name of data controller",
    details:
      "The APPI was significantly amended in April 2022, removing the threshold exemption — now even small businesses handling any amount of personal data must comply. The privacy policy must be written in Japanese for Japanese users. Cross-border data transfers require explicit disclosure of destination countries and their data protection regimes. Consent must be affirmative (pre-checked boxes are not valid). Cookie data is now partially regulated under the 2022 amendments when combined with other identifiers.",
  },
  {
    id: "law_terms_of_service",
    law_name_ja: "利用規約",
    law_name_en: "Terms of Service",
    applies_to:
      "Any web service, SaaS product, or platform with user accounts",
    what_to_display:
      "Service description, user obligations, prohibited conduct (禁止事項), intellectual property, limitation of liability, governing law (typically Japanese law, Tokyo District Court jurisdiction), termination conditions, modification procedures",
    details:
      "While not mandated by a single specific law, terms of service are enforced under the Civil Code (民法) and Consumer Contract Act (消費者契約法). Unfair terms can be voided under the Consumer Contract Act. Terms must be presented before the user creates an account — burying them post-registration may render them unenforceable. Amendment notifications must be given in advance (typically 30 days). For SaaS, include SLA terms and data handling on termination.",
  },
  {
    id: "law_cookie_consent",
    law_name_ja: "Cookie同意 (電気通信事業法改正対応)",
    law_name_en: "Cookie Consent (Telecommunications Business Act amendments)",
    applies_to:
      "Websites using cookies, tracking pixels, or similar technologies — especially those operated by telecommunications businesses",
    what_to_display:
      "Cookie usage notice, purpose categories, consent mechanism (opt-in for sensitive tracking), opt-out method, link to full cookie policy",
    details:
      "Japan does not have a GDPR-equivalent cookie law, but the 2023 amendment to the Telecommunications Business Act (電気通信事業法) introduced requirements for 'external transmission' (外部送信) of user data. Telecommunications businesses must now inform users about third-party data transmission or obtain consent. While not strictly required for all sites, cookie banners are becoming standard practice in Japan, and GDPR compliance is expected for sites accessible from the EU. Implement at minimum an informational banner with opt-out capability.",
  },
  {
    id: "law_payment_services",
    law_name_ja: "資金決済法",
    law_name_en: "Payment Services Act (Shikin Kessai Ho)",
    applies_to:
      "Businesses offering payment services, prepaid payment instruments, cryptocurrency exchange, or fund transfer services in Japan",
    what_to_display:
      "Registration number, registered business name, fund management method, consumer protection measures, complaint resolution process, link to regulatory filings",
    details:
      "Any business issuing prepaid payment instruments (gift cards, points systems with cash value, digital currencies) worth over ¥10,000,000 outstanding must register with the Finance Bureau. Cryptocurrency exchanges must register as Virtual Currency Exchange Service Providers. Display the registration number prominently. The FSA maintains a public registry of licensed operators — users will check it.",
  },
  {
    id: "law_premiums_representations",
    law_name_ja: "景品表示法 (不当景品類及び不当表示防止法)",
    law_name_en: "Act against Unjustifiable Premiums and Misleading Representations",
    applies_to:
      "ALL businesses making advertising claims or offering promotions in Japan",
    what_to_display:
      "Accurate product/service descriptions, substantiated claims, clear conditions for promotions, 'No.1' claim substantiation, comparison advertising basis, prize/campaign value limits",
    details:
      "The Consumer Affairs Agency aggressively enforces this law. 'No.1' claims (e.g. 顧客満足度No.1) require documented survey methodology and must be current. Superlatives like '最安値' (cheapest) or '最高品質' (highest quality) need substantiation. Before/after comparisons must be representative. Prize campaigns have value caps: general prizes max ¥100,000 or 1/20 of transaction value; open prizes max ¥100,000. Violations result in cease-and-desist orders and are published publicly — reputational damage is severe.",
  },
  {
    id: "law_pharmaceutical",
    law_name_ja: "薬機法 (医薬品、医療機器等の品質、有効性及び安全性の確保等に関する法律)",
    law_name_en: "Act on Securing Quality, Efficacy and Safety of Products Including Pharmaceuticals and Medical Devices",
    applies_to:
      "Health supplements, cosmetics, beauty products, medical devices, fitness products, and any product making health-related claims",
    what_to_display:
      "Product classification, approved claims only, required warnings, ingredient lists in prescribed format, no unapproved efficacy claims",
    details:
      "Extremely strict in Japan. Cosmetics can only claim the 56 approved efficacy categories. Supplements (健康食品) cannot claim to cure, treat, or prevent any disease. 'Personal experience' testimonials implying medical efficacy are violations. Foods with functional claims (機能性表示食品) require Consumer Affairs Agency notification. The line between cosmetic/quasi-drug/pharmaceutical is legally defined and crossing it carries criminal penalties. Beauty and health ecommerce sites must have copy reviewed by a 薬機法 specialist.",
  },
  {
    id: "law_telecommunications",
    law_name_ja: "電気通信事業法",
    law_name_en: "Telecommunications Business Act",
    applies_to:
      "Telecommunications carriers, ISPs, VoIP providers, messaging services, and since 2023 amendments, many web services transmitting user data externally",
    what_to_display:
      "Service terms (約款), complaint handling procedures, data handling practices, external data transmission notice (外部送信規律), registered/notified business status",
    details:
      "The June 2023 amendments significantly expanded scope. Websites and apps that transmit user information to third parties (analytics, ad networks, CDNs) must now inform users about these transmissions. This applies to a broad range of online services. Required information includes: what data is sent, to whom, and for what purpose. Options include public disclosure on the site, prior notification, or obtaining consent. The MIC provides guidance and the requirement is actively monitored.",
  },
  {
    id: "law_secondhand_goods",
    law_name_ja: "古物営業法",
    law_name_en: "Secondhand Articles Dealer Act (Kobutsu Eigyo Ho)",
    applies_to:
      "Marketplace platforms, resale sites, auction sites, secondhand goods sellers, rental services, and any business buying or selling used goods",
    what_to_display:
      "Secondhand goods dealer license number (古物商許可番号), issuing public safety commission, dealer name, types of goods handled",
    details:
      "Required for any business dealing in secondhand goods, including online marketplaces. The license is obtained from the prefectural Public Safety Commission (公安委員会). The 13-digit license number must be displayed on the website. Identity verification of sellers is required for transactions over ¥10,000. This law exists primarily for crime prevention (stolen goods tracking). Operating without a license is a criminal offense (up to 3 years imprisonment or ¥1,000,000 fine). Major platforms like Mercari and Yahoo Auctions prominently display this.",
  },
  {
    id: "law_privacy_mark",
    law_name_ja: "JIS Q 15001 (プライバシーマーク制度)",
    law_name_en: "JIS Q 15001 Privacy Mark System",
    applies_to:
      "Any business handling personal information that wants to demonstrate compliance — especially B2B enterprises and government contractors",
    what_to_display:
      "Privacy Mark logo (Pマーク), certification number, link to JIPDEC verification page, certification validity period",
    details:
      "Administered by JIPDEC (Japan Institute for Promotion of Digital Economy and Community). The Privacy Mark certifies compliance with JIS Q 15001, Japan's personal information management standard. Over 16,000 organizations hold the mark. For B2B sales to enterprises and government, it is often a de facto procurement requirement — listed in RFP checklists. The certification process takes 6-12 months and requires biennial renewal. The mark must be displayed as specified in JIPDEC guidelines (size, placement, linking rules).",
  },
];
