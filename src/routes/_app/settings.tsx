import {
  Accordion,
  AccordionItem,
  AccordionItemHeader,
  AccordionItemPanel,
  AccordionItemTitle,
  Checkbox,
  Content,
  Divider,
  Link,
  Radio,
  RadioGroup,
  Switch,
  Text,
  TextField,
} from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  width: "full",
  maxWidth: 720,
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

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <Content styles={stack}>
      <Accordion
        aria-label="設定カテゴリ"
        allowsMultipleExpanded
        defaultExpandedKeys={new Set(["general", "notifications"])}
      >
        <AccordionItem id="general">
          <AccordionItemHeader>
            <AccordionItemTitle>一般</AccordionItemTitle>
          </AccordionItemHeader>
          <AccordionItemPanel>
            <Content styles={fieldStack}>
              <TextField label="ワークスペース名" defaultValue="Acme Japan" name="ws-name" />
              <TextField
                label="請求メール"
                defaultValue="billing@acme.example.jp"
                name="billing-email"
              />
              <Text styles={help}>
                請求関連の通知はこのアドレスに送られます。{" "}
                <Link href="https://example.com" target="_blank">
                  請求ポリシー
                </Link>
              </Text>
            </Content>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem id="notifications">
          <AccordionItemHeader>
            <AccordionItemTitle>通知</AccordionItemTitle>
          </AccordionItemHeader>
          <AccordionItemPanel>
            <Content styles={fieldStack}>
              <Content styles={row}>
                <Text>週次サマリーメール</Text>
                <Switch isSelected={weeklyDigest} onChange={setWeeklyDigest}>
                  有効
                </Switch>
              </Content>
              <Divider />
              <Content styles={row}>
                <Text>セキュリティアラート</Text>
                <Switch isSelected={securityAlerts} onChange={setSecurityAlerts}>
                  有効
                </Switch>
              </Content>
              <Divider />
              <Content styles={row}>
                <Text>プロダクトアップデート</Text>
                <Switch isSelected={marketing} onChange={setMarketing}>
                  オプトイン
                </Switch>
              </Content>
            </Content>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem id="privacy">
          <AccordionItemHeader>
            <AccordionItemTitle>データとプライバシー</AccordionItemTitle>
          </AccordionItemHeader>
          <AccordionItemPanel>
            <Content styles={fieldStack}>
              <Checkbox defaultSelected>利用状況の匿名統計を共有する（推奨）</Checkbox>
              <Checkbox>AI 機能のためにコンテンツを処理に使う</Checkbox>
              <Text styles={help}>
                デモ UI です。実プロダクトでは同意履歴と DPA をここに結びます。
              </Text>
            </Content>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem id="locale">
          <AccordionItemHeader>
            <AccordionItemTitle>地域とフォーマット</AccordionItemTitle>
          </AccordionItemHeader>
          <AccordionItemPanel>
            <RadioGroup label="週の開始日" name="week-starts-on" defaultValue="mon">
              <Radio value="mon">月曜日</Radio>
              <Radio value="sun">日曜日</Radio>
            </RadioGroup>
            <Text styles={help}>カレンダーとレポートの週境界に反映されます。</Text>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </Content>
  );
}
