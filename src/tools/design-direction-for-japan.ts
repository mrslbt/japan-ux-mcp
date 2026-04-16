import { getKeigoLevel, type Context, type KeigoLevel } from "../data/keigo-patterns.js";
import { LAYOUT_RULES } from "../data/layout-patterns.js";
import { COLOR_MEANINGS } from "../data/visual-rules.js";
import { JP_FONT_STACKS, TYPE_SCALE } from "../data/typography-rules.js";
import { TRUST_SIGNALS, type BusinessContext, type TrustSignal } from "../data/trust-legal.js";

type IndustryProfileId = "b2b_saas" | "clinic" | "luxury" | "ecommerce" | "corporate";
type BrandProfileId =
  | "corporate_trust"
  | "modern_minimal"
  | "friendly_warm"
  | "premium_elegant"
  | "traditional_craft"
  | "energetic_retail";
type AudienceProfileId =
  | "business_buyers"
  | "general_public"
  | "youth"
  | "families"
  | "seniors"
  | "domestic_travelers"
  | "premium_consumers";

interface IndustryProfile {
  id: IndustryProfileId;
  label: string;
  context: Context;
  defaultBrand: BrandProfileId;
  trustContexts: BusinessContext[];
  summary: string;
  density: string;
  layout: string[];
  imagery: string[];
  ctaExamples: string[];
  ctaStyle: string;
  sections: Array<{ section: string; why: string }>;
  heroTrustIds: string[];
  midTrustIds: string[];
  footerTrustIds: string[];
  palette: string[];
  avoid: string[];
}

interface BrandProfile {
  id: BrandProfileId;
  label: string;
  summary: string;
  displayFontId: string;
  bodyFontId: string;
  palette: string[];
  imageryBias: string[];
  ctaLook: string;
  densityModifier?: string;
  avoid: string[];
}

interface AudienceProfile {
  id: AudienceProfileId;
  label: string;
  summary: string;
  densityModifier: string;
  typographyNotes: string[];
  ctaNotes: string[];
  trustNotes: string[];
  imageryNotes: string[];
  avoid: string[];
}

export interface DesignDirectionParams {
  brand_type: string;
  audience: string;
  industry: string;
}

interface PaletteChoice {
  role: string;
  color: string;
  japanese_name: string;
  hex: string;
  usage: string;
}

export interface DesignDirectionResult {
  normalized_inputs: {
    brand_type: BrandProfileId;
    audience: AudienceProfileId;
    industry: IndustryProfileId;
    recommended_context: Context;
    keigo_level: KeigoLevel;
  };
  summary: string;
  visual_direction: {
    overall_feel: string;
    density: string;
    layout_principles: string[];
    layout_rhythm: {
      pc_artboard: string;
      mobile_artboard: string;
      section_spacing: string;
    };
  };
  color_palette: PaletteChoice[];
  typography: {
    display_stack: string;
    body_stack: string;
    hero_scale: string;
    body_scale: string;
    notes: string[];
  };
  imagery_style: string[];
  cta_style: {
    tone: string;
    visual_style: string;
    labels: string[];
    placement: string[];
  };
  trust_layout: {
    hero: string[];
    mid_page: string[];
    footer: string[];
  };
  section_priorities: Array<{ section: string; why: string }>;
  avoid: string[];
}

