export interface ColorMeaning {
  color: string;
  hex: string;
  japanese_name: string;
  positive_meaning: string;
  negative_meaning: string;
  usage_notes: string;
}

export type VisualCategory = "color" | "imagery" | "icons" | "shadows" | "corners" | "animation";

export interface VisualRule {
  id: string;
  category: VisualCategory;
  rule: string;
  details: string;
}

export const COLOR_MEANINGS: ColorMeaning[] = [
  {
    color: "red",
    hex: "#E60033",
    japanese_name: "赤 (aka)",
    positive_meaning: "Prosperity, fortune, vitality, celebration, energy",
    negative_meaning: "Writing a person's name in red = death association (funeral ink, 赤字で名前を書く is taboo)",
    usage_notes: "Red is NOT a danger/error-only color in Japan. It is used freely as a primary brand color (Rakuten, Docomo, Japan Post). Avoid red text on personal names. Safe for buttons, banners, sale badges, and headings.",
  },
  {
    color: "white",
    hex: "#FFFFFF",
    japanese_name: "白 (shiro)",
    positive_meaning: "Purity, cleanliness, sacredness, new beginnings",
    negative_meaning: "Mourning and death (white is the traditional funeral color in Japan, not black)",
    usage_notes: "Context-dependent. Excellent for clean UI backgrounds and whitespace-heavy layouts. Be cautious pairing all-white with black in ceremonial or gift-related contexts as it reads as funeral (香典 / koden envelope aesthetic).",
  },
  {
    color: "black",
    hex: "#000000",
    japanese_name: "黒 (kuro)",
    positive_meaning: "Formality, power, sophistication, mystery",
    negative_meaning: "Combined with white evokes funeral context (黒白 = koku-haku, the funeral envelope color scheme)",
    usage_notes: "Black + white only designs can feel somber. Add an accent color to break the funeral association. Black is fine for text and luxury branding (similar to Western usage).",
  },
  {
    color: "gold",
    hex: "#C9A84C",
    japanese_name: "金 (kin)",
    positive_meaning: "Luxury, celebration, prestige, wealth, achievement",
    negative_meaning: "Overuse feels gaudy or untrustworthy",
    usage_notes: "Standard for premium tiers, loyalty programs, seasonal celebrations (New Year, Osechi). Pairs naturally with red and black. Common in banking and financial services branding.",
  },
  {
    color: "pink",
    hex: "#F4A7B9",
    japanese_name: "桜色 (sakura-iro)",
    positive_meaning: "Spring, femininity, celebration, youth, softness",
    negative_meaning: "Can feel juvenile if overused in professional contexts",
    usage_notes: "Sakura pink is deeply cultural and seasonal. Used in spring campaigns across all industries. Ranges from soft pastel (#FDDDE6) to vivid (#FF6B9D). Not limited to female-targeted products.",
  },
  {
    color: "blue",
    hex: "#0068B7",
    japanese_name: "青 (ao)",
    positive_meaning: "Trust, stability, intelligence, corporate reliability",
    negative_meaning: "Can feel cold or impersonal",
    usage_notes: "Similar to Western associations. Dominant in corporate, banking, tech, and government sites. Japanese blue (藍色 / ai-iro, traditional indigo) is a culturally rich variant worth considering.",
  },
  {
    color: "green",
    hex: "#3EB370",
    japanese_name: "緑 (midori)",
    positive_meaning: "Nature, freshness, health, safety, environmental consciousness",
    negative_meaning: "Minimal negative associations",
    usage_notes: "Common in food, health, agriculture, and eco-friendly branding. Japanese green tea (抹茶 / matcha) green is a culturally resonant shade. Also used for 'safe' and 'go' indicators like in Western UI.",
  },
  {
    color: "purple",
    hex: "#884898",
    japanese_name: "紫 (murasaki)",
    positive_meaning: "Nobility, elegance, spirituality, wisdom",
    negative_meaning: "Can feel old-fashioned if shade is too dark",
    usage_notes: "Historically reserved for the highest ranks of Japanese society. Effective for luxury and beauty brands. Lighter lavender variants feel more modern.",
  },
  {
    color: "yellow",
    hex: "#FDD35C",
    japanese_name: "黄 (ki)",
    positive_meaning: "Happiness, warmth, childlike energy, attention-grabbing",
    negative_meaning: "Associated with beginners (初心者マーク / shoshinsha mark is yellow-green)",
    usage_notes: "Used heavily in sale banners and attention-grabbing badges. The yellow-green beginner driver mark is culturally specific. Pairs well with red for promotional materials.",
  },
];

