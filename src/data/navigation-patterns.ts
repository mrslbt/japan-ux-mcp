export type NavigationCategory = "header" | "footer" | "menu" | "search" | "breadcrumb" | "pagination";
export type Platform = "pc" | "mobile" | "both";

export interface NavigationRule {
  id: string;
  category: NavigationCategory;
  rule: string;
  details: string;
  platform: Platform;
}

export interface HeaderPattern {
  element: string;
  required: boolean;
  platform: Platform;
  details: string;
}

export interface FooterPattern {
  element: string;
  required: boolean;
  details: string;
}

export const NAVIGATION_RULES: NavigationRule[] = [
  // Header rules
  {
    id: "header_sticky_nav",
    category: "header",
    rule: "Use a sticky/floating header with navigation and CTA button",
    details: "Japanese users expect the header to remain accessible while scrolling. Include primary navigation links and a prominent CTA button (e.g., お問い合わせ / contact, 資料請求 / request info, 会員登録 / sign up). The sticky header should collapse to a compact version on scroll to save vertical space.",
    platform: "both",
  },
  {
    id: "header_height_pc",
    category: "header",
    rule: "Header height should be approximately 100px on PC",
    details: "Japanese PC site headers are taller than typical Western headers (~60-80px) because they accommodate more navigation elements: logo, primary nav, utility nav (login, cart, language), phone number, and search. Target around 100px to fit all elements without feeling cramped. Multi-row headers with a top utility bar and a main navigation bar are common.",
    platform: "pc",
  },
  {
    id: "header_height_mobile",
    category: "header",
    rule: "Header height should be approximately 70px on mobile",
    details: "Mobile headers should be compact but still include the logo, hamburger menu icon, and a key action (search or cart). Around 70px balances visibility with preserving screen real estate for content. Ensure touch targets are at least 44px.",
    platform: "mobile",
  },
  {
    id: "header_phone_number",
    category: "header",
    rule: "Display a phone number in the header for trust",
    details: "A visible phone number in the header signals that the business is legitimate and reachable. This is a strong trust signal in Japanese web culture, especially for B2B, services, and ecommerce. On mobile, make it a clickable tel: link. On PC, display it prominently near the logo or in the utility bar. Format: 03-XXXX-XXXX or 0120-XXX-XXX (toll-free).",
    platform: "both",
  },
  {
    id: "header_language_switcher",
    category: "header",
    rule: "Place language switcher in the top-right corner",
    details: "If the site supports multiple languages, the language switcher should be in the top-right corner of the header, typically in a utility/secondary navigation bar above the main header. Use the globe icon or language names (日本語 / English / 中文). Do not use country flags as language indicators.",
    platform: "both",
  },
  {
    id: "header_social_links",
    category: "header",
    rule: "Include LINE and social media links in header or footer",
    details: "LINE is the dominant messaging platform in Japan (over 90M users). Include the LINE official account link alongside Twitter/X, Instagram, and Facebook. LINE is more important than Facebook in Japan. Place social icons in the header utility bar or footer. Link to the official LINE account for customer communication.",
    platform: "both",
  },
  // Menu rules
  {
    id: "menu_hamburger_mobile_only",
    category: "menu",
    rule: "Hamburger menu is for mobile only; always show visible nav links on PC",
    details: "Japanese PC users expect to see all primary navigation options visible in the header without having to click a hamburger menu. Hiding navigation behind a hamburger icon on desktop makes the site feel incomplete or broken. On mobile, the hamburger menu is standard and expected. PC sites should have full horizontal navigation bars.",
    platform: "both",
  },
  {
    id: "menu_mega_menu_ecommerce",
    category: "menu",
    rule: "Mega menus are standard for ecommerce category navigation",
    details: "Large dropdown mega menus that show multiple category levels, featured products, and promotional banners are the norm in Japanese ecommerce (Rakuten, Amazon JP, Yahoo Shopping). Users expect to browse extensive category trees from the header. Include images, subcategory links, and promotional highlights in mega menu panels.",
    platform: "pc",
  },
  {
    id: "menu_tab_navigation",
    category: "menu",
    rule: "Use tab navigation for product categories and content sections",
    details: "Horizontal tabs are a preferred pattern for switching between product categories, content types, or filter groups. Tabs should have clear active states and be scannable. Common on product listing pages, search results, and content portals. Ensure the active tab is visually distinct with color, underline, or background change.",
    platform: "both",
  },
  {
    id: "menu_side_navigation",
    category: "menu",
    rule: "Use side navigation for settings and account pages",
    details: "Account dashboards, settings pages, and admin interfaces should use a left-side vertical navigation panel on PC. This pattern is familiar from major Japanese services (楽天, Yahoo! Japan, LINE). On mobile, these collapse into a top tab bar or accordion menu. Include icons alongside text labels for scannability.",
    platform: "both",
  },
  {
    id: "menu_grid_section_nav",
    category: "menu",
    rule: "Grid-based section navigation helps older users find content",
    details: "For audiences that include older users (which is significant in Japan's aging population), provide grid-based navigation sections with large, clearly labeled tiles. Each tile should have an icon and text label. This pattern is common on municipal government sites, healthcare portals, and banking dashboards. Tiles should be at least 120x120px with 16px+ text.",
    platform: "both",
  },
  // Search rules
  {
    id: "search_passive_browsing",
    category: "search",
    rule: "Design for passive browsing over active search: prioritize osusume/recommended lists",
    details: "Japanese users often prefer browsing curated recommendations (おすすめ / osusume) over using search. Design prominent 'recommended', 'popular', and 'new arrivals' sections. Ranking lists (ランキング) are extremely effective. Search should exist but should not be the only way to discover content. Editorial curation and category browsing are primary discovery paths.",
    platform: "both",
  },
  // Breadcrumb rules
  {
    id: "breadcrumb_deep_structures",
    category: "breadcrumb",
    rule: "Breadcrumbs are important for deep site structures",
    details: "Japanese sites often have deep hierarchical structures (5+ levels). Breadcrumbs (パンくずリスト / pankuzu risuto) are essential for orientation and navigation. Place them below the header and above the page title. Use the > or / separator. Include the current page as the last non-linked item. Breadcrumbs also support SEO for Japanese search engines.",
    platform: "both",
  },
  {
    id: "breadcrumb_back_to_top",
    category: "breadcrumb",
    rule: "'Back to top' button is standard on long-scroll pages",
    details: "A floating 'back to top' button (ページトップへ戻る or simply ▲ TOP) is expected on long-scrolling pages. Place it in the bottom-right corner as a fixed-position element. Show it after the user scrolls past the first viewport. Japanese pages tend to be very long with dense content, making this navigation aid essential rather than optional.",
    platform: "both",
  },
  // Footer rules
  {
    id: "footer_required_links",
    category: "footer",
    rule: "Footer must include copyright, privacy policy, tokushoho link (ecommerce), company info, and sitemap",
    details: "Japanese site footers are legally and culturally expected to contain: copyright notice, privacy policy (プライバシーポリシー), company information (会社概要), and sitemap. For ecommerce, the 特定商取引法に基づく表記 (Act on Specified Commercial Transactions disclosure) is legally required. Missing these elements signals an untrustworthy or incomplete site.",
    platform: "both",
  },
  {
    id: "footer_text_heavy_links",
    category: "footer",
    rule: "Everything is a hyperlink: text-heavy pages with many inline links are expected",
    details: "Japanese web pages, especially footers, contain dense text with numerous hyperlinks. Unlike Western minimalist footers, Japanese footers often resemble sitemaps with links to every major section, sub-section, and important page. This is not cluttered design; it is expected and helps users find content through browsing. Link colors should be clearly distinguishable from body text.",
    platform: "both",
  },
  // Pagination rules
  {
    id: "pagination_numbered",
    category: "pagination",
    rule: "Use numbered pagination with first/last page links for list pages",
    details: "Japanese users prefer numbered pagination over infinite scroll for search results and product listings. Include page numbers, previous/next arrows, and direct links to the first and last pages. Show the current page number clearly. This gives users a sense of scale and position within results. Infinite scroll can be used for social feeds but not for search or product catalogs.",
    platform: "both",
  },
];

