type NavId = "dash" | "analytics" | "customers" | "billing" | "settings";

type NavItem = {
  id: NavId;
  label: string;
  /** TanStack Router のパス（`_app` 直下） */
  to: "/" | "/analytics" | "/customers" | "/billing" | "/settings";
  /** メイン見出し下の説明文 */
  lead: string;
};

export const NAV: ReadonlyArray<NavItem> = [
  {
    id: "dash",
    label: "ダッシュボード",
    to: "/",
    lead: "主要指標と直近のアクティビティの概要です。",
  },
  {
    id: "analytics",
    label: "分析",
    to: "/analytics",
    lead: "トラフィック・コンバージョン・収益の推移を確認できます。",
  },
  {
    id: "customers",
    label: "顧客",
    to: "/customers",
    lead: "アカウントと契約ステータスを一覧・検索できます。",
  },
  {
    id: "billing",
    label: "請求",
    to: "/billing",
    lead: "請求書・支払い状況・利用料の内訳を管理できます。",
  },
  {
    id: "settings",
    label: "設定",
    to: "/settings",
    lead: "通知・セキュリティ・請求先などワークスペース設定を変更できます。",
  },
];

export const accountAvatarSrc = "https://i.imgur.com/xIe7Wlb.png";

type AppMainHeaderProps = {
  sectionLabel: string;
  leadText: string;
};

const ACCOUNT_MAIN_HEADERS: Readonly<Record<string, AppMainHeaderProps>> = {
  "/profile": {
    sectionLabel: "プロフィール",
    leadText: "表示名・役職・自己紹介など、他のメンバーに見える情報を編集できます。",
  },
  "/account": {
    sectionLabel: "アカウント設定",
    leadText: "ログイン方法・パスワード・二要素認証など、アカウントのセキュリティを管理します。",
  },
};

export function resolveAppMainHeader(pathname: string): AppMainHeaderProps {
  const account = ACCOUNT_MAIN_HEADERS[pathname];
  if (account) {
    return account;
  }
  const item = NAV.find((n) => (n.to === "/" ? pathname === "/" : pathname === n.to)) ?? NAV.at(0)!;
  return { sectionLabel: item.label, leadText: item.lead };
}

export function navItemIsActive(pathname: string, to: (typeof NAV)[number]["to"]): boolean {
  if (to === "/") {
    return pathname === "/";
  }
  return pathname === to;
}
