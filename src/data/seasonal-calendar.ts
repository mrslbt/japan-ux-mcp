// =============================================================================
// Japanese Seasonal Calendar for UX Design
// =============================================================================
// Japan's design culture is deeply seasonal. Colors, imagery, greetings, and
// campaigns shift with the 四季 (four seasons) and the 二十四節気 (24 sekki
// microseasons). Getting seasonality wrong — or ignoring it — signals that a
// product was not built for Japan.
// =============================================================================

export interface SeasonColor {
  name_ja: string;
  name_en: string;
  hex: string;
}

export interface Season {
  id: string;
  name_ja: string;
  name_en: string;
  months: number[];
  colors: SeasonColor[];
  design_notes: string[];
}

export interface SeasonalEvent {
  id: string;
  name_ja: string;
  name_en: string;
  date: string;
  month: number;
  design_impact: string;
  business_notes: string;
}

export interface Microseason {
  id: string;
  name_ja: string;
  name_en: string;
  approximate_date: string;
  design_notes: string;
}

export interface SeasonalContext {
  current_season: Season;
  active_events: SeasonalEvent[];
  upcoming_events: SeasonalEvent[];
  recommended_colors: SeasonColor[];
  current_microseason: Microseason | null;
}

// ---------------------------------------------------------------------------
// Seasons (四季)
// ---------------------------------------------------------------------------

export const SEASONS: Season[] = [
  {
    id: "spring",
    name_ja: "春",
    name_en: "Spring",
    months: [3, 4, 5],
    colors: [
      { name_ja: "桜色", name_en: "Sakura pink", hex: "#FADADD" },
      { name_ja: "薄桜", name_en: "Light sakura", hex: "#FFE0E0" },
      { name_ja: "若草色", name_en: "Fresh green", hex: "#B9D08B" },
      { name_ja: "若葉色", name_en: "Young leaf green", hex: "#A8D54E" },
      { name_ja: "藤色", name_en: "Wisteria purple", hex: "#BAA1CF" },
      { name_ja: "菜の花色", name_en: "Rapeseed yellow", hex: "#FFEC47" },
      { name_ja: "桃色", name_en: "Peach pink", hex: "#F58F98" },
      { name_ja: "薄緑", name_en: "Pale green", hex: "#CCDDB8" },
    ],
    design_notes: [
      "Sakura motifs are expected from late March through mid-April — use petals, branches, or gradient overlays",
      "Fresh, light color palettes signal renewal and new beginnings (新生活)",
      "April is the start of the fiscal year, school year, and hiring season — 'new start' messaging resonates",
      "Wisteria (藤) imagery follows sakura in late April to May",
      "Avoid heavy, dark designs — they clash with the lightness expected in spring",
      "Green tea (新茶) season in May can inform food/beverage imagery",
    ],
  },
  {
    id: "summer",
    name_ja: "夏",
    name_en: "Summer",
    months: [6, 7, 8],
    colors: [
      { name_ja: "瑠璃色", name_en: "Lapis lazuli blue", hex: "#1E50A2" },
      { name_ja: "浅葱色", name_en: "Light indigo", hex: "#00A3AF" },
      { name_ja: "向日葵色", name_en: "Sunflower yellow", hex: "#FFB500" },
      { name_ja: "藍色", name_en: "Indigo", hex: "#264348" },
      { name_ja: "白色", name_en: "White", hex: "#FFFFFF" },
      { name_ja: "水色", name_en: "Light water blue", hex: "#BCE2E8" },
      { name_ja: "朝顔色", name_en: "Morning glory blue", hex: "#3C6690" },
      { name_ja: "金魚色", name_en: "Goldfish red-orange", hex: "#E73B2F" },
    ],
    design_notes: [
      "June is rainy season (梅雨) — avoid outdoor/sunshine imagery, use rain and hydrangea (紫陽花) motifs instead",
      "Post-rainy season (mid-July), shift to ocean, fireworks, and festival imagery",
      "Cool blues and whites evoke refreshment (涼) — a core summer design principle",
      "Fireworks (花火), wind chimes (風鈴), and goldfish (金魚) are quintessential summer visual motifs",
      "Summer festival (夏祭り) aesthetics: lanterns, yukata, shaved ice",
      "Indigo (藍) is the traditional summer color for fabrics and design",
      "Use negative space and clean layouts to evoke coolness — cluttered designs feel hot",
    ],
  },
  {
    id: "autumn",
    name_ja: "秋",
    name_en: "Autumn",
    months: [9, 10, 11],
    colors: [
      { name_ja: "紅葉色", name_en: "Autumn leaf vermilion", hex: "#CB4042" },
      { name_ja: "金色", name_en: "Gold", hex: "#C5A05A" },
      { name_ja: "栗色", name_en: "Chestnut brown", hex: "#704B38" },
      { name_ja: "葡萄色", name_en: "Grape purple", hex: "#6C3461" },
      { name_ja: "柿色", name_en: "Persimmon orange", hex: "#DE6A35" },
      { name_ja: "黄檗色", name_en: "Yellow ochre", hex: "#D6C949" },
      { name_ja: "茜色", name_en: "Madder red", hex: "#B7282E" },
      { name_ja: "朽葉色", name_en: "Fallen leaf brown", hex: "#917347" },
    ],
    design_notes: [
      "Maple leaves (紅葉/もみじ) are the dominant autumn motif, peaking in November",
      "Warm, rich color palettes replace summer coolness — reds, golds, deep purples",
      "Harvest themes: rice, chestnuts, persimmons, mushrooms, sweet potatoes",
      "Moon viewing (月見) in September — full moon motifs are appropriate",
      "The phrase '食欲の秋' (autumn appetite) makes this peak season for food marketing",
      "Reading (読書の秋) and sports (スポーツの秋) are cultural themes to reference",
      "Gradual deepening of colors as the season progresses — early autumn is warmer, late autumn darker",
    ],
  },
  {
    id: "winter",
    name_ja: "冬",
    name_en: "Winter",
    months: [12, 1, 2],
    colors: [
      { name_ja: "白色", name_en: "Snow white", hex: "#FFFFFF" },
      { name_ja: "銀色", name_en: "Silver", hex: "#C0C0C0" },
      { name_ja: "深緋", name_en: "Deep crimson", hex: "#A22041" },
      { name_ja: "紺色", name_en: "Dark navy", hex: "#1B294B" },
      { name_ja: "金色", name_en: "Gold", hex: "#C5A05A" },
      { name_ja: "松葉色", name_en: "Pine needle green", hex: "#3B7960" },
      { name_ja: "紅梅色", name_en: "Plum blossom pink", hex: "#E86B7D" },
      { name_ja: "鶯色", name_en: "Warbler green", hex: "#6E7955" },
    ],
    design_notes: [
      "December is dominated by Christmas (romantic, not family) and year-end gift giving (お歳暮)",
      "New Year (正月) is the most important design moment: pine (松), bamboo (竹), plum (梅) motifs",
      "Red and gold dominate New Year designs — auspicious colors (めでたい)",
      "January designs feature cranes (鶴), sunrise (初日の出), and Mt. Fuji",
      "February brings Valentine's Day — dark chocolate tones, elegant packaging aesthetics",
      "Late February: plum blossoms (梅) signal the transition toward spring",
      "Warm textures and cozy imagery: hot springs, nabe pots, kotatsu",
      "Avoid cold/sterile minimalism — winter design in Japan is warm and layered",
    ],
  },
];