export const HEADER_PATTERNS: HeaderPattern[] = [
  {
    element: "Logo",
    required: true,
    platform: "both",
    details: "Company/service logo, top-left position. Links to homepage. On mobile, centered or left-aligned.",
  },
  {
    element: "Primary navigation links",
    required: true,
    platform: "pc",
    details: "Horizontal navigation bar with all main sections visible. Never hide behind a hamburger on PC.",
  },
  {
    element: "Hamburger menu icon",
    required: true,
    platform: "mobile",
    details: "Three-line icon in top-right or top-left. Opens a slide-out or full-screen menu with all navigation options.",
  },
  {
    element: "Phone number",
    required: true,
    platform: "both",
    details: "Displayed prominently for trust. Clickable tel: link on mobile. Show business hours alongside (e.g., 受付時間: 9:00-18:00).",
  },
  {
    element: "CTA button",
    required: true,
    platform: "both",
    details: "Primary action button: お問い合わせ (contact), 資料請求 (request info), 無料相談 (free consultation), or 会員登録 (sign up).",
  },
  {
    element: "Search bar or icon",
    required: false,
    platform: "both",
    details: "Visible search input on PC (often in utility bar). Magnifying glass icon on mobile that expands to full-width search overlay.",
  },
  {
    element: "Utility navigation",
    required: false,
    platform: "pc",
    details: "Secondary row above main nav with: login/logout, cart, favorites, language switcher, member area links.",
  },
  {
    element: "Language switcher",
    required: false,
    platform: "both",
    details: "Top-right corner placement. Globe icon or text labels (日本語 / English). Do not use country flags for language selection.",
  },
  {
    element: "Social media links",
    required: false,
    platform: "both",
    details: "LINE, Twitter/X, Instagram icons. LINE is highest priority for Japanese audiences. Can be in header utility bar or footer.",
  },
  {
    element: "Cart icon with badge",
    required: false,
    platform: "both",
    details: "For ecommerce: cart icon with item count badge, top-right area. Should be persistent across all pages.",
  },
];

