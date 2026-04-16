export type PlatformCategory = "line" | "qr_code" | "mobile_payment" | "social_sharing" | "ime_input";

export interface PlatformPattern {
  id: string;
  platform: string;
  category: PlatformCategory;
  pattern: string;
  details: string;
  implementation_notes: string;
}

export const PLATFORM_PATTERNS: PlatformPattern[] = [
  // ─── LINE ──────────────────────────────────────────────────────────
  {
    id: "line_login",
    platform: "LINE",
    category: "line",
    pattern: "LINE Login (social login)",
    details:
      "LINE has 96M+ monthly active users in Japan. LINE Login is the most trusted social login option—far more than Facebook or Google login for Japanese consumers. Users authenticate via their LINE account and you receive a LINE user ID, display name, profile image, and optionally email.",
    implementation_notes:
      "Use the LINE Login v2.1 channel via LINE Developers console. Redirect flow: your site → LINE auth screen → callback URL with auth code → exchange for access token. Add the LINE Login button using official assets (green button, LINE icon). Place it as the first social login option. Request `openid`, `profile`, and optionally `email` scopes. Handle the LIFF (LINE Front-end Framework) login flow separately if running inside LINE's in-app browser.",
  },
  {
    id: "line_official_account",
    platform: "LINE",
    category: "line",
    pattern: "LINE Official Account for customer communication",
    details:
      "LINE Official Accounts are the primary channel for business-to-customer messaging in Japan, replacing email newsletters for many companies. Users 'friend' the account and receive push messages, coupons, and support. Open rates on LINE messages vastly exceed email (60%+ vs 20%).",
    implementation_notes:
      "Create a LINE Official Account at manager.line.biz. Expose a '友だち追加' (Add Friend) button with QR code and deep link (https://lin.ee/xxxxx). Use the Messaging API for programmatic messages. Segment users with tags and audiences. Rate limits apply: free tier allows 200 push messages/month; paid plans scale up. Always provide opt-out instructions per Japanese anti-spam law (特定電子メール法).",
  },
  {
    id: "line_share_button",
    platform: "LINE",
    category: "line",
    pattern: "LINE share button",
    details:
      "In many Japanese demographics, LINE share is more important than Twitter share. The LINE share button sends content directly to a chat or group, making it feel like a personal recommendation rather than a broadcast. This peer-to-peer sharing drives higher conversion than public social shares.",
    implementation_notes:
      "Use the LINE Social Plugins share button. URL scheme: `https://social-plugins.line.me/lineit/share?url={encoded_url}`. Place the LINE share button first (leftmost) in any share button row. Use the official green LINE icon. On mobile, the `line://msg/text/{encoded_text}` URI scheme opens the LINE app directly. Provide og:title and og:image meta tags so the shared link renders a rich preview in LINE chat.",
  },
  {
    id: "line_liff",
    platform: "LINE",
    category: "line",
    pattern: "LINE LIFF (LINE Front-end Framework) for in-app web experiences",
    details:
      "LIFF allows you to build web apps that run inside the LINE app's in-app browser. This gives access to LINE user profile data, the ability to send messages on behalf of the user, and a seamless native-feeling experience without leaving LINE. Common use cases: event registration, restaurant reservations, membership cards, mini-games.",
    implementation_notes:
      "Register a LIFF app in LINE Developers console (choose size: Full, Tall, or Compact). Initialize with `liff.init({ liffId })`. Use `liff.getProfile()` for user info without a separate login flow. `liff.sendMessages()` sends messages to the current chat. `liff.shareTargetPicker()` lets users pick a friend/group to share to. LIFF v2 supports external browsers too, but LINE in-app browser provides the best UX. Test in both environments. Set viewport meta tag for mobile-first layout.",
  },
  {
    id: "line_pay",
    platform: "LINE",
    category: "line",
    pattern: "LINE Pay integration",
    details:
      "LINE Pay is one of Japan's major mobile payment services, integrated directly into the LINE app. Users can pay online and in-store. It offers a smooth checkout experience for LINE's massive user base and supports recurring payments, refunds, and point rewards.",
    implementation_notes:
      "Integrate via LINE Pay API v3. Flow: Request API → Reserve API (create payment) → user confirms in LINE app → Confirm API (capture payment). Display the LINE Pay button (official green assets) alongside other payment methods. Support both online and offline (QR code) flows. Handle the payment confirmation callback URL. Sandbox environment available for testing. Required fields: orderId, amount, currency (JPY), productName.",
  },
  {
    id: "line_messaging_api",
    platform: "LINE",
    category: "line",
    pattern: "LINE notification via Messaging API",
    details:
      "The LINE Messaging API enables push notifications, reply messages, and multicast messages to LINE users. This is the standard way to send transactional notifications (order confirmations, shipping updates, appointment reminders) in Japan. Users prefer LINE notifications over email or SMS.",
    implementation_notes:
      "Use the Messaging API with a channel access token. Message types: text, image, video, audio, location, sticker, template (buttons, confirm, carousel), and Flex Messages (custom layouts via JSON). Push messages cost money beyond the free tier. Reply messages (responding to user action) are free. Use Flex Messages for rich, branded layouts. Webhook URL receives user events (message, follow, unfollow, postback). Rate limit: 100,000 requests per minute for push.",
  },
  {
    id: "line_rich_menu",
    platform: "LINE",
    category: "line",
    pattern: "Rich menu in LINE Official Account",
    details:
      "The rich menu is a persistent menu displayed at the bottom of the LINE chat screen. It acts as a navigation bar for your LINE Official Account, providing quick access to key functions like a website, coupon page, reservation form, or FAQ. Users expect it and it significantly increases engagement.",
    implementation_notes:
      "Create via LINE Official Account Manager or Messaging API. Image size: 2500x1686px or 2500x843px (full or half). Divide into up to 6 tap areas, each linked to a URL, postback action, or text message. Use clear Japanese labels on the image. You can swap rich menus per user for personalization (e.g., different menu for logged-in vs. guest). Include a toggle text like 'メニュー' so users can show/hide it. Design with high contrast—the menu sits over the chat background.",
  },

  // ─── QR Codes ──────────────────────────────────────────────────────
  {
    id: "qr_general_usage",
    platform: "QR Code",
    category: "qr_code",
    pattern: "QR codes used everywhere in Japan",
    details:
      "QR codes were invented in Japan by Denso Wave in 1994 and are deeply embedded in daily life. They appear on restaurant tables (to view menus), product packaging, business cards (名刺), train station posters, TV commercials, magazine ads, and even gravestones. Japanese users are completely comfortable scanning QR codes—no explanation needed.",
    implementation_notes:
      "Generate QR codes server-side using libraries like `qrcode` (Node.js) or `python-qrcode`. Use error correction level M or H for better scanning in print. Encode URLs with UTM parameters for tracking. For dynamic QR codes (where the destination can change), use a redirect URL. Always test scanning with at least 3 different smartphone models. Include the QR code in both digital and print materials.",
  },
  {
    id: "qr_use_cases",
    platform: "QR Code",
    category: "qr_code",
    pattern: "Common QR code use cases: menus, payment, app downloads, event check-in",
    details:
      "Restaurant menus: QR code on the table links to a digital menu (accelerated by COVID). Payment: scan-to-pay at registers (PayPay, LINE Pay). App downloads: QR code linking to App Store / Google Play. Event check-in: QR code on ticket scanned at entry. Business cards: QR codes encoding vCard data. Wi-Fi access: QR codes for automatic Wi-Fi connection. Coupons: QR codes in LINE messages or flyers.",
    implementation_notes:
      "For restaurant menus, link to a responsive web page (not a PDF). For payments, follow each payment provider's QR specification (MPM or CPM). For app downloads, use a smart link that detects OS and redirects to the correct store. For events, encode a unique ticket ID and validate server-side to prevent duplicate check-ins. For Wi-Fi, use the WIFI: URI scheme (`WIFI:T:WPA;S:networkname;P:password;;`).",
  },
  {
    id: "qr_placement",
    platform: "QR Code",
    category: "qr_code",
    pattern: "Standard QR code placement and sizing",
    details:
      "Standard placement positions: near CTA buttons on web pages, in the footer of emails, on printed receipts, on product packaging, on event tickets, and on physical signage. QR codes should be positioned where the user's attention naturally goes and where they have a reason to scan.",
    implementation_notes:
      "Minimum print size: 2cm x 2cm for reliable scanning at arm's length. For signage viewed from distance, scale proportionally (10cm x 10cm for 1 meter viewing distance). Include a quiet zone (white border) of at least 4 modules around the QR code. On web pages, display at minimum 150x150px. Add a short instructional label like 'QRコードを読み取ってください' (Please scan the QR code) for older demographics.",
  },
  {
    id: "qr_url_fallback",
    platform: "QR Code",
    category: "qr_code",
    pattern: "Always provide a URL alternative alongside QR code",
    details:
      "While QR codes are ubiquitous, always provide a text URL as a fallback. Some users may be on desktop (no camera), have a broken camera, or prefer typing. Accessibility also requires a non-visual alternative. The URL should be short and memorable when displayed alongside a QR code.",
    implementation_notes:
      "Display a shortened URL below the QR code. Use a custom short domain if possible (e.g., yoursite.jp/menu). On web pages, make the QR code itself a clickable link to the same destination. For print materials, use a URL that is easy to type manually—avoid long query strings. Consider adding both the QR code and a short URL like 'example.jp/r/abc123'. In digital contexts, add a 'URLをコピー' (Copy URL) button next to the QR code.",
  },

  // ─── Mobile Payments ───────────────────────────────────────────────
  {
    id: "payment_paypay",
    platform: "PayPay",
    category: "mobile_payment",
    pattern: "PayPay integration (largest market share)",
    details:
      "PayPay is Japan's largest mobile payment service with 60M+ registered users. Owned by SoftBank and Yahoo Japan (now LY Corporation). Supports both online and in-store payments. The red PayPay brand is instantly recognizable. Dominant across age groups and regions, including rural areas.",
    implementation_notes:
      "Integrate via PayPay Web Payment API for online payments. Flow: create payment → redirect user to PayPay app/page → user authorizes → callback to your site. Display the PayPay logo prominently on the payment selection page. Support both app-based flow (redirect to PayPay app) and web-based flow (for users without the app). Handle payment status webhooks for asynchronous confirmation. Sandbox available at developer.paypay.ne.jp.",
  },
  {
    id: "payment_rakuten_pay",
    platform: "Rakuten Pay",
    category: "mobile_payment",
    pattern: "Rakuten Pay integration",
    details:
      "Rakuten Pay leverages the Rakuten ecosystem (Rakuten Ichiba, Rakuten Card, Rakuten Bank). Users earn and spend Rakuten Super Points. Strong user base among Rakuten ecosystem members. Popular for both online and physical retail.",
    implementation_notes:
      "Integrate via Rakuten Pay Online Payment API. Supports one-time payments and subscriptions. Users can pay with Rakuten Points, Rakuten Card, or Rakuten Cash. Display the Rakuten Pay button using official brand assets. The Rakuten point incentive is a strong conversion driver—highlight point earning on checkout. API documentation at smartpay.rakuten.co.jp.",
  },
  {
    id: "payment_line_pay",
    platform: "LINE Pay",
    category: "mobile_payment",
    pattern: "LINE Pay integration",
    details:
      "LINE Pay integrates directly into the LINE app, making it seamless for LINE's massive user base. Users can split bills with friends, send money, and pay merchants. Merged operations with PayPay for in-store payments but remains separate for online payments.",
    implementation_notes:
      "See the line_pay pattern for detailed integration notes. Online integration uses LINE Pay API v3. For cross-selling, combine LINE Login + LINE Pay for a single-tap checkout experience where the user is already logged in via LINE. Display official LINE Pay badge on checkout page.",
  },
  {
    id: "payment_merpay",
    platform: "Merpay",
    category: "mobile_payment",
    pattern: "Merpay (Mercari's payment service)",
    details:
      "Merpay is the payment service from Mercari, Japan's dominant C2C marketplace app. Users can spend their Mercari sales balance at online and offline stores. Particularly popular among younger users and the secondhand/resale community. Offers 'あと払い' (pay later) credit feature.",
    implementation_notes:
      "Integrate via Merpay Online Payment API. Users authenticate via the Mercari app. Supports payment with Merpay balance, Merpay Smart Money, or Merpay あと払い (BNPL). Target demographic skews younger (20s-30s) and female. Display the Merpay logo in the payment method list. API access requires merchant agreement with Merpay.",
  },
  {
    id: "payment_transit_ic",
    platform: "Suica / PASMO",
    category: "mobile_payment",
    pattern: "Suica/PASMO transit IC card payments",
    details:
      "Suica (JR East) and PASMO (Tokyo metro/private railways) are contactless IC transit cards also used for retail payments at convenience stores, vending machines, restaurants, and shops. Available as physical cards and in Apple Pay / Google Pay. Nearly universal in the Tokyo metro area. Other regions have ICOCA, Kitaca, TOICA, etc., but they are interoperable.",
    implementation_notes:
      "For physical POS, support FeliCa NFC readers (Sony's contactless standard used in Japan). For Apple Pay integration, Suica/PASMO are supported as transit cards with payment capability. No separate online API—IC card payments are tap-based at physical terminals. For e-commerce, support Apple Pay and Google Pay which can use the user's Suica/PASMO balance. Display 'Suica/PASMO/交通系IC対応' on signage.",
  },
  {
    id: "payment_apple_google_pay",
    platform: "Apple Pay / Google Pay",
    category: "mobile_payment",
    pattern: "Apple Pay / Google Pay adoption in Japan",
    details:
      "Apple Pay and Google Pay are growing in Japan, especially among younger users. Apple Pay supports Japanese credit cards, Suica, PASMO, and nanaco. Google Pay supports Suica, nanaco, Rakuten Edy, WAON, and QUICPay. Both use the FeliCa NFC standard for contactless in-store payments, not standard NFC-A/B.",
    implementation_notes:
      "For web payments, implement Apple Pay via Apple Pay JS API and Google Pay via Google Pay API. Use the Payment Request API for a unified flow. Display both buttons on checkout pages. In Japan, Apple Pay uses FeliCa (not EMV contactless), so in-store POS terminals must support iD or QUICPay protocols. Test on actual Japanese devices—the NFC stack differs from Western markets.",
  },
  {
    id: "payment_konbini",
    platform: "Konbini Payment",
    category: "mobile_payment",
    pattern: "Konbini payment (convenience store payment)",
    details:
      "Konbini (コンビニ) payment is uniquely Japanese: the customer receives a payment slip number at checkout, goes to a convenience store (7-Eleven, FamilyMart, Lawson, etc.), and pays in cash at the register or kiosk. Widely used by users without credit cards, younger users, and those who distrust online payment. Critical for reaching the unbanked/underbanked segment.",
    implementation_notes:
      "Integrate via payment gateways like GMO Payment Gateway, PAY.JP, or Stripe Japan (which supports konbini). Flow: generate a payment code → display code + barcode to user → user pays at konbini within deadline (typically 3-7 days) → webhook confirms payment. Display clear instructions: which konbini are supported, the payment deadline, and the payment code prominently. Show store logos (7-Eleven, Lawson, FamilyMart, Ministop). Provide a printable payment slip option.",
  },
  {
    id: "payment_cod",
    platform: "Cash on Delivery",
    category: "mobile_payment",
    pattern: "代引き (cash on delivery)",
    details:
      "代引き (daibiki, cash on delivery) remains a common payment method in Japanese e-commerce, especially for first-time purchases from unfamiliar shops, older demographics, and high-value items. The delivery driver collects payment at the door. It builds trust by eliminating prepayment risk.",
    implementation_notes:
      "Offer 代引き as a payment option with a clear surcharge note (typically ¥300-500 handling fee). Use shipping providers that support COD: Yamato Transport (クロネコヤマト), Sagawa Express, Japan Post. Display the COD fee breakdown on the order confirmation page. Set order value limits (many carriers cap COD at ¥300,000). Label clearly as '代金引換' or '代引き' in the payment selection UI.",
  },
  {
    id: "payment_bank_transfer",
    platform: "Bank Transfer",
    category: "mobile_payment",
    pattern: "Bank transfer (振込) for B2B",
    details:
      "Bank transfer (銀行振込, ginkō furikomi) is the standard payment method for B2B transactions in Japan. Invoices specify a bank account and the buyer transfers the amount. Monthly billing cycles with net-30 or net-60 terms are common. Consumer B2C bank transfer is declining but still used for large purchases.",
    implementation_notes:
      "Display bank account details clearly: bank name (銀行名), branch name (支店名), account type (普通/当座), account number (口座番号), account holder name in katakana (口座名義). For B2B SaaS, offer 請求書払い (invoice payment) with bank transfer. Include the payment reference number for reconciliation. Consider integrating with 'Pay Easy' for automated bank transfer tracking. Many companies use 経理 (accounting) software like freee or MoneyForward that auto-match transfers.",
  },
  {
    id: "payment_page_layout",
    platform: "All Payments",
    category: "mobile_payment",
    pattern: "Payment page should show all available methods with logos",
    details:
      "Japanese users expect to see all available payment methods displayed with recognizable logos on the payment selection page. Unlike Western markets where credit card is the default, Japan has many payment methods and users want to choose their preferred one. Showing multiple options also builds trust—it signals a legitimate, established business.",
    implementation_notes:
      "Display payment methods in a vertical radio-button list with official logos (not text only). Recommended order: credit card (Visa, Mastercard, JCB, AMEX) → PayPay → LINE Pay → Rakuten Pay → Merpay → Apple Pay / Google Pay → konbini payment → bank transfer → cash on delivery. Show all accepted credit card brand logos in a row. Expand the selected method's form inline (card number fields, konbini selection, etc.). Include a security badge (SSL/TLS, PCI DSS) near the credit card form. JCB must be included—it is Japan's domestic card network.",
  },

  // ─── Social Sharing ────────────────────────────────────────────────
  {
    id: "social_line_primary",
    platform: "LINE",
    category: "social_sharing",
    pattern: "LINE share button is primary (not Facebook)",
    details:
      "In Japan, LINE is the primary share channel. Sharing via LINE sends content directly to a friend or group chat, which feels like a personal recommendation. This makes LINE shares high-intent and high-conversion. Facebook share is secondary at best and irrelevant for younger demographics.",
    implementation_notes:
      "Place the LINE share button first (leftmost or topmost) in any share button group. Use the official LINE green (#06C755) icon. URL: `https://social-plugins.line.me/lineit/share?url={encoded_url}`. On mobile, use the `line://msg/text/{encoded_text_and_url}` URI scheme for direct app opening. Ensure og:title, og:description, and og:image are set for rich link previews in LINE chat.",
  },
  {
    id: "social_twitter_japan",
    platform: "Twitter/X",
    category: "social_sharing",
    pattern: "Twitter/X is very popular in Japan (2nd largest market globally)",
    details:
      "Japan is Twitter/X's second-largest market after the US. Twitter is used for real-time commentary, trending topics, news, anime/manga fandom, and anonymous expression (many users have anonymous accounts). It serves a different purpose than LINE—public broadcasting vs. private sharing. Japanese Twitter culture favors short, witty posts and image sharing.",
    implementation_notes:
      "Include a Twitter/X share button as the second option after LINE. Use the Web Intent URL: `https://twitter.com/intent/tweet?url={url}&text={text}`. Pre-populate the tweet text in Japanese. Include relevant hashtags in Japanese (e.g., #おすすめ). For content marketing, add Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image) for rich previews. Display tweet counts if available—social proof matters in Japan.",
  },
  {
    id: "social_instagram",
    platform: "Instagram",
    category: "social_sharing",
    pattern: "Instagram for visual products",
    details:
      "Instagram is heavily used in Japan for visual discovery: fashion, food (映え/インスタ映え), travel, beauty, and lifestyle products. It's a key platform for product discovery among women in their 20s-30s. Instagram Shopping is increasingly used for e-commerce. Stories and Reels are the primary content formats.",
    implementation_notes:
      "Instagram does not support direct URL sharing via share buttons (no share URL scheme for web). Instead, focus on: (1) embedding Instagram feeds on product pages, (2) displaying an Instagram follow button, (3) using Instagram Shopping tags on product posts, (4) encouraging user-generated content with a branded hashtag (e.g., #ブランド名). Add Instagram icon to the social links section. For campaigns, create Instagram-friendly visuals (1:1 or 9:16 aspect ratio).",
  },
  {
    id: "social_facebook_declining",
    platform: "Facebook",
    category: "social_sharing",
    pattern: "Facebook is declining in Japan (mainly 30+ demographic)",
    details:
      "Facebook usage in Japan has declined significantly, especially among users under 30. It is still used by the 30-50 age group and for business/professional networking. Real-name policy conflicts with Japanese preference for anonymity online. Facebook share buttons are increasingly low-priority in Japanese web design.",
    implementation_notes:
      "Include Facebook share button but place it after LINE, Twitter, and Instagram in the share order. Use the Facebook Share Dialog: `https://www.facebook.com/sharer/sharer.php?u={encoded_url}`. Set og:title, og:description, og:image for Open Graph previews. For B2B and corporate sites targeting 30+ professionals, Facebook may still be relevant. Do not make Facebook login the primary social auth option in Japan.",
  },
  {
    id: "social_hatena_bookmark",
    platform: "Hatena Bookmark",
    category: "social_sharing",
    pattern: "Hatena Bookmark (はてなブックマーク) for tech/news content",
    details:
      "Hatena Bookmark (はてブ) is a social bookmarking service unique to Japan. It is extremely popular in the tech, IT, and news communities. An article getting many 'hatena bookmarks' (ブクマ) drives significant traffic and signals quality content. The hotentry (ホットエントリー) page is a major traffic source for tech blogs and news sites.",
    implementation_notes:
      "Add a Hatena Bookmark button for tech blogs, news sites, and developer-focused content. URL: `https://b.hatena.ne.jp/entry/{page_url}`. Display the bookmark count badge—high counts serve as social proof in the Japanese tech community. Use the official B! icon. This is low priority for e-commerce or consumer apps but high priority for tech content, engineering blogs, and SaaS marketing sites.",
  },
  {
    id: "social_share_order",
    platform: "All Social",
    category: "social_sharing",
    pattern: "Social share button order for Japan",
    details:
      "The recommended social share button order for Japanese websites reflects actual usage patterns: LINE > Twitter/X > Instagram > Facebook. For tech/news content, add Hatena Bookmark. For visual/lifestyle content, elevate Instagram. This order differs significantly from Western defaults which typically lead with Facebook.",
    implementation_notes:
      "Arrange share buttons left-to-right (or top-to-bottom on mobile) in this order: (1) LINE (green #06C755), (2) Twitter/X (black or brand color), (3) Instagram (gradient or official icon), (4) Facebook (blue #1877F2). For tech content, insert Hatena Bookmark after Twitter. For B2B, consider adding LinkedIn after Facebook. Remove any share buttons with consistently zero engagement—monitor analytics. Use consistent icon sizing (40x40px minimum for touch targets).",
  },

  // ─── IME Input ─────────────────────────────────────────────────────
  {
    id: "ime_henkan_system",
    platform: "Japanese IME",
    category: "ime_input",
    pattern: "Japanese keyboard uses henkan (変換) conversion system",
    details:
      "Japanese text input uses an Input Method Editor (IME) where users type in romaji or kana, then 'convert' (変換) to the desired kanji/katakana. During conversion, the text is in a 'composition' state—underlined and uncommitted. Pressing Enter or Space cycles through conversion candidates. This two-step input process is fundamentally different from direct-input Western keyboards.",
    implementation_notes:
      "Be aware that Japanese users type in two phases: (1) input raw kana, (2) convert to kanji. The text field shows intermediate uncommitted text during composition. Do NOT intercept Enter/Space keys during composition—they are used for conversion, not submission. Use the `isComposing` property on keyboard events to check: `if (event.isComposing) return;`. This applies to all text inputs, search boxes, and forms.",
  },
  {
    id: "ime_composition_events",
    platform: "Japanese IME",
    category: "ime_input",
    pattern: "Handle IME composition events correctly",
    details:
      "The browser fires compositionstart when the user begins typing in IME mode, compositionupdate as they type/convert, and compositionend when they commit the final text. Between compositionstart and compositionend, the input is uncommitted—the user is still selecting the right kanji. Ignoring these events causes broken search, premature validation, and frustrated users.",
    implementation_notes:
      "Listen for `compositionstart`, `compositionupdate`, and `compositionend` events. Set a flag `isComposing = true` on compositionstart, `false` on compositionend. In all input handlers (search, validation, autocomplete), check this flag and skip processing while composing. Example: `input.addEventListener('compositionstart', () => { isComposing = true; }); input.addEventListener('compositionend', () => { isComposing = false; handleInput(); });`. For React, use `event.nativeEvent.isComposing` or track via state.",
  },
  {
    id: "ime_no_trigger_during_composition",
    platform: "Japanese IME",
    category: "ime_input",
    pattern: "Do NOT trigger search/validation during IME composition",
    details:
      "A common and infuriating bug on Japanese websites: the search box triggers a search on every keystroke, but during IME composition the text is incomplete gibberish (e.g., 'とうk' when typing '東京'). This causes flickering results, API spam, and a broken experience. Similarly, triggering form validation mid-composition shows false errors.",
    implementation_notes:
      "For live search / search-as-you-type: debounce input AND check `isComposing`. Only trigger search after compositionend fires. Example pattern: `const handleChange = (e) => { if (e.nativeEvent.isComposing) return; debouncedSearch(e.target.value); }`. For form validation: do not validate on `input` event during composition—validate on `compositionend` or `blur`. For character count displays, update counts on compositionend, not compositionupdate, to avoid showing misleading counts of unconverted text.",
  },
  {
    id: "ime_romaji_kana_modes",
    platform: "Japanese IME",
    category: "ime_input",
    pattern: "Handle both romaji input and kana input modes",
    details:
      "Japanese IME has two primary input modes: romaji input (ローマ字入力, typing 'tokyo' → とうきょう → 東京) and kana input (かな入力, typing directly on kana-labeled keys). Romaji input is dominant (~95% of users), but kana input has loyal users especially among older typists. Both produce the same composition events.",
    implementation_notes:
      "Your code does not need to handle these differently—the browser and IME abstract the difference. However, be aware that kana input users may accidentally submit half-width katakana or unconverted kana. Avoid keyboard shortcut assumptions: do not assume that pressing 'T' will produce 'T'—in IME mode, it produces 'と'. Use `event.key` or `event.code` (not `event.keyCode`) and always check `isComposing`. For keyboard shortcuts, use `event.code` which reflects the physical key regardless of IME state.",
  },
  {
    id: "ime_fullwidth_halfwidth",
    platform: "Japanese IME",
    category: "ime_input",
    pattern: "Full-width to half-width auto-conversion for numeric fields",
    details:
      "Japanese IME defaults to full-width (全角) characters. When users type numbers or English letters in IME mode, they get full-width versions: '１２３' instead of '123', 'ＡＢＣ' instead of 'ABC'. This breaks validation for phone numbers, postal codes, email addresses, and any field expecting ASCII input. Users often do not realize they have entered full-width characters.",
    implementation_notes:
      "Auto-convert full-width alphanumeric to half-width on blur for numeric and code fields. Conversion map: '０-９' → '0-9', 'Ａ-Ｚ' → 'A-Z', 'ａ-ｚ' → 'a-z'. In JavaScript: `str.replace(/[０-９Ａ-Ｚａ-ｚ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))`. Also convert full-width hyphen '−' and dash 'ー' to half-width '-' for phone numbers. Apply this to: phone number, postal code, email, credit card number, and any ID/code field. Do not convert full-width for name fields (names may intentionally use full-width).",
  },
  {
    id: "ime_inputmode_tel",
    platform: "Japanese IME",
    category: "ime_input",
    pattern: "Use inputmode='tel' for phone fields to skip IME",
    details:
      "Setting inputmode='tel' on phone number input fields tells the mobile browser to show a numeric keypad instead of the full keyboard with IME. This bypasses the IME entirely, preventing full-width number input and making phone number entry fast and error-free. This also applies to other numeric-only fields.",
    implementation_notes:
      "Use `inputmode='tel'` for phone number fields. Use `inputmode='numeric'` for postal codes, credit card numbers, and verification codes. Use `inputmode='email'` for email fields (shows @ key, reduces IME interference). Use `inputmode='url'` for URL fields. These attributes control the virtual keyboard on mobile without restricting actual input (unlike `type='number'` which has other side effects). Combine with `type='tel'` for phone fields for maximum compatibility. Example: `<input type='tel' inputmode='tel' pattern='[0-9-]+' />`.",
  },
];
