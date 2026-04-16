export interface SeasonalColor {
  name_ja: string;
  name_en: string;
  hex: string;
}

export interface SeasonInfo {
  id: string;
  name_ja: string;
  name_en: string;
  months: number[];
  colors: SeasonalColor[];
}

export interface EventInfo {
  id: string;
  name_ja: string;
  name_en: string;
  date: string;
  month: number;
  design_impact: string;
  business_notes: string;
}

export interface MicroseasonInfo {
  id: string;
  name_ja: string;
  name_en: string;
  approximate_date: string;
}

export interface SeasonalContextParams {
  month: number;
  day?: number;
}

export interface SeasonalContextResult {
  current_season: {
    name_ja: string;
    name_en: string;
    colors: SeasonalColor[];
    design_notes: string[];
  };
  active_events: EventInfo[];
  upcoming_events: EventInfo[];
  current_microseason: MicroseasonInfo | null;
  design_recommendations: string[];
  avoid: string[];
}

// Inline seasonal data so the tool works independently
const SEASONS: SeasonInfo[] = [
  {
    id: "spring",
    name_ja: "春",
    name_en: "Spring",
    months: [3, 4, 5],
    colors: [
      { name_ja: "桜色", name_en: "Sakura pink", hex: "#FDDDE6" },
      { name_ja: "若草色", name_en: "Fresh green", hex: "#B9D08B" },
      { name_ja: "藤色", name_en: "Wisteria purple", hex: "#BBA0CB" },
      { name_ja: "菜の花色", name_en: "Rapeseed yellow", hex: "#FFEC47" },
    ],
  },
  {
    id: "summer",
    name_ja: "夏",
    name_en: "Summer",
    months: [6, 7, 8],
    colors: [
      { name_ja: "海色", name_en: "Ocean blue", hex: "#0097DB" },
      { name_ja: "向日葵色", name_en: "Sunflower yellow", hex: "#FFC20E" },
      { name_ja: "藍色", name_en: "Indigo", hex: "#264061" },
      { name_ja: "新緑色", name_en: "Deep green", hex: "#3B7960" },
    ],
  },
  {
    id: "autumn",
    name_ja: "秋",
    name_en: "Autumn",
    months: [9, 10, 11],
    colors: [
      { name_ja: "朱色", name_en: "Vermilion", hex: "#EB6238" },
      { name_ja: "金色", name_en: "Gold", hex: "#C9A84C" },
      { name_ja: "栗色", name_en: "Chestnut brown", hex: "#704B38" },
      { name_ja: "紫苑色", name_en: "Aster purple", hex: "#867BA9" },
    ],
  },
  {
    id: "winter",
    name_ja: "冬",
    name_en: "Winter",
    months: [12, 1, 2],
    colors: [
      { name_ja: "雪色", name_en: "Snow white", hex: "#F5F5F5" },
      { name_ja: "銀色", name_en: "Silver", hex: "#C0C0C0" },
      { name_ja: "深紅", name_en: "Deep crimson", hex: "#AD002D" },
      { name_ja: "紺色", name_en: "Navy", hex: "#223A5E" },
    ],
  },
];

