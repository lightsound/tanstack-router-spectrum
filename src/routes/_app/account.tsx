import { Button, Content, Divider, Heading, Switch, Text, TextField } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const layout = style({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  width: "full",
  maxWidth: 720,
});

const section = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "full",
});

const sectionTitle = style({
  font: "heading-sm",
  fontWeight: "bold",
});

const fieldStack = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

const row = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
});

const help = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

const sessionList = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const sessionCard = style({
  padding: 16,
  borderRadius: "lg",
  borderWidth: 1,
  borderColor: "gray-200",
  backgroundColor: "layer-1",
});

const actions = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
  gap: 12,
});

export const Route = createFileRoute("/_app/account")({
  component: AccountPage,
});

function AccountPage() {
  const [totpEnabled, setTotpEnabled] = useState(false);

  return (
    <Content styles={layout}>
      <Content styles={section}>
        <Text styles={sectionTitle}>パスワード</Text>
        <Content styles={fieldStack}>
          <TextField label="現在のパスワード" name="current-password" type="password" />
          <TextField label="新しいパスワード" name="new-password" type="password" />
          <TextField label="新しいパスワード（確認）" name="confirm-password" type="password" />
          <Text styles={help}>デモ UI です。送信してもサーバーには保存されません。</Text>
        </Content>
        <Content styles={actions}>
          <Button variant="primary">パスワードを更新</Button>
        </Content>
      </Content>
      <Divider />
      <Content styles={section}>
        <Text styles={sectionTitle}>二要素認証</Text>
        <Content styles={row}>
          <Text>認証アプリ（TOTP）</Text>
          <Switch isSelected={totpEnabled} onChange={setTotpEnabled}>
            {totpEnabled ? "有効" : "無効"}
          </Switch>
        </Content>
        <Text styles={help}>有効にすると、ログイン時にワンタイムコードの入力が求められます。</Text>
      </Content>
      <Divider />
      <Content styles={section}>
        <Heading level={2}>アクティブなセッション</Heading>
        <Text styles={help}>
          現在ログインしている端末と場所の一覧です。見覚えのないセッションがあれば終了してください。
        </Text>
        <Content styles={sessionList}>
          <Content styles={sessionCard}>
            <Text>This Mac — Safari — 東京</Text>
            <Text styles={help}>現在のセッション</Text>
          </Content>
          <Content styles={sessionCard}>
            <Text>iPhone — アプリ — さいたま</Text>
            <Content styles={actions}>
              <Button variant="negative">セッションを終了</Button>
            </Content>
          </Content>
        </Content>
      </Content>
    </Content>
  );
}