const INDUSTRY_PROFILES: Record<IndustryProfileId, IndustryProfile> = {
  b2b_saas: {
    id: "b2b_saas",
    label: "B2B SaaS",
    context: "b2b_saas",
    defaultBrand: "corporate_trust",
    trustContexts: ["b2b", "corporate", "all"],
    summary: "Professional, information-dense, and visibly trustworthy. It should feel like a serious Japanese buying environment, not a stripped-down startup template.",
    density: "high but controlled",
    layout: [
      "Use a clear first-view with proof numbers, a concise value proposition, and one primary CTA.",
      "Repeat conversion points after the hero, after core features, and near the footer.",
      "Use tables for pricing and structured comparisons instead of loose card layouts.",
    ],
    imagery: [
      "Real team photos, office shots, and product UI captures build more trust than abstract 3D shapes.",
      "Diagrams should be orderly and labeled, not decorative.",
    ],
    ctaExamples: ["資料請求", "デモを依頼する", "お問い合わせ"],
    ctaStyle: "Solid, dependable buttons with restrained radius. Look more corporate than playful.",
    sections: [
      { section: "導入実績 / proof block", why: "Japanese buyers want numbers and recognizable logos immediately." },
      { section: "主要機能", why: "Feature sections should be explicit and easy to scan." },
      { section: "導入事例", why: "Named case studies are one of the strongest trust drivers in Japan." },
      { section: "料金プラン", why: "Transparent pricing is expected for serious B2B evaluation." },
      { section: "導入の流れ", why: "Show the implementation path so buyers can picture procurement and rollout." },
      { section: "FAQ", why: "Detailed answers reduce uncertainty and support internal sharing." },
    ],
    heroTrustIds: ["trust_proof_numbers_hero", "trust_customer_logos", "trust_phone_header"],
    midTrustIds: ["trust_case_studies", "trust_award_badges", "trust_industry_sections"],
    footerTrustIds: ["trust_missing_info_suspicion", "trust_registered_address", "trust_ceo_director_names", "trust_founding_year"],
    palette: ["blue", "white", "green", "black"],
    avoid: [
      "Do not make the page feel sparse or over-minimal.",
      "Do not hide pricing, implementation detail, or company information.",
      "Avoid overly playful gradients unless the brand is intentionally youth-skewed.",
    ],
  },
  clinic: {
    id: "clinic",
    label: "Clinic / Healthcare",
    context: "corporate",
    defaultBrand: "corporate_trust",
    trustContexts: ["b2c", "corporate", "all"],
    summary: "Clean, calm, and reassuring. Patients should feel clarity, warmth, and operational reliability from the first screen.",
    density: "moderate to high",
    layout: [
      "Prioritize reservation/contact access in the header and first view.",
      "Keep information grouped into clear blocks: treatment, doctors, fees, access, FAQ.",
      "Use calm pacing, but do not make the page too abstract or art-directed.",
    ],
    imagery: [
      "Use real staff and facility photography over stock lifestyle imagery.",
      "Clinical spaces should look bright, organized, and approachable.",
    ],
    ctaExamples: ["WEB予約", "お問い合わせ", "診療時間を見る"],
    ctaStyle: "Visible, reassuring reservation and inquiry buttons with clear hierarchy. Never make the booking path hard to find.",
    sections: [
      { section: "診療案内", why: "Treatment scope should be obvious without scrolling too far." },
      { section: "医師紹介", why: "Doctor identity is a major trust factor for clinics." },
      { section: "料金 / 保険", why: "Patients want certainty before contacting you." },
      { section: "アクセス", why: "Map, station access, and hours matter more than brand flourish." },
      { section: "FAQ", why: "Common operational questions reduce call volume and anxiety." },
    ],
    heroTrustIds: ["trust_phone_header", "trust_proof_numbers_hero"],
    midTrustIds: ["trust_customer_testimonials", "trust_media_coverage"],
    footerTrustIds: ["trust_registered_address", "trust_ceo_director_names", "trust_missing_info_suspicion"],
    palette: ["blue", "green", "white"],
    avoid: [
      "Avoid dark, moody palettes unless the clinic is explicitly premium cosmetic medicine.",
      "Do not bury access, hours, or reservation information.",
      "Avoid vague wellness copy where patients expect practical information.",
    ],
  },
  luxury: {
    id: "luxury",
    label: "Luxury / Hospitality",
    context: "luxury_hospitality",
    defaultBrand: "premium_elegant",
    trustContexts: ["b2c", "corporate", "all"],
    summary: "Refined, atmospheric, and quietly detailed. Luxury in Japan should feel composed and intentional, not empty for the sake of minimalism.",
    density: "moderate",
    layout: [
      "Use strong visual rhythm, but keep enough information visible to feel trustworthy.",
      "Mix immersive imagery with clear sections for plans, access, and hospitality details.",
      "Let atmosphere lead, but never hide practical booking information.",
    ],
    imagery: [
      "Use high-quality photography with craft detail, texture, and seasonal atmosphere.",
      "Focus on materiality, light, service moments, and place-based identity.",
    ],
    ctaExamples: ["ご予約", "空室を確認する", "宿泊プランを見る"],
    ctaStyle: "Elegant buttons with restrained contrast, refined spacing, and higher formality in labels.",
    sections: [
      { section: "ブランド / 体験の世界観", why: "Luxury buyers want a sense of mood and positioning immediately." },
      { section: "宿泊プラン / 商品構成", why: "Packages should still be easy to compare." },
      { section: "空間・設備紹介", why: "Rooms, amenities, and atmosphere need editorial presentation." },
      { section: "お食事 / サービス詳細", why: "Guests expect detail, not just emotional language." },
      { section: "アクセス", why: "Practical clarity matters even on premium sites." },
    ],
    heroTrustIds: ["trust_award_badges", "trust_media_coverage"],
    midTrustIds: ["trust_customer_testimonials", "trust_proof_numbers_hero"],
    footerTrustIds: ["trust_registered_address", "trust_founding_year", "trust_missing_info_suspicion"],
    palette: ["black", "gold", "white", "purple"],
    avoid: [
      "Do not turn the site into a generic Western luxury template with too much empty space.",
      "Avoid loud sale-style promo treatment unless the brand explicitly wants it.",
      "Do not let decorative English typography overpower Japanese readability.",
    ],
  },
  ecommerce: {
    id: "ecommerce",
    label: "E-commerce / Retail",
    context: "ecommerce",
    defaultBrand: "energetic_retail",
    trustContexts: ["ecommerce", "b2c", "all"],
    summary: "Dense, clear, and conversion-minded. Japanese commerce pages should feel informative, active, and easy to trust at a glance.",
    density: "high",
    layout: [
      "Show category depth, product detail, and promotional blocks without apology.",
      "Dense comparison, badges, and secondary information are normal in Japan.",
      "Make gift, shipping, and returns information easy to find.",
    ],
    imagery: [
      "Use multiple product views, detail crops, and social proof imagery.",
      "Promotional badges and campaign blocks should be clear and energetic rather than shy.",
    ],
    ctaExamples: ["カートに入れる", "購入手続きへ", "商品を見る"],
    ctaStyle: "Strong, obvious conversion buttons with clear contrast and supporting trust information nearby.",
    sections: [
      { section: "商品一覧 / 比較導線", why: "Users expect a lot of visible information before clicking through." },
      { section: "レビュー / お客様の声", why: "Text reviews and real customer proof carry weight." },
      { section: "配送・返品・決済", why: "Operational certainty affects conversion heavily in Japan." },
      { section: "ギフト対応", why: "Gift wrapping and のし expectations are common." },
      { section: "FAQ", why: "Dense pre-purchase questions are normal and useful." },
    ],
    heroTrustIds: ["trust_phone_header", "trust_ssl_badge"],
    midTrustIds: ["trust_customer_testimonials", "trust_media_coverage"],
    footerTrustIds: ["trust_missing_info_suspicion", "trust_registered_address"],
    palette: ["red", "yellow", "white", "black"],
    avoid: [
      "Do not oversimplify product pages into a single hero image and a short description.",
      "Do not hide shipping, returns, or seller information.",
      "Avoid an all-black-and-white palette for celebratory or gifting contexts.",
    ],
  },
  corporate: {
    id: "corporate",
    label: "Corporate / Brand Site",
    context: "corporate",
    defaultBrand: "corporate_trust",
    trustContexts: ["corporate", "all"],
    summary: "Reliable, organized, and a little formal. It should feel like a maintained company website with clear information depth and trust structure.",
    density: "moderate to high",
    layout: [
      "Use a clear company story, service summary, and a visible route to inquiry.",
      "Show news, company information, and structured navigation instead of relying on a thin brochure layout.",
      "Keep sectioning obvious so dense content stays readable.",
    ],
    imagery: [
      "Real staff, facilities, process, and company context outperform generic concept art.",
      "Use diagrams or service blocks to explain structure clearly.",
    ],
    ctaExamples: ["お問い合わせ", "サービスを見る", "会社概要を見る"],
    ctaStyle: "Formal but approachable buttons with good spacing and straightforward labels.",
    sections: [
      { section: "サービス / 事業紹介", why: "Visitors should understand what the company actually does quickly." },
      { section: "お知らせ", why: "A maintained news block is a strong credibility signal in Japan." },
      { section: "導入事例 / 実績", why: "Proof and social trust matter even on general corporate pages." },
      { section: "会社概要", why: "Japanese users look for company facts earlier than Western users often do." },
      { section: "お問い合わせ", why: "Inquiry should be available from multiple points." },
    ],
    heroTrustIds: ["trust_phone_header", "trust_proof_numbers_hero"],
    midTrustIds: ["trust_case_studies", "trust_media_coverage"],
    footerTrustIds: ["trust_missing_info_suspicion", "trust_registered_address", "trust_founding_year", "trust_ceo_director_names"],
    palette: ["blue", "white", "black", "green"],
    avoid: [
      "Do not present the company as a thin, aesthetic-only landing page.",
      "Avoid under-explaining services, leadership, or company facts.",
      "Do not make the footer sparse.",
    ],
  },
};