const EVENTS: EventInfo[] = [
  { id: "new_year", name_ja: "正月", name_en: "New Year", date: "Jan 1-3", month: 1, design_impact: "Red, gold, white. 謹賀新年 banners. Pine/bamboo/plum motifs (松竹梅). Biggest holiday. Many businesses closed Jan 1-3.", business_notes: "New Year sale (初売り) campaigns start Jan 2-3. Do not schedule launches or maintenance Dec 29 through Jan 3." },
  { id: "coming_of_age", name_ja: "成人の日", name_en: "Coming of Age Day", date: "2nd Monday Jan", month: 1, design_impact: "Furisode kimono imagery. Congratulatory messaging.", business_notes: "Target 20-year-olds for products/services. Photo studio promotions peak." },
  { id: "setsubun", name_ja: "節分", name_en: "Setsubun", date: "Feb 3", month: 2, design_impact: "Oni (demon) masks, soybeans, ehomaki (sushi rolls). Fun, playful visual treatments.", business_notes: "Food industry promotions. Ehomaki sales are a major convenience store event." },
  { id: "valentine", name_ja: "バレンタインデー", name_en: "Valentine's Day", date: "Feb 14", month: 2, design_impact: "Chocolate and hearts. Pink and brown palettes. In Japan, women give chocolate to men.", business_notes: "Massive chocolate sales event. 義理チョコ (obligation chocolate) for coworkers is declining but still exists. Ecommerce chocolate campaigns start late January." },
  { id: "hinamatsuri", name_ja: "ひな祭り", name_en: "Hinamatsuri (Girls' Day)", date: "Mar 3", month: 3, design_impact: "Hina dolls, peach blossoms (桃の花), pink/red/green color scheme.", business_notes: "Family-oriented promotions. Seasonal sweets (ひなあられ, 桜餅)." },
  { id: "white_day", name_ja: "ホワイトデー", name_en: "White Day", date: "Mar 14", month: 3, design_impact: "White, pastel. Men return gifts to women. Gift-focused campaigns.", business_notes: "Gift ecommerce peak. White-themed product promotions." },
  { id: "entrance_ceremonies", name_ja: "入学式・入社式", name_en: "School/company entrance ceremonies", date: "Early April", month: 4, design_impact: "Cherry blossoms at peak. New beginnings, fresh starts. Suits, formal wear.", business_notes: "New employee onboarding. School supply sales. Business card printing peak. April 1 is the start of the fiscal year for many companies." },
  { id: "hanami", name_ja: "花見", name_en: "Cherry blossom viewing", date: "Late Mar - mid Apr", month: 4, design_impact: "Sakura dominates all design. Pink gradients, petal animations, branch silhouettes. The most visually iconic Japanese season.", business_notes: "Seasonal product launches. Limited-edition sakura packaging. Outdoor event promotions. Cherry blossom forecasts (桜前線) drive campaign timing by region." },
  { id: "golden_week", name_ja: "ゴールデンウィーク", name_en: "Golden Week", date: "Apr 29 - May 5", month: 5, design_impact: "Travel and leisure imagery. Bright, energetic colors.", business_notes: "DO NOT launch products or major features during GW. Many businesses closed. Travel bookings peak. Schedule deployments and campaigns before or after." },
  { id: "children_day", name_ja: "こどもの日", name_en: "Children's Day", date: "May 5", month: 5, design_impact: "Koinobori (carp streamers), kabuto (helmets). Blue, green, red.", business_notes: "Family-oriented promotions. Part of Golden Week." },
  { id: "mothers_day", name_ja: "母の日", name_en: "Mother's Day", date: "2nd Sunday May", month: 5, design_impact: "Carnations (red and pink). Gift-focused, warm color palettes.", business_notes: "Major gift ecommerce event. Flower delivery services peak." },
  { id: "fathers_day", name_ja: "父の日", name_en: "Father's Day", date: "3rd Sunday June", month: 6, design_impact: "Yellow roses (Japan-specific). Blue and yellow palettes.", business_notes: "Smaller than Mother's Day but growing. Gift campaigns." },
  { id: "rainy_season", name_ja: "梅雨", name_en: "Rainy season (Tsuyu)", date: "June - July", month: 6, design_impact: "Rain, hydrangeas (紫陽花), umbrellas, frogs. Blue-purple-green palettes. Subdued but not gloomy.", business_notes: "Affects outdoor campaign imagery. Indoor activity promotions. Humidity-related product campaigns (dehumidifiers, anti-mold). Avoid outdoor event promotions." },
  { id: "tanabata", name_ja: "七夕", name_en: "Tanabata (Star Festival)", date: "Jul 7", month: 7, design_impact: "Bamboo branches, tanzaku wish tags, stars, Milky Way imagery. Blue, purple, and silver color accents.", business_notes: "Wish-making campaigns. Retail promotions around short-lived decorations. Growing commercial event, especially for shopping centers." },
  { id: "ochugen", name_ja: "お中元", name_en: "Mid-year gifts", date: "July", month: 7, design_impact: "Formal gift packaging. Summer blue and white. Noshi (熨斗) wrapping patterns.", business_notes: "Major ecommerce event. Corporate gift-giving season. Gift catalog sites peak. Delivery scheduling is critical." },
  { id: "marine_day", name_ja: "海の日", name_en: "Marine Day", date: "3rd Monday July", month: 7, design_impact: "Ocean, beach, summer blue imagery.", business_notes: "Start of summer vacation period. Beach and travel promotions." },
  { id: "obon", name_ja: "お盆", name_en: "Obon", date: "Aug 13-16", month: 8, design_impact: "Lanterns, bon odori (dance). Subdued, respectful. Not funeral-somber but ancestral remembrance.", business_notes: "Many businesses closed Aug 13-16. Peak domestic travel. Do not schedule launches. Customer support may be limited. Second biggest holiday after New Year." },
  { id: "respect_aged", name_ja: "敬老の日", name_en: "Respect for the Aged Day", date: "3rd Monday Sept", month: 9, design_impact: "Warm, respectful tones. Grandparent imagery. Gold and purple.", business_notes: "Gift promotions targeting grandchildren. Health products, travel packages for seniors." },
  { id: "autumn_equinox", name_ja: "秋分の日", name_en: "Autumnal Equinox", date: "~Sep 23", month: 9, design_impact: "Transition to autumn palette. Higanbana (spider lily) motifs.", business_notes: "Part of Silver Week if aligned with weekends. Ohigan (お彼岸) Buddhist observance." },
  { id: "halloween", name_ja: "ハロウィン", name_en: "Halloween", date: "Oct 31", month: 10, design_impact: "Orange, purple, black. Costumes and kawaii horror. More playful than Western Halloween.", business_notes: "Growing commercial event, especially in Shibuya. Costume and candy sales. Theme park promotions. More about costumes and Instagram photos than trick-or-treating." },
  { id: "shichi_go_san", name_ja: "七五三", name_en: "Shichi-Go-San", date: "Nov 15", month: 11, design_impact: "Children in traditional wear. Chitose-ame (千歳飴). Red, pink, white.", business_notes: "Photo studio peak. Kimono rental. Family celebration." },
  { id: "black_friday", name_ja: "ブラックフライデー", name_en: "Black Friday", date: "Late November", month: 11, design_impact: "Black and gold. Western-import aesthetic. Sale badges.", business_notes: "Growing in Japan but smaller than in the US. Amazon and Rakuten run major campaigns. Younger demographics are more engaged." },
  { id: "oseibo", name_ja: "お歳暮", name_en: "Year-end gifts", date: "December", month: 12, design_impact: "Formal gift packaging. Winter color palettes. Noshi wrapping.", business_notes: "Major ecommerce event alongside ochugen. Corporate gift-giving. Department store gift catalog peak. Orders start in November." },
  { id: "christmas", name_ja: "クリスマス", name_en: "Christmas", date: "Dec 25", month: 12, design_impact: "Red, green, gold, white. Illumination (イルミネーション) imagery. Sparkle and warmth.", business_notes: "In Japan, Christmas is ROMANTIC, not family-oriented. Couples celebrate with dinner reservations and gift exchange. Christmas cake (ショートケーキ) and KFC are traditions. Family celebrations happen at New Year instead." },
  { id: "new_years_eve", name_ja: "大晦日", name_en: "New Year's Eve", date: "Dec 31", month: 12, design_impact: "Countdown, temple bells (除夜の鐘, 108 bells). Transitional imagery.", business_notes: "Year-end campaigns. Nengajo (年賀状) New Year card preparation. Many people travel home for New Year. Soba noodle sales peak (年越しそば)." },
];