// ---------------------------------------------------------------------------
// Major Events & Holidays
// ---------------------------------------------------------------------------

export const EVENTS: SeasonalEvent[] = [
  // ── January ──────────────────────────────────────────────────────────
  {
    id: "event_oshogatsu",
    name_ja: "正月",
    name_en: "New Year",
    date: "Jan 1-3",
    month: 1,
    design_impact:
      "The single biggest design moment in Japan. Sites switch to 正月 themes (red/gold, pine/bamboo/plum, crane/turtle motifs). Many businesses display 年始挨拶 (New Year greeting) banners. First sale (初売り) campaigns launch Jan 1-2. Lucky bags (福袋) are a massive ecommerce event.",
    business_notes:
      "Most businesses closed Jan 1-3. Many extend to Jan 4-5. Do NOT expect B2B responses. Ecommerce runs 初売り and 福袋 campaigns — plan inventory and server capacity for Jan 1 traffic spikes. Email marketing: send 年賀 (New Year greeting) messages.",
  },
  {
    id: "event_seijin_no_hi",
    name_ja: "成人の日",
    name_en: "Coming of Age Day",
    date: "2nd Monday of January",
    month: 1,
    design_impact:
      "Imagery of young adults in furisode (振袖) kimono. Celebration and aspiration themes. Youth-targeted brands can run campaigns around adulthood and independence.",
    business_notes:
      "National holiday. Photo studios, kimono rental, beauty salons peak. Not a major ecommerce event but relevant for fashion, beauty, and education sectors targeting 18-20 year olds.",
  },
  // ── February ─────────────────────────────────────────────────────────
  {
    id: "event_setsubun",
    name_ja: "節分",
    name_en: "Setsubun (Bean Throwing)",
    date: "Feb 3",
    month: 2,
    design_impact:
      "Oni (demon) masks and bean motifs. Ehomaki (恵方巻) sushi roll promotions dominate food retail. A fun, lighthearted design moment. Less formal than other holidays.",
    business_notes:
      "Food retail peaks for ehomaki. Convenience stores and supermarkets run major campaigns. Direction-based marketing (the lucky direction changes yearly). Not a national holiday but culturally significant.",
  },
  {
    id: "event_valentines",
    name_ja: "バレンタインデー",
    name_en: "Valentine's Day",
    date: "Feb 14",
    month: 2,
    design_impact:
      "In Japan, women give chocolate to men — both romantic (本命チョコ) and obligatory (義理チョコ). Rich chocolate browns, elegant packaging aesthetics, and luxury gifting imagery. Department store chocolate floors are a visual spectacle.",
    business_notes:
      "Massive confectionery/luxury food ecommerce event. Campaigns start late January. Self-gifting (自分チョコ/ご褒美チョコ) is a growing segment. B2B-irrelevant but B2C chocolate, gift, and department store sites must prepare heavily.",
  },
  // ── March ────────────────────────────────────────────────────────────
  {
    id: "event_hinamatsuri",
    name_ja: "ひな祭り",
    name_en: "Hinamatsuri (Girls' Day / Doll Festival)",
    date: "Mar 3",
    month: 3,
    design_impact:
      "Pink, red, and green color schemes. Hina doll imagery. Peach blossom (桃の花) motifs. Chirashizushi and hina-arare snack imagery for food brands. Elegant, traditional aesthetic.",
    business_notes:
      "Relevant for food retail (chirashizushi ingredients, hina-arare), traditional goods, and family-oriented services. Hina doll sales peak weeks before. Not a national holiday.",
  },
  {
    id: "event_white_day",
    name_ja: "ホワイトデー",
    name_en: "White Day",
    date: "Mar 14",
    month: 3,
    design_impact:
      "Men return gifts to women — typically white-themed sweets, accessories, or flowers. Clean, white, elegant design aesthetics. Higher price point than Valentine's (the 三倍返し / triple-return custom).",
    business_notes:
      "Ecommerce peak for gift items. Average spend is higher than Valentine's. Campaigns start late February. Target male shoppers who may be less experienced gift-buyers — curated selections and gift guides perform well.",
  },
  // ── April ────────────────────────────────────────────────────────────
  {
    id: "event_entrance_ceremonies",
    name_ja: "入学式・入社式",
    name_en: "School & Company Entrance Ceremonies",
    date: "Early April",
    month: 4,
    design_impact:
      "New beginnings (新生活) theme dominates. Fresh, clean, optimistic design. Cherry blossoms as backdrop. Suits, randoseru (school backpacks), and new apartment imagery. The entire country is in 'fresh start' mode.",
    business_notes:
      "Peak for: furniture/home goods (new apartments), business attire, stationery, electronics (new employees/students), moving services. B2B: new fiscal year starts April 1 — budget cycles reset, new procurement rounds begin.",
  },
  {
    id: "event_hanami",
    name_ja: "花見",
    name_en: "Cherry Blossom Viewing",
    date: "Late March - mid April (varies by region)",
    month: 4,
    design_impact:
      "THE defining visual moment of spring. Sakura petals, branches, pink gradients everywhere. Even non-seasonal brands add sakura touches. The 桜前線 (cherry blossom front) moving northward is tracked obsessively by media.",
    business_notes:
      "Food and beverage brands release sakura-flavored limited editions. Outdoor/picnic supplies peak. Travel to famous blossom spots surges. Timing is weather-dependent — be ready to activate campaigns on short notice based on bloom forecasts.",
  },
  // ── May ──────────────────────────────────────────────────────────────
  {
    id: "event_golden_week",
    name_ja: "ゴールデンウィーク",
    name_en: "Golden Week",
    date: "Apr 29 - May 5",
    month: 5,
    design_impact:
      "Travel, leisure, and outdoor imagery. Carp streamers (鯉のぼり) for Children's Day. Bright, energetic spring colors. Multiple holidays clustered together create an extended vacation mood.",
    business_notes:
      "CRITICAL: DO NOT launch products, features, or campaigns during Golden Week. Decision-makers are on vacation. B2B is completely dead Apr 29 - May 5 (often extending to May 7-8). Travel and leisure ecommerce peaks. Plan campaigns for before or after, never during.",
  },
  {
    id: "event_kodomo_no_hi",
    name_ja: "こどもの日",
    name_en: "Children's Day",
    date: "May 5",
    month: 5,
    design_impact:
      "Koinobori (carp streamers), kabuto (samurai helmets), and iris flowers. Blue, green, and bold colors. Energetic, playful design. Part of Golden Week cluster.",
    business_notes:
      "National holiday within Golden Week. Toy and family entertainment industries peak. Food: kashiwa-mochi and chimaki are traditional. Family-oriented services run promotions.",
  },
  {
    id: "event_mothers_day",
    name_ja: "母の日",
    name_en: "Mother's Day",
    date: "2nd Sunday of May",
    month: 5,
    design_impact:
      "Carnation motifs (especially red and pink). Warm, grateful tone. Gift-giving imagery with elegant wrapping. More understated than Western Mother's Day campaigns.",
    business_notes:
      "Flower delivery peaks — plan capacity. Gift ecommerce surge. Popular gifts: flowers, sweets, fashion accessories, experience gifts. Campaigns start early May. Not a national holiday.",
  },
  // ── June ─────────────────────────────────────────────────────────────
  {
    id: "event_fathers_day",
    name_ja: "父の日",
    name_en: "Father's Day",
    date: "3rd Sunday of June",
    month: 6,
    design_impact:
      "Yellow roses are the traditional symbol (yellow/blue color schemes). More subdued than Mother's Day. Gift imagery tends toward practical items: alcohol, fashion, gadgets.",
    business_notes:
      "Smaller ecommerce event than Mother's Day but significant. Popular gifts: alcohol (craft beer, whiskey), polo shirts, wallets, gadgets. Campaigns start mid-June.",
  },
  {
    id: "event_tsuyu",
    name_ja: "梅雨",
    name_en: "Rainy Season (Tsuyu)",
    date: "June - mid July (varies by region)",
    month: 6,
    design_impact:
      "Rain, umbrellas, hydrangeas (紫陽花), frogs, and snails as motifs. Muted, cool color palettes. Avoid sunny outdoor imagery — it will feel disconnected from reality. Cozy indoor scenes resonate.",
    business_notes:
      "AFFECTS OUTDOOR CAMPAIGN IMAGERY — do not run outdoor/sunshine creative during tsuyu. Dehumidifier, rain gear, indoor entertainment sales peak. Restaurant and delivery services can capitalize on stay-at-home behavior. The end of rainy season (梅雨明け) triggers summer campaigns.",
  },
  // ── July ─────────────────────────────────────────────────────────────
  {
    id: "event_ochugen",
    name_ja: "お中元",
    name_en: "Mid-Year Gifts (Ochugen)",
    date: "July (varies: Kanto early July, Kansai late July-Aug 15)",
    month: 7,
    design_impact:
      "Formal gift-giving imagery. Elegant packaging, noshi (熨斗) wrapping, and department store aesthetics. Cool-colored, refreshing gift items (jelly, beer, noodles, fruit). Traditional and premium visual tone.",
    business_notes:
      "MAJOR ecommerce event. Corporate gift-giving season — B2B relationships maintained through ochugen. Department stores and specialty food sites run extensive campaigns. Gift catalogs go live in June. Delivery scheduling is critical. Average spend: ¥3,000-5,000 per gift.",
  },
  {
    id: "event_umi_no_hi",
    name_ja: "海の日",
    name_en: "Marine Day",
    date: "3rd Monday of July",
    month: 7,
    design_impact:
      "Ocean, beach, and marine life imagery. Bright blues and whites. Signals the 'official' start of summer beach season. Often combined with summer sale campaigns.",
    business_notes:
      "National holiday, often creates a 3-day weekend. Travel and leisure industry peak. Summer sales often kick off around this holiday. Beach and outdoor recreation gear peaks.",
  },
  // ── August ───────────────────────────────────────────────────────────
  {
    id: "event_obon",
    name_ja: "お盆",
    name_en: "Obon (Festival of the Dead)",
    date: "Aug 13-16 (some regions July)",
    month: 8,
    design_impact:
      "Lanterns (盆提灯), fire motifs, ancestral imagery. Many sites add subdued, respectful seasonal touches. Not overtly commercial. Late summer atmosphere with fireworks and bon odori dance imagery.",
    business_notes:
      "CRITICAL: Many businesses closed Aug 13-16. Travel peaks massively (帰省ラッシュ — homecoming rush). B2B is dead during Obon week. Ecommerce: gift items for visiting family, travel goods. Train and flight bookings peak months in advance. Equivalent to Golden Week for business disruption.",
  },
  // ── September ────────────────────────────────────────────────────────
  {
    id: "event_keiro_no_hi",
    name_ja: "敬老の日",
    name_en: "Respect for the Aged Day",
    date: "3rd Monday of September",
    month: 9,
    design_impact:
      "Warm, respectful tones. Elegant, understated design. Grandparent imagery with grandchildren. Traditional Japanese aesthetic elements. Autumn color transition begins.",
    business_notes:
      "National holiday. Gift-giving to grandparents — flowers, sweets, health goods, experience gifts. Often creates Silver Week when combined with Autumnal Equinox. Senior-focused services run campaigns.",
  },
  {
    id: "event_shubun_no_hi",
    name_ja: "秋分の日",
    name_en: "Autumnal Equinox Day",
    date: "~Sep 23",
    month: 9,
    design_impact:
      "Marks the official transition to autumn. Ohigan (お彼岸) — ancestor memorial period. Higanbana (彼岸花 / red spider lily) imagery. Subtle shift from summer to autumn palettes.",
    business_notes:
      "National holiday. When adjacent to Respect for the Aged Day, creates Silver Week (up to 5 consecutive days off). Buddhist temple visits increase. Autumn food campaigns launch. Botamochi/ohagi (rice cake sweets) are seasonal.",
  },
  // ── October ──────────────────────────────────────────────────────────
  {
    id: "event_halloween",
    name_ja: "ハロウィン",
    name_en: "Halloween",
    date: "Oct 31",
    month: 10,
    design_impact:
      "Growing rapidly, especially among young demographics. Costumes, pumpkins, orange-and-black color schemes. Shibuya Halloween is the iconic event. More costume-party oriented than spooky/horror in Japan.",
    business_notes:
      "Confectionery and fashion retail capitalize heavily. Limited-edition Halloween-themed products. Costume and party goods peak. Shibuya crossing is famous internationally for Halloween crowds. Instagram/social media driven. Growing year-over-year but still smaller than Christmas.",
  },
  // ── November ─────────────────────────────────────────────────────────
  {
    id: "event_shichi_go_san",
    name_ja: "七五三",
    name_en: "Shichi-Go-San (Seven-Five-Three)",
    date: "Nov 15",
    month: 11,
    design_impact:
      "Children in kimono, shrine visit imagery. Traditional, warm, family-oriented design. Autumn colors as backdrop. Chitoseame (千歳飴) long candy sticks are iconic.",
    business_notes:
      "Photo studios, kimono rental, and shrine-adjacent businesses peak. Hair and beauty salons busy. Family restaurants see increased traffic. Actual celebrations span October-November, not just Nov 15.",
  },
  {
    id: "event_black_friday",
    name_ja: "ブラックフライデー",
    name_en: "Black Friday",
    date: "Late November (4th Friday)",
    month: 11,
    design_impact:
      "Black, gold, and red color schemes. 'SALE' typography heavy. Growing in Japan — Amazon Japan and major retailers have established it. Still feels more imported than organic.",
    business_notes:
      "Growing significantly year-over-year in Japan. Amazon Japan leads, followed by major retailers (Aeon, LOFT, etc.). Cyber Monday follows. Increasingly used as a pre-Christmas sales event. Japanese consumers are price-sensitive and respond well to clear discount communication.",
  },
  // ── December ─────────────────────────────────────────────────────────
  {
    id: "event_oseibo",
    name_ja: "お歳暮",
    name_en: "Year-End Gifts (Oseibo)",
    date: "December (typically Dec 1-20)",
    month: 12,
    design_impact:
      "Formal gift-giving imagery similar to ochugen. Premium packaging, noshi wrapping. Winter-themed gifts: ham, salmon, beer, premium fruit. More formal and premium than Christmas gifting.",
    business_notes:
      "MAJOR ecommerce event — often larger than ochugen. Corporate gift-giving maintains B2B relationships. Department stores and food specialty sites peak. Gift catalogs launch in November. Delivery logistics under strain. Average spend: ¥3,000-5,000 per gift.",
  },
  {
    id: "event_christmas",
    name_ja: "クリスマス",
    name_en: "Christmas",
    date: "Dec 25",
    month: 12,
    design_impact:
      "CRITICAL DIFFERENCE: Christmas in Japan is romantic, not family-oriented. Couples' holiday similar to Valentine's Day. Illumination (イルミネーション) imagery. Christmas cakes (shortcake), KFC (yes, really), and date-night imagery. Red, green, gold, and white.",
    business_notes:
      "Romantic dining reservations peak. KFC orders must be placed weeks in advance (this is real). Christmas cake (苺ショートケーキ) is enormous business. Jewelry and fashion gift sales peak. Illumination events drive tourism. Not a national holiday — business as usual on Dec 25.",
  },
  {
    id: "event_omisoka",
    name_ja: "大晦日",
    name_en: "New Year's Eve",
    date: "Dec 31",
    month: 12,
    design_impact:
      "Transition from Christmas to 正月 aesthetics happens overnight. Temple bells (除夜の鐘), toshikoshi soba (年越しそば), and countdown imagery. Sites should switch to New Year themes by Dec 31.",
    business_notes:
      "Food retail peaks for osechi (おせち) ingredients and New Year preparations. Many businesses begin closure. Retail shifts to 福袋 (lucky bags) and 初売り (first sale) preparation. TV: Kohaku Uta Gassen (紅白歌合戦) dominates attention.",
  },
];