export const VISUAL_RULES: VisualRule[] = [
  // Color rules
  {
    id: "color_red_positive",
    category: "color",
    rule: "Red means prosperity and fortune, not danger",
    details: "In Japanese design, red (赤) is the color of vitality, celebration, and good fortune. It is used freely as a primary brand color across major sites like Rakuten, Docomo, and Japan Post. Do not limit red to error states. It is appropriate for primary buttons, headers, banners, and branding.",
  },
  {
    id: "color_no_red_names",
    category: "color",
    rule: "Never write a person's name in red text",
    details: "Writing someone's name in red ink is associated with death in Japanese culture. Historically, names on gravestones (墓石) and funeral-related documents are written in red (朱書き). This is a deeply ingrained taboo. Always use black or dark text for personal names, even in lists or user profiles.",
  },
  {
    id: "color_white_mourning",
    category: "color",
    rule: "White means purity but also mourning depending on context",
    details: "White is the traditional color of mourning in Japan (white kimono for the deceased, white chrysanthemums at funerals). In UI, white is fine for backgrounds and clean layouts. Be cautious when designing celebratory or gift-related interfaces: all-white themes can inadvertently evoke funeral imagery.",
  },
  {
    id: "color_black_white_funeral",
    category: "color",
    rule: "Black and white together evoke funeral context",
    details: "The black-and-white (黒白 / koku-haku) color combination is the standard for condolence envelopes (香典袋) and funeral notices. Avoid stark black-and-white-only designs for celebratory or ecommerce UIs. Add at least one accent color to break the association.",
  },
  {
    id: "color_gold_luxury",
    category: "color",
    rule: "Gold signals luxury and celebration",
    details: "Gold (金) is associated with prestige, wealth, and festive occasions. It is standard for premium membership tiers, New Year campaigns (お正月), seasonal gift packaging, and financial branding. Use metallic gold gradients sparingly; flat gold tones work better in digital UI.",
  },
  {
    id: "color_sakura_pink",
    category: "color",
    rule: "Pink and sakura colors represent spring, femininity, and celebration",
    details: "Sakura pink (桜色) is deeply tied to spring and celebration in Japanese culture. It is used in seasonal campaigns across all industries, not just female-targeted products. Ranging from soft pastels to vivid pinks, it evokes cherry blossom season (花見) and renewal.",
  },
  {
    id: "color_blue_trust",
    category: "color",
    rule: "Blue communicates trust and stability, similar to Western usage",
    details: "Blue is the dominant choice for corporate, banking, government, and tech websites in Japan, similar to Western conventions. Traditional Japanese indigo (藍色 / ai-iro) is a culturally rich blue variant that adds a Japanese feel while maintaining trust associations.",
  },
  {
    id: "color_green_nature",
    category: "color",
    rule: "Green represents nature, freshness, and health",
    details: "Green (緑) is heavily used in food, health, agriculture, and eco-conscious branding. Matcha green (抹茶色) is a culturally resonant shade unique to Japan. Green works well for safe/success states similar to Western conventions.",
  },
  {
    id: "color_bright_palette",
    category: "color",
    rule: "Bright bold colors are standard; muted dark palettes were uncommon until recently",
    details: "Japanese web design traditionally favors bright, saturated colors. Muted or dark color palettes are a more recent Western import. High-contrast, vivid color combinations that might feel 'loud' in Western design are considered normal and inviting in Japanese design. Promotional banners especially use bright reds, yellows, and pinks.",
  },
  {
    id: "color_dark_theme_lag",
    category: "color",
    rule: "Dark theme adoption in Japan lags 2-3 years behind the West",
    details: "Dark mode / dark themes were adopted much later in Japan compared to Western markets. Many major Japanese sites still default to light themes. When offering dark mode, treat it as optional and secondary. Do not assume users expect or prefer it. Light, bright, information-dense layouts remain the norm.",
  },
  // Imagery rules
  {
    id: "imagery_manga_illustration",
    category: "imagery",
    rule: "Manga and anime-style illustration is used across all industries including banks and government",
    details: "Unlike Western design where illustration styles are limited by industry, Japanese design freely uses manga/anime-style characters (キャラクター) even for serious industries. Banks, insurance companies, government agencies, and infrastructure companies all use cute mascot characters (ゆるキャラ). This is not unprofessional; it builds approachability and trust.",
  },
  {
    id: "imagery_dense_small_images",
    category: "imagery",
    rule: "Dense small images are preferred over a few large hero images",
    details: "Japanese web design favors many small, information-rich images arranged in grids over single large hero images. Product pages show multiple thumbnail images. Category pages use dense image grids. This aligns with the information-density preference in Japanese web culture. A single hero image with lots of whitespace can feel empty and lacking content.",
  },
  {
    id: "imagery_real_people",
    category: "imagery",
    rule: "Show real people photos for services involving interpersonal connection",
    details: "For services where personal interaction matters (healthcare, education, consulting, real estate agents), show photographs of actual staff and team members. Japanese users look for human faces to build trust. Staff photos with name and title build credibility. This is especially important for services where the user will interact with a specific person.",
  },
  {
    id: "imagery_instagram_social_proof",
    category: "imagery",
    rule: "Instagram embeds serve as trust and social proof",
    details: "Embedding Instagram posts on product and brand pages is a common pattern in Japanese web design. It functions as social proof (口コミ / kuchikomi). Users expect to see real customer photos and social media activity. This pattern is especially prevalent in fashion, food, beauty, and lifestyle industries.",
  },
  {
    id: "imagery_bright_banners",
    category: "imagery",
    rule: "Bright banners and promotional badges are normal, not spammy",
    details: "Dense, colorful promotional banners with bold text, price callouts, and urgency badges are standard practice in Japanese ecommerce and service sites. What might look 'spammy' in Western design is expected and trustworthy in Japanese context. Rakuten's banner-heavy style is the norm, not the exception. Users scan these banners for deals and information.",
  },
  // Icon rules
  {
    id: "icons_uniform_stroke",
    category: "icons",
    rule: "Icon stroke weights must be uniform across the entire site",
    details: "Mixing icons with different stroke weights (e.g., 1px and 2px, or filled and outlined) breaks visual consistency and feels careless. Choose one icon style (outlined or filled) and one stroke weight, then apply it consistently across all pages. This applies to navigation icons, feature icons, action icons, and decorative icons alike.",
  },
  {
    id: "icons_no_red_cross",
    category: "icons",
    rule: "The red cross symbol is legally restricted; do not use it in designs",
    details: "The Red Cross emblem (赤十字マーク) is protected under Japanese law (赤十字の標章及び名称等の使用の制限に関する法律) and international Geneva Conventions. Using it in UI design for health, medical, or first-aid features is illegal. Use a different symbol such as a plus sign in a different color, a heart, or a medical-specific icon instead.",
  },
  // Shadow rules
  {
    id: "shadows_consistent_direction",
    category: "shadows",
    rule: "Shadow direction must be consistent across the entire page",
    details: "All drop shadows on a page should come from the same implied light source, typically top-left or directly above. Inconsistent shadow directions (e.g., one card with shadow-bottom-right and another with shadow-bottom-left) looks like a bug. Define a single shadow direction in your design system and apply it uniformly to all elevated elements.",
  },
  {
    id: "shadows_no_halation",
    category: "color",
    rule: "No halation: do not place two vivid same-brightness colors adjacent to each other",
    details: "Halation (ハレーション) occurs when two highly saturated colors of similar brightness are placed next to each other, creating a vibrating or glowing effect at the boundary. This is explicitly taught as a design anti-pattern in Japanese design education. Always ensure sufficient brightness contrast between adjacent color blocks. Insert a neutral separator (white, gray, or black border) between vivid colors if needed.",
  },
  // Corner rules
  {
    id: "corners_nested_radius",
    category: "corners",
    rule: "Nested rounded corners: outer radius = inner radius + padding",
    details: "When a rounded-corner container holds a rounded-corner child element, the outer border-radius should equal the inner border-radius plus the padding between them. For example, if the inner card has border-radius: 8px and there is 12px of padding, the outer container should have border-radius: 20px (8 + 12). This creates optically smooth concentric curves instead of awkward parallel radii.",
  },
  // Animation rules
  {
    id: "animation_subtle_preferred",
    category: "animation",
    rule: "Subtle functional animations preferred over decorative motion",
    details: "Japanese UI favors purposeful micro-animations: hover state transitions, loading indicators, smooth page transitions, and accordion open/close effects. Avoid flashy decorative animations that serve no functional purpose. Motion should guide attention and provide feedback, not entertain. Keep durations short (200-400ms) and easing natural.",
  },
];