const MICROSEASONS: MicroseasonInfo[] = [
  { id: "shoushou", name_ja: "小寒", name_en: "Minor Cold", approximate_date: "Jan 5" },
  { id: "daikan", name_ja: "大寒", name_en: "Major Cold", approximate_date: "Jan 20" },
  { id: "risshun", name_ja: "立春", name_en: "Start of Spring", approximate_date: "Feb 4" },
  { id: "usui", name_ja: "雨水", name_en: "Rain Water", approximate_date: "Feb 19" },
  { id: "keichitsu", name_ja: "啓蟄", name_en: "Awakening of Insects", approximate_date: "Mar 6" },
  { id: "shunbun", name_ja: "春分", name_en: "Vernal Equinox", approximate_date: "Mar 21" },
  { id: "seimei", name_ja: "清明", name_en: "Clear and Bright", approximate_date: "Apr 5" },
  { id: "kokuu", name_ja: "穀雨", name_en: "Grain Rain", approximate_date: "Apr 20" },
  { id: "rikka", name_ja: "立夏", name_en: "Start of Summer", approximate_date: "May 6" },
  { id: "shouman", name_ja: "小満", name_en: "Grain Buds", approximate_date: "May 21" },
  { id: "boushu", name_ja: "芒種", name_en: "Grain in Ear", approximate_date: "Jun 6" },
  { id: "geshi", name_ja: "夏至", name_en: "Summer Solstice", approximate_date: "Jun 21" },
  { id: "shousho", name_ja: "小暑", name_en: "Minor Heat", approximate_date: "Jul 7" },
  { id: "taisho", name_ja: "大暑", name_en: "Major Heat", approximate_date: "Jul 23" },
  { id: "risshuu", name_ja: "立秋", name_en: "Start of Autumn", approximate_date: "Aug 7" },
  { id: "shosho", name_ja: "処暑", name_en: "End of Heat", approximate_date: "Aug 23" },
  { id: "hakuro", name_ja: "白露", name_en: "White Dew", approximate_date: "Sep 8" },
  { id: "shuubun", name_ja: "秋分", name_en: "Autumnal Equinox", approximate_date: "Sep 23" },
  { id: "kanro", name_ja: "寒露", name_en: "Cold Dew", approximate_date: "Oct 8" },
  { id: "soukou", name_ja: "霜降", name_en: "Frost Descent", approximate_date: "Oct 23" },
  { id: "rittou", name_ja: "立冬", name_en: "Start of Winter", approximate_date: "Nov 7" },
  { id: "shousetsu", name_ja: "小雪", name_en: "Minor Snow", approximate_date: "Nov 22" },
  { id: "taisetsu", name_ja: "大雪", name_en: "Major Snow", approximate_date: "Dec 7" },
  { id: "touji", name_ja: "冬至", name_en: "Winter Solstice", approximate_date: "Dec 22" },
];