const BRAND_PROFILES: Record<BrandProfileId, BrandProfile> = {
  corporate_trust: {
    id: "corporate_trust",
    label: "Corporate trust",
    summary: "Structured, sober, dependable, and clear.",
    displayFontId: "mixed_corporate",
    bodyFontId: "sans_system",
    palette: ["blue", "white", "black", "green"],
    imageryBias: [
      "Prefer real company, service, and environment imagery over decorative abstraction.",
      "Use diagrams, icons, and annotated visuals where they clarify value.",
    ],
    ctaLook: "Squared to softly rounded buttons with solid color and strong contrast.",
    avoid: ["Avoid trying to look 'cool' at the expense of trust.", "Do not make it feel like a generic Western SaaS template."],
  },
  modern_minimal: {
    id: "modern_minimal",
    label: "Modern minimal",
    summary: "Clean, contemporary, and restrained, but still detailed enough for Japan.",
    displayFontId: "mixed_modern",
    bodyFontId: "sans_web",
    palette: ["blue", "white", "black", "green"],
    imageryBias: [
      "Use crisp product crops, clean photography, and quiet geometric support graphics.",
      "Keep the page tidy without stripping out essential detail.",
    ],
    ctaLook: "Precise buttons with clear spacing, not overly decorative.",
    densityModifier: "Keep information dense enough to feel complete. Minimal does not mean empty in Japan.",
    avoid: ["Do not overuse whitespace to the point where the page feels unfinished."],
  },
  friendly_warm: {
    id: "friendly_warm",
    label: "Friendly warm",
    summary: "Approachable, human, and warm without becoming childish.",
    displayFontId: "mixed_rounded",
    bodyFontId: "sans_web",
    palette: ["green", "pink", "yellow", "white"],
    imageryBias: [
      "Use people, food, lifestyle, or family-oriented imagery with natural warmth.",
      "Illustration can work well if it feels Japanese and intentional.",
    ],
    ctaLook: "Rounded buttons with warm accent colors and clear explanatory subtext.",
    avoid: ["Avoid cute-for-the-sake-of-cute if the brand still needs authority."],
  },
  premium_elegant: {
    id: "premium_elegant",
    label: "Premium elegant",
    summary: "Refined, atmospheric, and controlled.",
    displayFontId: "serif_web",
    bodyFontId: "mixed_elegant",
    palette: ["black", "gold", "white", "purple"],
    imageryBias: [
      "Lean on craftsmanship, material texture, seasonal light, and editorial cropping.",
      "Use English display type sparingly as atmosphere, not as the main content voice.",
    ],
    ctaLook: "Quiet but confident buttons with restrained contrast and higher-quality spacing.",
    densityModifier: "Reduce noise, but keep enough information visible to maintain trust.",
    avoid: ["Do not copy Western luxury minimalism too literally.", "Avoid weak contrast on Japanese body copy."],
  },
  traditional_craft: {
    id: "traditional_craft",
    label: "Traditional craft",
    summary: "Cultural, grounded, and material-driven.",
    displayFontId: "serif_web",
    bodyFontId: "sans_system",
    palette: ["blue", "white", "gold", "black"],
    imageryBias: [
      "Use process photography, artisanship, texture, architecture, and seasonal detail.",
      "Vertical text or mincho accents can work if readability stays intact.",
    ],
    ctaLook: "Buttons should feel composed and secondary to the material story, but still easy to use.",
    avoid: ["Avoid turning tradition into costume. Keep the site contemporary enough to use."],
  },
  energetic_retail: {
    id: "energetic_retail",
    label: "Energetic retail",
    summary: "Bold, lively, and conversion-minded.",
    displayFontId: "sans_web",
    bodyFontId: "sans_system",
    palette: ["red", "yellow", "white", "black"],
    imageryBias: [
      "Use product grids, campaign blocks, badges, and obvious callouts without apology.",
      "Dense promotional treatment is acceptable if the information hierarchy is still clear.",
    ],
    ctaLook: "High-contrast buttons and campaign labels that are easy to scan in a dense layout.",
    densityModifier: "Let the page feel active and packed with useful detail.",
    avoid: ["Do not make retail pages feel timid or under-explained."],
  },
};