// ---------------------------------------------------------------------------
// 二十四節気 — The 24 Sekki (Solar Terms / Microseasons)
// ---------------------------------------------------------------------------

export const MICROSEASONS: Microseason[] = [
  // ── Spring ───────────────────────────────────────────────────────────
  {
    id: "sekki_risshun",
    name_ja: "立春",
    name_en: "Start of Spring",
    approximate_date: "Feb 4",
    design_notes:
      "Official start of spring in the traditional calendar. Plum blossoms (梅) begin. A subtle, hopeful design shift — not yet full sakura but winter is ending. Seasonal greetings shift from winter to spring.",
  },
  {
    id: "sekki_usui",
    name_ja: "雨水",
    name_en: "Rainwater",
    approximate_date: "Feb 19",
    design_notes:
      "Snow turns to rain, ice begins to melt. Water and thaw imagery. Subtle, transitional. Traditionally the time to display hina dolls (good luck if set out during 雨水).",
  },
  {
    id: "sekki_keichitsu",
    name_ja: "啓蟄",
    name_en: "Awakening of Insects",
    approximate_date: "Mar 6",
    design_notes:
      "Hibernating creatures emerge. Earth wakes up. Warm earth tones mixed with early greens. Signals the shift toward active, outdoor imagery.",
  },
  {
    id: "sekki_shunbun",
    name_ja: "春分",
    name_en: "Vernal Equinox",
    approximate_date: "Mar 21",
    design_notes:
      "Day and night equal. Ohigan (お彼岸) ancestor memorial week. Botamochi (ぼたもち) is the seasonal sweet. National holiday (春分の日). Balance and renewal themes.",
  },
  {
    id: "sekki_seimei",
    name_ja: "清明",
    name_en: "Clear and Bright",
    approximate_date: "Apr 5",
    design_notes:
      "Everything is fresh and bright. Peak cherry blossom period in many regions. Clean, luminous design. The name itself (清明) suggests clarity — use light, airy layouts.",
  },
  {
    id: "sekki_kokuu",
    name_ja: "穀雨",
    name_en: "Grain Rain",
    approximate_date: "Apr 20",
    design_notes:
      "Spring rains nourish the crops. Lush green imagery emerges. Wisteria (藤) and azalea (つつじ) are in bloom. Transition from sakura season to verdant green.",
  },
  // ── Summer ───────────────────────────────────────────────────────────
  {
    id: "sekki_rikka",
    name_ja: "立夏",
    name_en: "Start of Summer",
    approximate_date: "May 6",
    design_notes:
      "Official summer begins. Bright greens and early summer energy. Often falls just after Golden Week — the post-holiday refreshed mood. Young leaves (新緑) at their most vibrant.",
  },
  {
    id: "sekki_shouman",
    name_ja: "小満",
    name_en: "Grain Buds",
    approximate_date: "May 21",
    design_notes:
      "Crops grow lush. Rich, full greens. Roses (薔薇) bloom. A sense of abundance and ripening. Warm but not yet hot — comfortable outdoor imagery.",
  },
  {
    id: "sekki_boushu",
    name_ja: "芒種",
    name_en: "Grain in Ear",
    approximate_date: "Jun 6",
    design_notes:
      "Rice planting season. Rain increases — approaching tsuyu. Paddy field and agricultural imagery. Praying mantis appears. Transition to rainy season aesthetics.",
  },
  {
    id: "sekki_geshi",
    name_ja: "夏至",
    name_en: "Summer Solstice",
    approximate_date: "Jun 21",
    design_notes:
      "Longest day of the year. Deep into rainy season. Not celebrated like in the West — more of a quiet marker. Hydrangea (紫陽花) in full bloom. Subdued summer mood under rain.",
  },
  {
    id: "sekki_shousho",
    name_ja: "小暑",
    name_en: "Minor Heat",
    approximate_date: "Jul 7",
    design_notes:
      "Heat builds. Coincides with Tanabata (七夕) star festival on Jul 7. Bamboo decoration, wish-tag (短冊) imagery. Rainy season often ends around this time. Summer campaigns can fully activate.",
  },
  {
    id: "sekki_taisho",
    name_ja: "大暑",
    name_en: "Major Heat",
    approximate_date: "Jul 23",
    design_notes:
      "Peak summer heat. Cool blues, ice, and refreshment imagery essential. Kakigori (かき氷) shaved ice, watermelon, and 涼 (coolness) as a design concept. This is when summer design language is at its strongest.",
  },
  // ── Autumn ───────────────────────────────────────────────────────────
  {
    id: "sekki_risshuu",
    name_ja: "立秋",
    name_en: "Start of Autumn",
    approximate_date: "Aug 8",
    design_notes:
      "Autumn begins in the traditional calendar — even though it is still peak summer heat. Seasonal greetings shift from summer (暑中見舞い before, 残暑見舞い after). A subtle but culturally important boundary.",
  },
  {
    id: "sekki_shosho",
    name_ja: "処暑",
    name_en: "End of Heat",
    approximate_date: "Aug 23",
    design_notes:
      "Heat begins to recede. Typhoon season awareness. Transition period — late summer meets early autumn. Evening breezes and cricket sounds. Design can begin hinting at autumn warmth.",
  },
  {
    id: "sekki_hakuro",
    name_ja: "白露",
    name_en: "White Dew",
    approximate_date: "Sep 8",
    design_notes:
      "Morning dew appears on grass. Autumn feeling strengthens. Pampas grass (すすき) and moon viewing themes emerge. Crisp, clear air — design shifts to sharper, cooler aesthetics.",
  },
  {
    id: "sekki_shuubun",
    name_ja: "秋分",
    name_en: "Autumnal Equinox",
    approximate_date: "Sep 23",
    design_notes:
      "Day and night equal. Ohigan (お彼岸) ancestor memorial. Ohagi (おはぎ) is the seasonal sweet. National holiday. Red spider lilies (彼岸花) bloom. Full autumn palette activates.",
  },
  {
    id: "sekki_kanro",
    name_ja: "寒露",
    name_en: "Cold Dew",
    approximate_date: "Oct 8",
    design_notes:
      "Dew becomes cold. Autumn deepens. Maple leaves begin turning in northern regions. Harvest festival (収穫祭) imagery. Chrysanthemum (菊) is the season's flower.",
  },
  {
    id: "sekki_soukou",
    name_ja: "霜降",
    name_en: "Frost Descent",
    approximate_date: "Oct 23",
    design_notes:
      "First frost in northern areas. Late autumn — deep reds, oranges, and golds. Peak koyo (紅葉) leaf-viewing season approaches. Rich, warm color palettes at their most intense.",
  },
  // ── Winter ───────────────────────────────────────────────────────────
  {
    id: "sekki_rittou",
    name_ja: "立冬",
    name_en: "Start of Winter",
    approximate_date: "Nov 7",
    design_notes:
      "Winter officially begins. Hot pot (鍋) season starts. Shift toward warm, cozy interior imagery. Oden and warm sake appear in food marketing. Autumn leaves still visible in southern regions.",
  },
  {
    id: "sekki_shousetsu",
    name_ja: "小雪",
    name_en: "Minor Snow",
    approximate_date: "Nov 22",
    design_notes:
      "Light snow in mountains. Winter chill sets in. Darker, warmer color palettes. Year-end preparations begin. Oseibo gift-giving campaigns launch. Illumination events light up cities.",
  },
  {
    id: "sekki_taisetsu",
    name_ja: "大雪",
    name_en: "Major Snow",
    approximate_date: "Dec 7",
    design_notes:
      "Heavy snow in northern Japan. Full winter imagery: snow, warm lighting, evergreens. Year-end party (忘年会) season. Christmas illumination peaks. Transition from autumn to full winter palette.",
  },
  {
    id: "sekki_touji",
    name_ja: "冬至",
    name_en: "Winter Solstice",
    approximate_date: "Dec 22",
    design_notes:
      "Shortest day. Yuzu bath (柚子湯) and kabocha squash are traditions. Warm, golden tones. Just before Christmas — sites should be in full holiday mode. A quiet, introspective moment before the year-end rush.",
  },
  {
    id: "sekki_shoukan",
    name_ja: "小寒",
    name_en: "Minor Cold",
    approximate_date: "Jan 6",
    design_notes:
      "Cold intensifies. New Year celebrations wind down. 寒中見舞い (winter greeting cards) period begins. Return to regular business. Clean, crisp winter aesthetics. Nanakusa-gayu (七草粥) on Jan 7.",
  },
  {
    id: "sekki_daikan",
    name_ja: "大寒",
    name_en: "Major Cold",
    approximate_date: "Jan 20",
    design_notes:
      "Coldest period of the year. Hot springs (温泉), warming foods, and endurance themes. Ice and frost imagery. The last sekki before Risshun — anticipation of spring begins. A good time for warm, comforting brand messaging.",
  },
];