function parseDateApprox(dateStr: string): { month: number; day: number } {
  const months: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  const parts = dateStr.split(" ");
  return { month: months[parts[0]] || 1, day: parseInt(parts[1]) || 1 };
}

function dayOfYear(month: number, day: number): number {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let total = 0;
  for (let i = 1; i < month; i++) total += daysInMonth[i];
  return total + day;
}

export function getSeasonalContext(params: SeasonalContextParams): SeasonalContextResult {
  const { month, day = 15 } = params;

  // Find current season
  const currentSeason = SEASONS.find((s) => s.months.includes(month))!;

  // Design notes per season
  const seasonDesignNotes: Record<string, string[]> = {
    spring: [
      "Sakura motifs are appropriate across all industries during March-April",
      "Use soft pink gradients for seasonal accent colors",
      "Fresh green (#B9D08B) works well for 'new beginning' messaging",
      "Cherry blossom petal animations are expected, not cheesy",
      "Hanami (花見) imagery for outdoor/lifestyle brands",
    ],
    summer: [
      "Cool blue tones help pages feel refreshing in hot months",
      "Fireworks (花火) motifs for July-August campaigns",
      "Indigo (藍) is a traditional summer color in Japan",
      "Light, airy layouts feel more comfortable in summer",
      "Goldfish, wind chimes, shaved ice as seasonal icons",
    ],
    autumn: [
      "Warm vermilion and gold for koyo (紅葉, autumn leaves) season",
      "Moon-viewing (お月見) motifs in September",
      "Rich, deep colors replace summer's brightness",
      "Harvest and food imagery resonates strongly",
      "Momiji (maple leaf) patterns for November",
    ],
    winter: [
      "Red and gold dominate December through New Year",
      "Illumination (イルミネーション) sparkle effects for December",
      "Clean white and silver for a crisp winter feel",
      "New Year (正月) visual language starts mid-December",
      "Plum blossom (梅) motifs bridge winter into spring (February)",
    ],
  };

  // Find active events (within the current month)
  const activeEvents = EVENTS.filter((e) => e.month === month);

  // Find upcoming events (next month)
  const nextMonth = month === 12 ? 1 : month + 1;
  const upcomingEvents = EVENTS.filter((e) => e.month === nextMonth);

  // Find current microseason
  const currentDOY = dayOfYear(month, day);
  let currentMicro: MicroseasonInfo | null = null;
  for (let i = 0; i < MICROSEASONS.length; i++) {
    const thisDOY = dayOfYear(
      parseDateApprox(MICROSEASONS[i].approximate_date).month,
      parseDateApprox(MICROSEASONS[i].approximate_date).day
    );
    const nextIdx = (i + 1) % MICROSEASONS.length;
    let nextDOY = dayOfYear(
      parseDateApprox(MICROSEASONS[nextIdx].approximate_date).month,
      parseDateApprox(MICROSEASONS[nextIdx].approximate_date).day
    );
    if (nextDOY <= thisDOY) nextDOY += 365;
    const adjustedCurrent = currentDOY < thisDOY && i > 20 ? currentDOY + 365 : currentDOY;
    if (adjustedCurrent >= thisDOY && adjustedCurrent < nextDOY) {
      currentMicro = MICROSEASONS[i];
      break;
    }
  }

  // Design recommendations
  const recommendations: string[] = [];
  const avoid: string[] = [];

  // Season-specific recommendations
  recommendations.push(
    ...seasonDesignNotes[currentSeason.id],
    `Use seasonal accent colors: ${currentSeason.colors.map((c) => `${c.name_en} (${c.hex})`).join(", ")}`,
  );

  // Event-specific recommendations
  for (const event of activeEvents) {
    recommendations.push(`Active event: ${event.name_ja} (${event.name_en}). ${event.design_impact}`);
  }

  // Avoid warnings
  const gwActive = (month === 5 && day <= 5) || (month === 4 && day >= 29);
  if (gwActive) {
    avoid.push("DO NOT launch products during Golden Week (Apr 29 - May 5). Most businesses are closed.");
  }
  const obonActive = month === 8 && day >= 13 && day <= 16;
  if (obonActive) {
    avoid.push("Obon period (Aug 13-16). Many businesses closed. Avoid launches and major deploys.");
  }
  const newYearActive = (month === 1 && day <= 3) || (month === 12 && day >= 29);
  if (newYearActive) {
    avoid.push("New Year period. Most businesses closed Dec 29 through Jan 3. No launches or maintenance.");
  }

  // General seasonal avoid
  if (month === 6 || (month === 7 && day < 15)) {
    avoid.push("Rainy season (梅雨). Avoid outdoor imagery in campaigns unless rain-themed.");
  }

  return {
    current_season: {
      name_ja: currentSeason.name_ja,
      name_en: currentSeason.name_en,
      colors: currentSeason.colors,
      design_notes: seasonDesignNotes[currentSeason.id],
    },
    active_events: activeEvents,
    upcoming_events: upcomingEvents,
    current_microseason: currentMicro,
    design_recommendations: recommendations,
    avoid,
  };
}
