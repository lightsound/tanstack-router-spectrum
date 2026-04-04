import {
  Avatar,
  Button,
  Content,
  Divider,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute } from "@tanstack/react-router";

import { accountAvatarSrc } from "./-app-nav";

const layout = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: "full",
  maxWidth: 720,
});

const profileRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 20,
  flexWrap: "wrap",
});

const fieldStack = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "full",
});

const avatarNote = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

const actions = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
  gap: 12,
});

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <Content styles={layout}>
      <Content styles={profileRow}>
        <Avatar alt="山田 太郎" src={accountAvatarSrc} size={96} />
        <Content styles={fieldStack}>
          <Heading level={2}>山田 太郎</Heading>
          <Text styles={avatarNote}>
            デモです。実プロダクトではアップロードまたは連携サービスから画像を更新します。
          </Text>
          <Button variant="secondary">写真を変更</Button>
        </Content>
      </Content>
      <Divider />
      <Content styles={fieldStack}>
        <TextField label="表示名" name="display-name" defaultValue="山田 太郎" />
        <TextField label="役職" name="title" defaultValue="プロダクトマネージャー" />
        <TextField
          label="会社メール"
          name="work-email"
          defaultValue="yamada@acme.example.jp"
          type="email"
        />
        <TextField label="電話番号（任意）" name="phone" defaultValue="090-1234-5678" />
        <TextArea label="自己紹介" name="bio" placeholder="チーム向けの短い自己紹介を入力..." />
      </Content>
      <Content styles={actions}>
        <Button variant="primary">変更を保存</Button>
      </Content>
    </Content>
  );
}