const AUDIENCE_PROFILES: Record<AudienceProfileId, AudienceProfile> = {
  business_buyers: {
    id: "business_buyers",
    label: "Business buyers",
    summary: "Decision-makers who care about proof, structure, and low risk.",
    densityModifier: "Bias toward denser information blocks, visible proof, and calm authority.",
    typographyNotes: ["Use more formal hierarchy and avoid playful display treatments.", "Keep body text comfortable and scannable."],
    ctaNotes: ["Favor 資料請求, お問い合わせ, or デモ requests over playful marketing CTAs."],
    trustNotes: ["Push proof numbers, client logos, case studies, and company info up the page."],
    imageryNotes: ["Show product UI, process, facilities, and real people with roles."],
    avoid: ["Do not rely on vague emotional marketing without evidence."],
  },
  general_public: {
    id: "general_public",
    label: "General public",
    summary: "Broad consumer audience that needs clarity, familiarity, and trust.",
    densityModifier: "Balance information density with readability. Explain enough to feel complete.",
    typographyNotes: ["Default to neutral, highly readable type settings."],
    ctaNotes: ["Keep labels literal and easy to understand."],
    trustNotes: ["Make contact, FAQ, and company information easy to find."],
    imageryNotes: ["Use straightforward, context-rich imagery instead of abstract concepts."],
    avoid: ["Do not assume prior category knowledge."],
  },
  youth: {
    id: "youth",
    label: "Youth",
    summary: "Mobile-first, visually quick, and socially tuned.",
    densityModifier: "Slightly lighter density is acceptable, but still avoid empty-looking layouts.",
    typographyNotes: ["You can use bolder contrast and more expressive display type than for older audiences."],
    ctaNotes: ["Shorter labels and more upbeat supporting copy are acceptable."],
    trustNotes: ["Social proof and recent activity matter more than heavy corporate detail."],
    imageryNotes: ["Illustration, social-style photography, and lively color can work well."],
    avoid: ["Do not force playful tone if the industry requires seriousness."],
  },
  families: {
    id: "families",
    label: "Families",
    summary: "Warmth, reassurance, and practical clarity matter most.",
    densityModifier: "Keep content clear and structured, with obvious reassurance points.",
    typographyNotes: ["Readable sizes and gentle contrast changes work better than edgy treatments."],
    ctaNotes: ["Use explicit action labels and supportive subcopy where needed."],
    trustNotes: ["FAQ, pricing, process, and contact should feel very easy to locate."],
    imageryNotes: ["Use welcoming, human photography rather than generic stock cheerfulness."],
    avoid: ["Do not make important actions feel rushed or ambiguous."],
  },
  seniors: {
    id: "seniors",
    label: "Seniors",
    summary: "Clarity, contrast, and easy contact matter more than novelty.",
    densityModifier: "Keep structure explicit and avoid overly compressed mobile interactions.",
    typographyNotes: ["Body copy should feel large, calm, and high-contrast. Avoid delicate light weights."],
    ctaNotes: ["CTA buttons should be obvious, descriptive, and easy to tap."],
    trustNotes: ["Phone number, address, hours, and procedural clarity should be very visible."],
    imageryNotes: ["Use steady, reassuring imagery and avoid visual clutter in key decision areas."],
    avoid: ["Avoid low contrast, tiny labels, or hidden contact paths."],
  },
  domestic_travelers: {
    id: "domestic_travelers",
    label: "Domestic travelers",
    summary: "Atmosphere sells, but practical planning information closes.",
    densityModifier: "Pair emotional imagery with enough booking detail and access clarity.",
    typographyNotes: ["Use elegant display touches, but keep plan details and booking UI highly readable."],
    ctaNotes: ["Reservation CTAs should be visible throughout the scroll."],
    trustNotes: ["Access, pricing, amenities, and booking policies should not feel hidden."],
    imageryNotes: ["Seasonality, place, food, and room detail matter more than generic luxury styling."],
    avoid: ["Do not make the site all mood and no practical information."],
  },
  premium_consumers: {
    id: "premium_consumers",
    label: "Premium consumers",
    summary: "High expectations for polish, detail, and consistency.",
    densityModifier: "Keep the page selective, but still complete. Premium buyers notice missing detail.",
    typographyNotes: ["Use more refined spacing, but maintain strong readability for Japanese copy."],
    ctaNotes: ["CTAs can be quieter visually, but they must still feel intentional."],
    trustNotes: ["Awards, craftsmanship, service detail, and company legitimacy all matter."],
    imageryNotes: ["Material quality, craft detail, and seasonal refinement should carry the visual story."],
    avoid: ["Avoid gimmicky luxury tropes or weak execution hiding behind minimalism."],
  },
};

