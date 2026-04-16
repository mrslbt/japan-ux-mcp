export interface Prefecture {
  code: string;
  name: string;
  nameKana: string;
  nameRomaji: string;
  region: string;
  type: "都" | "道" | "府" | "県";
}

export const PREFECTURES: Prefecture[] = [
  { code: "01", name: "北海道", nameKana: "ホッカイドウ", nameRomaji: "Hokkaido", region: "北海道", type: "道" },
  { code: "02", name: "青森県", nameKana: "アオモリケン", nameRomaji: "Aomori", region: "東北", type: "県" },
  { code: "03", name: "岩手県", nameKana: "イワテケン", nameRomaji: "Iwate", region: "東北", type: "県" },
  { code: "04", name: "宮城県", nameKana: "ミヤギケン", nameRomaji: "Miyagi", region: "東北", type: "県" },
  { code: "05", name: "秋田県", nameKana: "アキタケン", nameRomaji: "Akita", region: "東北", type: "県" },
  { code: "06", name: "山形県", nameKana: "ヤマガタケン", nameRomaji: "Yamagata", region: "東北", type: "県" },
  { code: "07", name: "福島県", nameKana: "フクシマケン", nameRomaji: "Fukushima", region: "東北", type: "県" },
  { code: "08", name: "茨城県", nameKana: "イバラキケン", nameRomaji: "Ibaraki", region: "関東", type: "県" },
  { code: "09", name: "栃木県", nameKana: "トチギケン", nameRomaji: "Tochigi", region: "関東", type: "県" },
  { code: "10", name: "群馬県", nameKana: "グンマケン", nameRomaji: "Gunma", region: "関東", type: "県" },
  { code: "11", name: "埼玉県", nameKana: "サイタマケン", nameRomaji: "Saitama", region: "関東", type: "県" },
  { code: "12", name: "千葉県", nameKana: "チバケン", nameRomaji: "Chiba", region: "関東", type: "県" },
  { code: "13", name: "東京都", nameKana: "トウキョウト", nameRomaji: "Tokyo", region: "関東", type: "都" },
  { code: "14", name: "神奈川県", nameKana: "カナガワケン", nameRomaji: "Kanagawa", region: "関東", type: "県" },
  { code: "15", name: "新潟県", nameKana: "ニイガタケン", nameRomaji: "Niigata", region: "中部", type: "県" },
  { code: "16", name: "富山県", nameKana: "トヤマケン", nameRomaji: "Toyama", region: "中部", type: "県" },
  { code: "17", name: "石川県", nameKana: "イシカワケン", nameRomaji: "Ishikawa", region: "中部", type: "県" },
  { code: "18", name: "福井県", nameKana: "フクイケン", nameRomaji: "Fukui", region: "中部", type: "県" },
  { code: "19", name: "山梨県", nameKana: "ヤマナシケン", nameRomaji: "Yamanashi", region: "中部", type: "県" },
  { code: "20", name: "長野県", nameKana: "ナガノケン", nameRomaji: "Nagano", region: "中部", type: "県" },
  { code: "21", name: "岐阜県", nameKana: "ギフケン", nameRomaji: "Gifu", region: "中部", type: "県" },
  { code: "22", name: "静岡県", nameKana: "シズオカケン", nameRomaji: "Shizuoka", region: "中部", type: "県" },
  { code: "23", name: "愛知県", nameKana: "アイチケン", nameRomaji: "Aichi", region: "中部", type: "県" },
  { code: "24", name: "三重県", nameKana: "ミエケン", nameRomaji: "Mie", region: "近畿", type: "県" },
  { code: "25", name: "滋賀県", nameKana: "シガケン", nameRomaji: "Shiga", region: "近畿", type: "県" },
  { code: "26", name: "京都府", nameKana: "キョウトフ", nameRomaji: "Kyoto", region: "近畿", type: "府" },
  { code: "27", name: "大阪府", nameKana: "オオサカフ", nameRomaji: "Osaka", region: "近畿", type: "府" },
  { code: "28", name: "兵庫県", nameKana: "ヒョウゴケン", nameRomaji: "Hyogo", region: "近畿", type: "県" },
  { code: "29", name: "奈良県", nameKana: "ナラケン", nameRomaji: "Nara", region: "近畿", type: "県" },
  { code: "30", name: "和歌山県", nameKana: "ワカヤマケン", nameRomaji: "Wakayama", region: "近畿", type: "県" },
  { code: "31", name: "鳥取県", nameKana: "トットリケン", nameRomaji: "Tottori", region: "中国", type: "県" },
  { code: "32", name: "島根県", nameKana: "シマネケン", nameRomaji: "Shimane", region: "中国", type: "県" },
  { code: "33", name: "岡山県", nameKana: "オカヤマケン", nameRomaji: "Okayama", region: "中国", type: "県" },
  { code: "34", name: "広島県", nameKana: "ヒロシマケン", nameRomaji: "Hiroshima", region: "中国", type: "県" },
  { code: "35", name: "山口県", nameKana: "ヤマグチケン", nameRomaji: "Yamaguchi", region: "中国", type: "県" },
  { code: "36", name: "徳島県", nameKana: "トクシマケン", nameRomaji: "Tokushima", region: "四国", type: "県" },
  { code: "37", name: "香川県", nameKana: "カガワケン", nameRomaji: "Kagawa", region: "四国", type: "県" },
  { code: "38", name: "愛媛県", nameKana: "エヒメケン", nameRomaji: "Ehime", region: "四国", type: "県" },
  { code: "39", name: "高知県", nameKana: "コウチケン", nameRomaji: "Kochi", region: "四国", type: "県" },
  { code: "40", name: "福岡県", nameKana: "フクオカケン", nameRomaji: "Fukuoka", region: "九州", type: "県" },
  { code: "41", name: "佐賀県", nameKana: "サガケン", nameRomaji: "Saga", region: "九州", type: "県" },
  { code: "42", name: "長崎県", nameKana: "ナガサキケン", nameRomaji: "Nagasaki", region: "九州", type: "県" },
  { code: "43", name: "熊本県", nameKana: "クマモトケン", nameRomaji: "Kumamoto", region: "九州", type: "県" },
  { code: "44", name: "大分県", nameKana: "オオイタケン", nameRomaji: "Oita", region: "九州", type: "県" },
  { code: "45", name: "宮崎県", nameKana: "ミヤザキケン", nameRomaji: "Miyazaki", region: "九州", type: "県" },
  { code: "46", name: "鹿児島県", nameKana: "カゴシマケン", nameRomaji: "Kagoshima", region: "九州", type: "県" },
  { code: "47", name: "沖縄県", nameKana: "オキナワケン", nameRomaji: "Okinawa", region: "九州", type: "県" },
];
