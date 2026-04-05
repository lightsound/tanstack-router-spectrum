import {
  ActionButton,
  Avatar,
  Content,
  Menu,
  MenuItem,
  MenuTrigger,
  SearchField,
} from "@react-spectrum/s2";
import Bell from "@react-spectrum/s2/icons/Bell";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useNavigate } from "@tanstack/react-router";

import { accountAvatarSrc } from "./-app-nav";

const topbar = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 0,
  paddingX: 24,
  paddingY: 12,
  borderBottomWidth: 1,
  borderColor: "gray-200",
  backgroundColor: "layer-1",
  boxShadow: "none",
});

const topbarSearch = style({
  flexGrow: 1,
  flexShrink: 1,
  minWidth: 0,
});

const topbarTools = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  flexShrink: 0,
  marginStart: 32,
  paddingStart: 32,
  borderStartWidth: 1,
  borderColor: "gray-200",
});

const searchField = style({
  width: "full",
  maxWidth: 480,
});

export function AppTopbar() {
  const navigate = useNavigate();

  return (
    <Content styles={topbar}>
      <Content styles={topbarSearch}>
        <SearchField
          aria-label="検索"
          name="q"
          placeholder="プロジェクト・顧客を検索"
          styles={searchField}
        />
      </Content>
      <Content styles={topbarTools}>
        <ActionButton aria-label="通知" isQuiet>
          <Bell />
        </ActionButton>
        <ActionButton aria-label="ヘルプ（デモ）" isQuiet>
          <HelpCircle />
        </ActionButton>
        <MenuTrigger align="end">
          <ActionButton aria-label="アカウントメニュー" isQuiet>
            <Avatar alt="山田 太郎" src={accountAvatarSrc} />
          </ActionButton>
          <Menu
            aria-label="アカウント"
            onAction={(key) => {
              if (key === "profile") {
                void navigate({ to: "/profile" });
                return;
              }
              if (key === "account") {
                void navigate({ to: "/account" });
              }
            }}
          >
            <MenuItem id="profile">プロフィール</MenuItem>
            <MenuItem id="account">アカウント設定</MenuItem>
            <MenuItem id="signout">ログアウト</MenuItem>
          </Menu>
        </MenuTrigger>
      </Content>
    </Content>
  );
}