const INDUSTRY_KEYWORDS: Array<[IndustryProfileId, string[]]> = [
  ["b2b_saas", ["saas", "software", "crm", "erp", "platform", "dashboard", "b2b", "enterprise", "workflow"]],
  ["clinic", ["clinic", "medical", "hospital", "dental", "beauty clinic", "dermatology", "orthodontic", "healthcare"]],
  ["luxury", ["luxury", "premium", "ryokan", "hotel", "resort", "hospitality", "fine dining", "high end"]],
  ["ecommerce", ["ecommerce", "e-commerce", "ec", "shop", "store", "retail", "d2c", "fashion", "cosmetics"]],
  ["corporate", ["corporate", "company", "brand", "agency", "manufacturer", "firm"]],
];

const BRAND_KEYWORDS: Array<[BrandProfileId, string[]]> = [
  ["premium_elegant", ["luxury", "premium", "elegant", "high end", "refined"]],
  ["traditional_craft", ["traditional", "craft", "artisan", "heritage", "japanese", "washoku"]],
  ["friendly_warm", ["friendly", "warm", "approachable", "soft", "family", "lifestyle"]],
  ["energetic_retail", ["retail", "campaign", "sale", "promo", "bold", "energetic"]],
  ["modern_minimal", ["modern", "minimal", "clean", "editorial", "contemporary"]],
  ["corporate_trust", ["corporate", "trust", "serious", "business", "reliable"]],
];