export const FOOTER_PATTERNS: FooterPattern[] = [
  {
    element: "Copyright notice",
    required: true,
    details: "Format: (C) 2024 Company Name Co., Ltd. All Rights Reserved. Japanese companies often include Co., Ltd. or 株式会社.",
  },
  {
    element: "Privacy policy link",
    required: true,
    details: "プライバシーポリシー or 個人情報保護方針. Links to full privacy policy page. Required under Japan's APPI (個人情報保護法).",
  },
  {
    element: "Company information",
    required: true,
    details: "会社概要 (company overview) link. Leads to page with company name, address, CEO name, founding date, capital, and employee count.",
  },
  {
    element: "Tokushoho disclosure (ecommerce)",
    required: true,
    details: "特定商取引法に基づく表記. Legally required for all ecommerce sites in Japan. Must include seller info, return policy, payment methods, and delivery terms.",
  },
  {
    element: "Sitemap links",
    required: true,
    details: "Dense link sections organized by category, replicating the site structure. Japanese footers often serve as full site navigation. Common to have 20-50+ links in the footer.",
  },
  {
    element: "Contact information",
    required: true,
    details: "Phone number, email, and business hours. Physical address for trust. Some include a Google Maps embed or link.",
  },
  {
    element: "Social media links",
    required: false,
    details: "LINE official account (highest priority), Twitter/X, Instagram, Facebook, YouTube. LINE is more important than Facebook in Japan.",
  },
  {
    element: "Back to top button",
    required: false,
    details: "ページトップへ戻る or ▲TOP. Can be in the footer area or as a fixed floating button. Standard on long pages.",
  },
  {
    element: "SSL/security badges",
    required: false,
    details: "Trust badges showing SSL certification, payment security logos, or industry certifications. Common in ecommerce and financial sites.",
  },
  {
    element: "Recruitment link",
    required: false,
    details: "採用情報 (recruitment info). Many Japanese corporate sites include a link to job listings in the footer. Common even for small companies.",
  },
];
