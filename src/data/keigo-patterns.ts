export type KeigoLevel = "casual" | "neutral" | "formal" | "very_formal";
export type UiElement = "error_message" | "button" | "label" | "tooltip" | "empty_state" | "confirmation" | "onboarding" | "notification" | "success_message";
export type Context = "b2b_saas" | "consumer_app" | "government" | "ecommerce" | "corporate" | "banking" | "youth_app" | "luxury_hospitality";

export interface KeigoPattern {
  id: string;
  english: string;
  element: UiElement;
  levels: Record<KeigoLevel, string>;
  note?: string;
}

export const CONTEXT_TO_KEIGO: Record<Context, KeigoLevel> = {
  government: "very_formal",
  banking: "very_formal",
  luxury_hospitality: "very_formal",
  b2b_saas: "formal",
  corporate: "formal",
  ecommerce: "formal",
  consumer_app: "neutral",
  youth_app: "casual",
};

export const KEIGO_PATTERNS: KeigoPattern[] = [
  // Error messages
  {
    id: "error_invalid_email",
    english: "Invalid email address",
    element: "error_message",
    levels: {
      casual: "メールアドレスが違うよ",
      neutral: "メールアドレスが正しくありません",
      formal: "メールアドレスの形式が正しくありません。正しいメールアドレスをご入力ください。",
      very_formal: "恐れ入りますが、メールアドレスの形式が正しくないようです。お手数ですが、正しいメールアドレスをご入力くださいますようお願い申し上げます。",
    },
    note: "Japanese error messages should guide the user to the correct action, not just state what's wrong.",
  },
  {
    id: "error_required_field",
    english: "This field is required",
    element: "error_message",
    levels: {
      casual: "入力してね",
      neutral: "この項目は必須です",
      formal: "この項目は必須です。ご入力ください。",
      very_formal: "恐れ入りますが、こちらは必須項目となっております。ご入力くださいますようお願いいたします。",
    },
  },
  {
    id: "error_password_short",
    english: "Password is too short",
    element: "error_message",
    levels: {
      casual: "パスワードが短すぎるよ",
      neutral: "パスワードが短すぎます",
      formal: "パスワードは8文字以上で設定してください。",
      very_formal: "恐れ入りますが、パスワードは8文字以上でご設定くださいますようお願い申し上げます。",
    },
  },
  {
    id: "error_session_expired",
    english: "Your session has expired",
    element: "error_message",
    levels: {
      casual: "セッションが切れちゃった。もう一度ログインしてね",
      neutral: "セッションが切れました。再度ログインしてください。",
      formal: "セッションの有効期限が切れました。お手数ですが、再度ログインしてください。",
      very_formal: "セッションの有効期限が切れました。誠に恐れ入りますが、再度ログインいただけますようお願い申し上げます。",
    },
  },
  {
    id: "error_network",
    english: "Network error. Please try again.",
    element: "error_message",
    levels: {
      casual: "ネットワークエラーだよ。もう一回試してね",
      neutral: "ネットワークエラーが発生しました。もう一度お試しください。",
      formal: "ネットワークエラーが発生しました。お手数ですが、しばらく経ってから再度お試しください。",
      very_formal: "ネットワークエラーが発生いたしました。誠に申し訳ございませんが、しばらく経ってから再度お試しくださいますようお願い申し上げます。",
    },
  },

  // Buttons
  {
    id: "button_submit",
    english: "Submit",
    element: "button",
    levels: {
      casual: "送信",
      neutral: "送信する",
      formal: "送信する",
      very_formal: "ご送信",
    },
  },
  {
    id: "button_register",
    english: "Register / Sign up",
    element: "button",
    levels: {
      casual: "登録する",
      neutral: "登録する",
      formal: "ご登録内容を確認する",
      very_formal: "お申し込み内容を確認する",
    },
  },
  {
    id: "button_login",
    english: "Log in",
    element: "button",
    levels: {
      casual: "ログイン",
      neutral: "ログイン",
      formal: "ログイン",
      very_formal: "ログイン",
    },
    note: "ログイン is universally used across all formality levels in Japanese.",
  },
  {
    id: "button_cancel",
    english: "Cancel",
    element: "button",
    levels: {
      casual: "キャンセル",
      neutral: "キャンセル",
      formal: "キャンセルする",
      very_formal: "取り消す",
    },
  },
  {
    id: "button_save",
    english: "Save",
    element: "button",
    levels: {
      casual: "保存",
      neutral: "保存する",
      formal: "保存する",
      very_formal: "保存する",
    },
  },
  {
    id: "button_delete",
    english: "Delete",
    element: "button",
    levels: {
      casual: "削除",
      neutral: "削除する",
      formal: "削除する",
      very_formal: "削除する",
    },
  },
  {
    id: "button_search",
    english: "Search",
    element: "button",
    levels: {
      casual: "検索",
      neutral: "検索する",
      formal: "検索する",
      very_formal: "検索する",
    },
  },
  {
    id: "button_purchase",
    english: "Purchase / Buy now",
    element: "button",
    levels: {
      casual: "買う",
      neutral: "購入する",
      formal: "ご購入手続きへ",
      very_formal: "ご購入手続きへ進む",
    },
  },
  {
    id: "button_confirm",
    english: "Confirm",
    element: "button",
    levels: {
      casual: "確認",
      neutral: "確認する",
      formal: "内容を確認する",
      very_formal: "ご入力内容を確認する",
    },
  },
  {
    id: "button_next",
    english: "Next",
    element: "button",
    levels: {
      casual: "次へ",
      neutral: "次へ",
      formal: "次のステップへ",
      very_formal: "次のステップへ進む",
    },
  },
  {
    id: "button_back",
    english: "Back",
    element: "button",
    levels: {
      casual: "戻る",
      neutral: "戻る",
      formal: "前のページに戻る",
      very_formal: "前のページに戻る",
    },
  },

  // Empty states
  {
    id: "empty_no_results",
    english: "No results found",
    element: "empty_state",
    levels: {
      casual: "見つからなかった",
      neutral: "該当する結果がありません",
      formal: "該当する結果が見つかりませんでした。条件を変更して再度お試しください。",
      very_formal: "誠に恐れ入りますが、該当する結果が見つかりませんでした。お手数ですが、条件を変更のうえ再度お試しくださいませ。",
    },
    note: "Japanese empty states should always suggest a next action. Never leave the user with just 'nothing found.'",
  },
  {
    id: "empty_no_notifications",
    english: "No notifications",
    element: "empty_state",
    levels: {
      casual: "お知らせはないよ",
      neutral: "お知らせはありません",
      formal: "現在、お知らせはありません。",
      very_formal: "現在、お知らせはございません。",
    },
  },
  {
    id: "empty_no_transactions",
    english: "No transactions yet",
    element: "empty_state",
    levels: {
      casual: "まだ取引がないよ",
      neutral: "取引履歴はまだありません",
      formal: "取引履歴はまだありません。最初のお取引を始めましょう。",
      very_formal: "取引履歴はまだございません。",
    },
  },

  // Confirmations
  {
    id: "confirm_delete",
    english: "Are you sure you want to delete this?",
    element: "confirmation",
    levels: {
      casual: "削除していい？",
      neutral: "削除してもよろしいですか？",
      formal: "この項目を削除してもよろしいですか？この操作は取り消せません。",
      very_formal: "この項目を削除してもよろしいでしょうか。この操作は元に戻すことができません。ご確認のうえ、お進みください。",
    },
  },
  {
    id: "confirm_logout",
    english: "Are you sure you want to log out?",
    element: "confirmation",
    levels: {
      casual: "ログアウトする？",
      neutral: "ログアウトしてもよろしいですか？",
      formal: "ログアウトしてもよろしいですか？",
      very_formal: "ログアウトしてもよろしいでしょうか。",
    },
  },

  // Success messages
  {
    id: "success_saved",
    english: "Successfully saved",
    element: "success_message",
    levels: {
      casual: "保存したよ！",
      neutral: "保存しました",
      formal: "正常に保存されました。",
      very_formal: "正常に保存されました。",
    },
  },
  {
    id: "success_registered",
    english: "Registration complete",
    element: "success_message",
    levels: {
      casual: "登録できたよ！",
      neutral: "登録が完了しました",
      formal: "ご登録が完了しました。ありがとうございます。",
      very_formal: "ご登録が完了いたしました。誠にありがとうございます。",
    },
  },
  {
    id: "success_purchase",
    english: "Purchase complete",
    element: "success_message",
    levels: {
      casual: "購入完了！",
      neutral: "ご購入が完了しました",
      formal: "ご注文を承りました。確認メールをお送りいたしますのでご確認ください。",
      very_formal: "ご注文を承りました。確認メールをお送りいたしますので、ご確認くださいますようお願い申し上げます。",
    },
  },

  // Labels
  {
    id: "label_required",
    english: "Required",
    element: "label",
    levels: {
      casual: "必須",
      neutral: "必須",
      formal: "必須",
      very_formal: "必須",
    },
    note: "必須 (hissu) is universal across all formality levels. Often displayed as a red badge next to the label.",
  },
  {
    id: "label_optional",
    english: "Optional",
    element: "label",
    levels: {
      casual: "任意",
      neutral: "任意",
      formal: "任意",
      very_formal: "任意",
    },
  },

  // Onboarding
  {
    id: "onboarding_welcome",
    english: "Welcome! Let's get started.",
    element: "onboarding",
    levels: {
      casual: "ようこそ！はじめよう！",
      neutral: "ようこそ！はじめましょう。",
      formal: "ようこそ。まずは初期設定を行いましょう。",
      very_formal: "ようこそお越しくださいました。まずは初期設定をご案内いたします。",
    },
  },

  // Notifications
  {
    id: "notification_update_available",
    english: "An update is available",
    element: "notification",
    levels: {
      casual: "アップデートがあるよ",
      neutral: "アップデートがあります",
      formal: "新しいアップデートが利用可能です。",
      very_formal: "新しいアップデートがご利用いただけます。",
    },
  },
];