const AUDIENCE_KEYWORDS: Array<[AudienceProfileId, string[]]> = [
  ["business_buyers", ["b2b", "business", "buyer", "decision maker", "enterprise", "procurement"]],
  ["youth", ["youth", "young", "student", "gen z", "teen", "20s"]],
  ["families", ["family", "families", "parents", "children", "kids"]],
  ["seniors", ["senior", "elderly", "older", "retired", "60s", "70s"]],
  ["domestic_travelers", ["traveler", "tourist", "domestic traveler", "stay", "trip", "guest"]],
  ["premium_consumers", ["premium", "affluent", "luxury customer", "vip"]],
  ["general_public", ["general", "public", "everyone", "broad audience"]],
];

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function inferProfileId<T extends string>(value: string, keywordTable: Array<[T, string[]]>, fallback: T): T {
  const normalized = normalize(value);

  for (const [id, keywords] of keywordTable) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return id;
    }
  }

  return fallback;
}

function getColor(color: string) {
  return COLOR_MEANINGS.find((entry) => entry.color === color);
}

function getFontStack(id: string) {
  return JP_FONT_STACKS.find((stack) => stack.id === id);
}

function getLayoutRule(id: string) {
  return LAYOUT_RULES.find((rule) => rule.id === id);
}

function applicableToContexts(signal: TrustSignal, contexts: BusinessContext[]): boolean {
  return signal.context.includes("all") || signal.context.some((context) => contexts.includes(context));
}

function pickTrustSignals(ids: string[], contexts: BusinessContext[]): string[] {
  return ids
    .map((id) => TRUST_SIGNALS.find((signal) => signal.id === id))
    .filter((signal): signal is TrustSignal => Boolean(signal))
    .filter((signal) => applicableToContexts(signal, contexts))
    .map((signal) => signal.requirement);
}

function buildPalette(industry: IndustryProfile, brand: BrandProfile): PaletteChoice[] {
  const paletteOrder = [...brand.palette, ...industry.palette];
  const uniqueColors = Array.from(new Set(paletteOrder)).slice(0, 4);
  const roles = ["primary", "secondary", "accent", "background"];

  return uniqueColors.map((color, index) => {
    const match = getColor(color);

    return {
      role: roles[index] || `support_${index + 1}`,
      color: match?.color || color,
      japanese_name: match?.japanese_name || color,
      hex: match?.hex || "#000000",
      usage: match?.usage_notes || "Use where it supports the overall design direction.",
    };
  });
}

