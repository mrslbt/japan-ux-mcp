export type LayoutCategory = "grid" | "spacing" | "density" | "responsive" | "structure";
export type Platform = "pc" | "mobile" | "both";

export interface LayoutRule {
  id: string;
  category: LayoutCategory;
  rule: string;
  details: string;
  platform: Platform;
  values?: Record<string, number | string>;
}

export const LAYOUT_RULES: LayoutRule[] = [
  // Grid
  {
    id: "grid_12col",
    category: "grid",
    rule: "12-column grid standard at 1280px design width",
    details:
      "Japanese web design follows the global 12-column grid convention. The standard PC artboard width is 1280px. Most Japanese agency and in-house teams use this as the base canvas in Figma. Content area typically sits within 960-1000px, with side margins consuming the rest.",
    platform: "pc",
    values: { columns: 12, designWidth: 1280, contentWidth: "960-1000px" },
  },
  {
    id: "grid_pc_artboard",
    category: "grid",
    rule: "Standard PC artboard: 1280x832",
    details:
      "The default PC design artboard in Japanese web studios is 1280x832px, representing a common laptop viewport. This is the first-view frame designers use to validate above-the-fold content. Some teams use 1440px for wider monitors, but 1280 remains the safe standard.",
    platform: "pc",
    values: { width: 1280, height: 832 },
  },
  {
    id: "grid_mobile_artboard",
    category: "grid",
    rule: "Standard mobile artboard: 375x812",
    details:
      "Mobile designs target 375x812px, matching the iPhone X/11/12/13 logical resolution. This is the universal mobile canvas in Japanese design teams. Some studios also check 390px (iPhone 14/15) but 375 remains the deliverable standard.",
    platform: "mobile",
    values: { width: 375, height: 812 },
  },

  // Spacing
  {
    id: "spacing_side_margins_pc",
    category: "spacing",
    rule: "PC side margins: 140-160px on each side",
    details:
      "At 1280px width, the left and right margins are typically 140-160px each, leaving a ~960-1000px content area. This generous margin gives Japanese layouts their characteristic framed feel. Corporate and government sites sometimes go narrower (120px) to fit more content.",
    platform: "pc",
    values: { marginMin: 140, marginMax: 160, atWidth: 1280 },
  },
  {
    id: "spacing_side_margins_mobile",
    category: "spacing",
    rule: "Mobile side margins: 20px on 375px viewport",
    details:
      "On 375px mobile, side margins are consistently 20px (sometimes 16px for dense layouts). This leaves 335px of usable content width. Japanese mobile designs rarely go below 16px margins because kanji readability suffers at tight margins.",
    platform: "mobile",
    values: { margin: 20, viewport: 375, contentWidth: 335 },
  },
  {
    id: "spacing_section_pc",
    category: "spacing",
    rule: "Section spacing: 100px between major sections on PC",
    details:
      "Major section breaks on PC use 80-100px of vertical space. This creates clear visual separation between content blocks, which is critical in dense Japanese layouts where the eye needs obvious breathing points between information-heavy sections.",
    platform: "pc",
    values: { spacing: 100 },
  },
  {
    id: "spacing_section_mobile",
    category: "spacing",
    rule: "Section spacing: 60px between major sections on mobile",
    details:
      "On mobile, section spacing compresses to 60px. The ratio is roughly 60% of PC spacing. This maintains visual rhythm without wasting precious vertical space on smaller screens.",
    platform: "mobile",
    values: { spacing: 60 },
  },
  {
    id: "spacing_inner",
    category: "spacing",
    rule: "Inner element spacing: 40px within sections",
    details:
      "Within a section, spacing between elements (heading to body, body to CTA, card to card) is typically 40px on PC and 24-32px on mobile. This inner rhythm keeps related content grouped while maintaining readability.",
    platform: "both",
    values: { pc: 40, mobile: "24-32" },
  },
  {
    id: "spacing_first_view",
    category: "spacing",
    rule: "First-view height follows 16:9 ratio (720px at 1280px)",
    details:
      "The hero/first-view area targets a 16:9 aspect ratio: 720px tall at 1280px wide. This comes from Japanese web design tradition where the first view is treated like a poster or billboard. Many LP (landing page) designs measure their KV (key visual) to this exact ratio.",
    platform: "pc",
    values: { width: 1280, height: 720, ratio: "16:9" },
  },

  // Density
  {
    id: "density_expected",
    category: "density",
    rule: "High information density is expected and trusted by Japanese users",
    details:
      "Japanese users associate dense layouts with thoroughness and credibility. Sparse, minimalist layouts can feel untrustworthy or incomplete -- as if the company is hiding information. This is the opposite of Western UX trends. E-commerce sites, news portals, and corporate pages all lean into density. Yahoo! Japan, Rakuten, and kakaku.com exemplify this expectation.",
    platform: "both",
  },
  {
    id: "density_chirashi",
    category: "density",
    rule: "Chirashi (flyer) tradition: pack content, minimize whitespace",
    details:
      "Japanese web layout descends from chirashi (折込チラシ) -- printed advertising flyers stuffed into newspapers. These flyers cram prices, product images, sale badges, and text into every square centimeter. Web design inherited this density ethic. Supermarket sites, real estate listings, and event pages especially follow chirashi logic. Whitespace is seen as wasted opportunity, not elegance.",
    platform: "both",
  },
  {
    id: "density_content_position_mobile",
    category: "density",
    rule: "Content sits slightly above vertical center on mobile",
    details:
      "On mobile, the primary content block or CTA should be positioned slightly above the vertical midpoint of the visible area. This accounts for thumb reach zones and the natural eye landing point. Japanese mobile designers call this the 'golden zone' (ゴールデンゾーン) for tap targets.",
    platform: "mobile",
  },

  // Structure
  {
    id: "structure_alternating",
    category: "structure",
    rule: "Alternating photo/text zigzag layout pattern",
    details:
      "A deeply common Japanese web pattern: sections alternate between image-left/text-right and image-right/text-left in a zigzag. This creates visual rhythm on long-scroll pages and prevents layout monotony. Almost every Japanese corporate site and LP uses this pattern for feature or service explanation sections.",
    platform: "both",
  },
  {
    id: "structure_long_scroller",
    category: "structure",
    rule: "Long single-page scrollers for 30+ demographic",
    details:
      "Japanese sites targeting users aged 30+ overwhelmingly use long single-page scroll layouts rather than multi-page navigation. The entire story -- from hero to features to testimonials to CTA -- lives on one page. This LP (landing page) format is the default for service sites, recruitment pages, and product launches. Pagination is reserved for catalogs and search results.",
    platform: "both",
  },
  {
    id: "structure_boxy_banners",
    category: "structure",
    rule: "Boxy sections with banner dividers between content areas",
    details:
      "Japanese layouts use distinctly boxed sections, often separated by full-width banner-style dividers or colored background bands. Each section has its own visual identity (background color, texture, or subtle pattern). This compartmentalized approach helps users parse dense content and creates clear information hierarchy without relying on whitespace alone.",
    platform: "both",
  },
  {
    id: "structure_header_pc",
    category: "structure",
    rule: "Header height: approximately 100px on PC",
    details:
      "PC headers in Japanese web design typically measure 80-100px tall. They often contain: logo (left), global navigation (center or right), language switcher, and utility links (contact, login). Many Japanese sites use a two-row header -- top bar with utility links and bottom bar with main navigation.",
    platform: "pc",
    values: { height: 100 },
  },
  {
    id: "structure_header_mobile",
    category: "structure",
    rule: "Header height: approximately 70px on mobile",
    details:
      "Mobile headers are typically 56-70px, containing the logo and hamburger menu icon. Japanese mobile headers sometimes include a persistent phone number or inquiry button alongside the hamburger, reflecting the Japanese preference for immediate contact access.",
    platform: "mobile",
    values: { height: 70 },
  },
  {
    id: "structure_footer",
    category: "structure",
    rule: "Footer includes copyright, privacy policy, company info, and sitemap links",
    details:
      "Japanese website footers are comprehensive. Expected elements: company name and address, copyright notice, privacy policy link (個人情報保護方針), terms of use (利用規約), sitemap links organized by category, SNS icons, and sometimes a secondary navigation mirroring the header. Corporate sites also include securities/registration numbers. Sparse footers feel untrustworthy.",
    platform: "both",
  },

  // Responsive
  {
    id: "responsive_breakpoints",
    category: "responsive",
    rule: "Common breakpoints: 1280px (PC), 768px (tablet), 375px (mobile)",
    details:
      "Japanese web projects typically use three breakpoints: 1280px for desktop, 768px for tablet/iPad, and 375px for mobile. Some teams add 1440px for wide monitors. The 768px breakpoint captures iPad portrait. Unlike Western projects that often use fluid scaling, Japanese designs tend toward fixed-width at each breakpoint with distinct layouts.",
    platform: "both",
    values: { pc: 1280, tablet: 768, mobile: 375 },
  },
  {
    id: "responsive_tablet_interpolation",
    category: "responsive",
    rule: "Tablet layouts: designers do not deliver tablet designs, developers interpolate",
    details:
      "In most Japanese web studios, designers only deliver PC and mobile mockups. Tablet (768px) is left to the developer to interpolate. The unspoken rule: use the PC layout but compress side margins, or use a 2-column version of the mobile layout. This is industry standard -- requesting tablet designs from a client or designer is unusual and may signal inexperience.",
    platform: "both",
  },
  {
    id: "responsive_fluid_vs_fixed",
    category: "responsive",
    rule: "Fixed-width layouts at breakpoints are more common than fluid scaling",
    details:
      "Japanese web design favors pixel-perfect layouts at each breakpoint rather than fully fluid responsive scaling. Designers deliver artboards at exact widths (1280, 375) and expect the build to match those frames precisely. Between breakpoints, content areas may scale but the approach is more stepped than continuously fluid.",
    platform: "both",
  },

  // Additional patterns from Japanese web design practice
  {
    id: "structure_cta_repetition",
    category: "structure",
    rule: "Repeat CTA buttons at multiple scroll points",
    details:
      "Japanese LPs place the same CTA button (お問い合わせ, 資料請求, etc.) at multiple points throughout the page -- after the hero, midway through features, and before the footer. This ensures the conversion action is always within reach regardless of where the user stops scrolling. Floating CTAs on mobile are also common.",
    platform: "both",
  },
  {
    id: "structure_breadcrumbs",
    category: "structure",
    rule: "Breadcrumbs are expected on all interior pages",
    details:
      "Breadcrumb navigation (パンくずリスト) is a strong expectation on Japanese websites, especially corporate and e-commerce. It appears below the header on every interior page. Omitting breadcrumbs is considered a usability failure and also hurts SEO in the Japanese search landscape.",
    platform: "pc",
  },
  {
    id: "density_table_layouts",
    category: "density",
    rule: "Tables and structured grids preferred for comparing information",
    details:
      "Japanese sites heavily use tables (テーブル) for pricing, specs, plans, and feature comparisons. Users expect structured grid layouts rather than cards or free-form comparisons. Tables feel organized and trustworthy. On mobile, horizontal scroll tables or accordion-collapsed rows are used rather than eliminating the table format.",
    platform: "both",
  },
  {
    id: "structure_news_list",
    category: "structure",
    rule: "News/updates section (お知らせ) on every corporate homepage",
    details:
      "Every Japanese corporate site has a prominent news/updates section (お知らせ or ニュース) on the homepage. It shows date-stamped entries proving the site is actively maintained. An empty or outdated news section signals a neglected company. Format: date (YYYY.MM.DD) + category tag + title, listed vertically.",
    platform: "both",
  },
  {
    id: "spacing_card_gap",
    category: "spacing",
    rule: "Card grid gaps: 24-40px PC, 16-20px mobile",
    details:
      "When using card-based layouts (for blogs, products, team members), the gap between cards is 24-40px on PC and 16-20px on mobile. Japanese card grids tend to use tighter gaps than Western designs because of the density preference. 3-column or 4-column grids on PC, 1-2 columns on mobile.",
    platform: "both",
    values: { pcMin: 24, pcMax: 40, mobileMin: 16, mobileMax: 20 },
  },
  {
    id: "structure_megamenu",
    category: "structure",
    rule: "Mega menus with full navigation tree on hover",
    details:
      "Large Japanese corporate sites use mega menus that reveal the full navigation tree on hover. These dropdown panels show all sub-pages organized by category, often with thumbnail images. Users expect to preview the site structure without clicking. This reflects the Japanese preference for seeing all options at once rather than progressive disclosure.",
    platform: "pc",
  },
  {
    id: "structure_sticky_header",
    category: "structure",
    rule: "Sticky headers that shrink on scroll",
    details:
      "Most Japanese sites use sticky headers that reduce in height after scrolling past the hero area. The header compresses from ~100px to ~60px, keeping navigation accessible without dominating the viewport. The logo often scales down and utility links may hide, leaving only the primary navigation visible.",
    platform: "pc",
    values: { fullHeight: 100, shrunkHeight: 60 },
  },
  {
    id: "structure_floating_contact",
    category: "structure",
    rule: "Floating contact/inquiry button on the right edge",
    details:
      "Japanese corporate and B2B sites frequently place a persistent floating button on the right edge of the viewport. It typically says お問い合わせ (contact/inquiry) or 資料請求 (request materials). On mobile, this becomes a fixed bottom bar with phone and contact buttons. This always-visible conversion point is considered essential for business sites.",
    platform: "both",
  },
];