export function getKeigoLevel(context: Context): KeigoLevel {
  return CONTEXT_TO_KEIGO[context] || "neutral";
}

export function findPattern(englishText: string): KeigoPattern | undefined {
  const lower = englishText.toLowerCase();
  return KEIGO_PATTERNS.find((p) => p.english.toLowerCase() === lower || lower.includes(p.english.toLowerCase()));
}

export function suggestKeigo(text: string, element: UiElement, context: Context): {
  suggested: string;
  level: KeigoLevel;
  levelJapanese: string;
  alternatives: Array<{ text: string; level: KeigoLevel; when: string }>;
  note: string;
} {
  const targetLevel = getKeigoLevel(context);
  const pattern = findPattern(text) || KEIGO_PATTERNS.find((p) => p.element === element);

  const LEVEL_NAMES: Record<KeigoLevel, string> = {
    casual: "カジュアル",
    neutral: "丁寧語 (teineigo)",
    formal: "尊敬語 (sonkeigo)",
    very_formal: "謙譲語 (kenjogo)",
  };

  const LEVEL_CONTEXTS: Record<KeigoLevel, string> = {
    casual: "Youth-oriented apps only. Avoid in most professional contexts.",
    neutral: "Consumer apps, general audience.",
    formal: "B2B SaaS, e-commerce, corporate sites.",
    very_formal: "Government, banking, luxury hospitality.",
  };

  if (pattern) {
    const alternatives = (Object.entries(pattern.levels) as [KeigoLevel, string][])
      .filter(([level]) => level !== targetLevel)
      .map(([level, levelText]) => ({
        text: levelText,
        level,
        when: LEVEL_CONTEXTS[level],
      }));

    return {
      suggested: pattern.levels[targetLevel],
      level: targetLevel,
      levelJapanese: LEVEL_NAMES[targetLevel],
      alternatives,
      note: pattern.note || "Japanese UI copy should guide users to the next action, not just describe a state.",
    };
  }

  return {
    suggested: `[Translation needed for: "${text}"]`,
    level: targetLevel,
    levelJapanese: LEVEL_NAMES[targetLevel],
    alternatives: [],
    note: `No pre-built pattern found. Target keigo level for ${context} context is ${targetLevel} (${LEVEL_NAMES[targetLevel]}).`,
  };
}