export function designDirectionForJapan(params: DesignDirectionParams): DesignDirectionResult {
  const industryId = inferProfileId(params.industry, INDUSTRY_KEYWORDS, "corporate");
  const industry = INDUSTRY_PROFILES[industryId];

  const brandFallback = industry.defaultBrand;
  const brandId = inferProfileId(params.brand_type, BRAND_KEYWORDS, brandFallback);
  const brand = BRAND_PROFILES[brandId];

  const audienceId = inferProfileId(params.audience, AUDIENCE_KEYWORDS, "general_public");
  const audience = AUDIENCE_PROFILES[audienceId];

  const keigoLevel = getKeigoLevel(industry.context);
  const displayStack = getFontStack(brand.displayFontId);
  const bodyStack = getFontStack(brand.bodyFontId);
  const pcArtboard = getLayoutRule("grid_pc_artboard")?.values;
  const mobileArtboard = getLayoutRule("grid_mobile_artboard")?.values;
  const pcSectionSpacing = getLayoutRule("spacing_section_pc")?.values;
  const mobileSectionSpacing = getLayoutRule("spacing_section_mobile")?.values;
  const heroScale = TYPE_SCALE.find((entry) => entry.role === "hero");
  const bodyScale = TYPE_SCALE.find((entry) => entry.role === "body");

  const toneSummary = [industry.summary, brand.summary, audience.summary].join(" ");
  const densitySummary = [industry.density, audience.densityModifier, brand.densityModifier].filter(Boolean).join(". ");

  return {
    normalized_inputs: {
      brand_type: brand.id,
      audience: audience.id,
      industry: industry.id,
      recommended_context: industry.context,
      keigo_level: keigoLevel,
    },
    summary: toneSummary,
    visual_direction: {
      overall_feel: `${industry.label} with a ${brand.label.toLowerCase()} tone for ${audience.label.toLowerCase()}.`,
      density: densitySummary,
      layout_principles: [...industry.layout],
      layout_rhythm: {
        pc_artboard: pcArtboard ? `${pcArtboard.width}x${pcArtboard.height}` : "1280x832",
        mobile_artboard: mobileArtboard ? `${mobileArtboard.width}x${mobileArtboard.height}` : "375x812",
        section_spacing: `${pcSectionSpacing?.spacing || 100}px on PC / ${mobileSectionSpacing?.spacing || 60}px on mobile`,
      },
    },
    color_palette: buildPalette(industry, brand),
    typography: {
      display_stack: displayStack?.stack || '"Noto Sans JP", sans-serif',
      body_stack: bodyStack?.stack || '"Noto Sans JP", sans-serif',
      hero_scale: heroScale ? `${heroScale.pc}px / ${heroScale.mobile}px, weight ${heroScale.weight}, line-height ${heroScale.line_height}` : "60px / 32px, weight 700, line-height 1.4",
      body_scale: bodyScale ? `${bodyScale.pc}px / ${bodyScale.mobile}px, weight ${bodyScale.weight}, line-height ${bodyScale.line_height}` : "16px / 16px, weight 400, line-height 1.8",
      notes: [
        displayStack?.notes || "Choose a display stack that keeps Japanese headings readable.",
        bodyStack?.notes || "Body copy should stay on a highly readable Japanese sans-serif stack.",
        ...audience.typographyNotes,
      ],
    },
    imagery_style: [...industry.imagery, ...brand.imageryBias, ...audience.imageryNotes],
    cta_style: {
      tone: `${keigoLevel} (${industry.context})`,
      visual_style: `${industry.ctaStyle} ${brand.ctaLook}`.trim(),
      labels: [...industry.ctaExamples],
      placement: [
        "Primary CTA in the first view",
        "Repeat CTA after the strongest proof or section transition",
        ...audience.ctaNotes,
      ],
    },
    trust_layout: {
      hero: pickTrustSignals(industry.heroTrustIds, industry.trustContexts),
      mid_page: [...pickTrustSignals(industry.midTrustIds, industry.trustContexts), ...audience.trustNotes],
      footer: pickTrustSignals(industry.footerTrustIds, industry.trustContexts),
    },
    section_priorities: [...industry.sections],
    avoid: [...brand.avoid, ...industry.avoid, ...audience.avoid],
  };
}