// ---------------------------------------------------------------------------
// getSeasonalContext() — Returns current season, events, and colors
// ---------------------------------------------------------------------------

/**
 * Returns the seasonal context for a given date: current season, active
 * events, upcoming events (within 30 days), and recommended colors.
 */
export function getSeasonalContext(month: number, day: number): SeasonalContext {
  const currentSeason =
    SEASONS.find((s) => s.months.includes(month)) ?? SEASONS[0];

  // Parse a date string like "Jan 1-3", "Feb 14", "2nd Monday of January", etc.
  // into a comparable month/day for rough matching.
  const eventMonth = (event: SeasonalEvent): number => event.month;

  // Active events: events in the current month
  const activeEvents = EVENTS.filter((e) => eventMonth(e) === month);

  // Upcoming events: events in the next 1-2 months (30-60 day lookahead)
  const nextMonth1 = month === 12 ? 1 : month + 1;
  const nextMonth2 = nextMonth1 === 12 ? 1 : nextMonth1 + 1;
  const upcomingEvents = EVENTS.filter(
    (e) => eventMonth(e) === nextMonth1 || eventMonth(e) === nextMonth2
  );

  // Find current microseason by approximate date
  const currentMicroseason = findCurrentMicroseason(month, day);

  return {
    current_season: currentSeason,
    active_events: activeEvents,
    upcoming_events: upcomingEvents,
    recommended_colors: currentSeason.colors,
    current_microseason: currentMicroseason,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const MONTH_MAP: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function parseApproximateDate(dateStr: string): { month: number; day: number } {
  // Format: "Feb 4", "Mar 21", "Sep 23", etc.
  const parts = dateStr.split(" ");
  if (parts.length === 2) {
    const month = MONTH_MAP[parts[0]];
    const day = parseInt(parts[1], 10);
    if (month && !isNaN(day)) {
      return { month, day };
    }
  }
  return { month: 1, day: 1 };
}

function dayOfYear(month: number, day: number): number {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let total = 0;
  for (let m = 1; m < month; m++) {
    total += daysInMonth[m];
  }
  return total + day;
}

function findCurrentMicroseason(
  month: number,
  day: number
): Microseason | null {
  const targetDoy = dayOfYear(month, day);

  // Find the microseason whose date is closest to (but not after) the target.
  // Each sekki lasts roughly 15 days until the next one.
  let best: Microseason | null = null;
  let bestDist = Infinity;

  for (const ms of MICROSEASONS) {
    const parsed = parseApproximateDate(ms.approximate_date);
    const msDoy = dayOfYear(parsed.month, parsed.day);

    // Distance — handle year wraparound (Daikan Jan 20 → Risshun Feb 4)
    let dist = targetDoy - msDoy;
    if (dist < 0) {
      dist += 365;
    }

    // The current microseason is the one most recently passed (smallest positive distance)
    if (dist < bestDist) {
      bestDist = dist;
      best = ms;
    }
  }

  return best;
}
