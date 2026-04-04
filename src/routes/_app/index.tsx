import {
  ActionButton,
  ActionButtonGroup,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Content,
  Divider,
  Heading,
  InlineAlert,
  Link,
  Meter,
  ProgressBar,
  SearchField,
  SegmentedControl,
  SegmentedControlItem,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TagGroup,
  Text,
} from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const page = style({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  width: "full",
});

const toolbar = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "end",
  justifyContent: "space-between",
  gap: 20,
  width: "full",
});

const toolbarStart = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "end",
  gap: 16,
  minWidth: 0,
});

const searchGrow = style({
  flexGrow: 1,
  flexBasis: 240,
  minWidth: 200,
  maxWidth: 420,
});

const heroCardInner = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  minWidth: 0,
});

const heroTop = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "start",
  justifyContent: "space-between",
  gap: 20,
});

const heroCopy = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  flexGrow: 1,
  minWidth: 240,
  maxWidth: 560,
});

const heroEyebrow = style({
  font: "detail-sm",
  fontWeight: "bold",
  color: "accent",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
});

const lead = style({
  font: "body-lg",
  color: "neutral-subdued",
  lineHeight: "body",
});

const heroActions = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  alignItems: "stretch",
  minWidth: 220,
});

const switchRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  paddingY: 8,
});

const metricGrid = style({
  display: "grid",
  width: "full",
  gap: 20,
  gridTemplateColumns: {
    default: "minmax(0, 1fr)",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
  },
});

const metricCard = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,
});

const metricHead = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

const metricValue = style({
  font: "heading-xl",
  fontWeight: "bold",
});

const muted = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

const split = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 20,
  alignItems: "stretch",
  width: "full",
});

const splitMain = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  flexBasis: 0,
  flexGrow: 2,
  flexShrink: 1,
  minWidth: 280,
  width: "full",
});

const splitAside = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  flexBasis: 0,
  flexGrow: 1,
  flexShrink: 1,
  minWidth: 260,
  width: "full",
});

/** メイン列は 2:1 で伸ばす。flexBasis: 0 でタブ内容の intrinsic 幅に列幅が引きずられないようにする */
const tabPad = style({
  paddingTop: 16,
  width: "full",
  minWidth: 0,
});

const tabsOuter = style({
  display: "flex",
  flexDirection: "column",
  width: "full",
  minWidth: 0,
});

const checklistCard = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  minWidth: 0,
});

const feedRow = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  paddingY: 12,
});

const focusAreas = [
  { id: "growth", name: "成長" },
  { id: "retention", name: "解約抑止" },
  { id: "platform", name: "プラットフォーム" },
  { id: "compliance", name: "コンプライアンス" },
] as const;

export const Route = createFileRoute("/_app/")({
  component: HomeIndex,
});

function HomeIndex() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<string>("month");
  const [verboseSummary, setVerboseSummary] = useState(false);

  return (
    <Content styles={page}>
      <InlineAlert variant="informative" fillStyle="subtleFill">
        <Heading level={3}>製品アップデート</Heading>
        <Text>
          新しい請求エクスポート形式（YAML）が <Link href={{ to: "/settings" }}>設定</Link>{" "}
          から有効化できます。{" "}
          <Link href="https://example.com" target="_blank">
            リリースノート
          </Link>
          で変更点を確認できます。
        </Text>
      </InlineAlert>

      <Card variant="primary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
        <div className={heroCardInner}>
          <div className={heroTop}>
            <div className={heroCopy}>
              <Text styles={heroEyebrow}>コントロールセンター</Text>
              <Heading level={2}>ワークスペースの状態を一目で</Heading>
              <Text styles={lead}>
                {verboseSummary
                  ? "カード下部に伸び率・目標差分・前週比を含む詳細サマリーを表示するデモです。本番ではデータソースに接続します。"
                  : "主要指標だけを素早く確認し、深掘りは各セクションへジャンプしてください。"}
              </Text>
              <ActionButtonGroup aria-label="主要セクションへ移動" density="regular">
                <ActionButton onPress={() => void navigate({ to: "/analytics" })}>
                  分析を開く
                </ActionButton>
                <ActionButton onPress={() => void navigate({ to: "/customers" })}>
                  顧客一覧
                </ActionButton>
                <ActionButton onPress={() => void navigate({ to: "/billing" })}>請求</ActionButton>
              </ActionButtonGroup>
            </div>
            <div className={heroActions}>
              <Content styles={switchRow}>
                <Switch isSelected={verboseSummary} onChange={setVerboseSummary}>
                  詳細サマリーを表示
                </Switch>
              </Content>
              <Button
                variant="accent"
                UNSAFE_style={{ width: "100%" }}
                onPress={() => void navigate({ to: "/settings" })}
              >
                ワークスペースを整える
              </Button>
            </div>
          </div>
          <Meter
            label="四半期ゴール達成度"
            minValue={0}
            maxValue={100}
            value={68}
            variant="informative"
          />
        </div>
      </Card>

      <Content styles={toolbar}>
        <Content styles={toolbarStart}>
          <SegmentedControl
            aria-label="集計期間"
            selectedKey={period}
            onSelectionChange={(key) => {
              setPeriod(String(key));
            }}
          >
            <SegmentedControlItem id="week">今週</SegmentedControlItem>
            <SegmentedControlItem id="month">今月</SegmentedControlItem>
            <SegmentedControlItem id="quarter">四半期</SegmentedControlItem>
          </SegmentedControl>
        </Content>
        <SearchField
          aria-label="クイック検索"
          placeholder="顧客・請求・メンバー名で検索…"
          styles={searchGrow}
        />
      </Content>

      <TagGroup label="今期のフォーカス領域" items={[...focusAreas]} selectionMode="none">
        {(item) => <Tag>{item.name}</Tag>}
      </TagGroup>

      <div className={metricGrid}>
        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <div className={metricCard}>
            <div className={metricHead}>
              <Text>ゲーテッド機能の導入率</Text>
              <Badge fillStyle="subtle" variant="positive">
                +6 pts
              </Badge>
            </div>
            <Heading level={2} styles={metricValue}>
              74%
            </Heading>
            <ProgressBar label="ロールアウト" value={74} />
            <Text styles={muted}>
              対象: エンタープライズ枠 ·{" "}
              {period === "week" ? "7日" : period === "month" ? "30日" : "90日"}
            </Text>
          </div>
        </Card>
        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <div className={metricCard}>
            <div className={metricHead}>
              <Text>初回応答 SLA</Text>
              <Badge fillStyle="subtle" variant="informative">
                安定
              </Badge>
            </div>
            <Heading level={2} styles={metricValue}>
              1.8h
            </Heading>
            <ProgressBar label="目標 2h 以内" value={90} />
            <Text styles={muted}>中央値 · サポートキュー全体</Text>
          </div>
        </Card>
        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <div className={metricCard}>
            <div className={metricHead}>
              <Text>自動化ジョブ成功率</Text>
              <Badge fillStyle="subtle" variant="notice">
                要確認
              </Badge>
            </div>
            <Heading level={2} styles={metricValue}>
              98.2%
            </Heading>
            <ProgressBar label="直近バッチ" value={98} />
            <Text styles={muted}>失敗は主に外部 API レート制限</Text>
          </div>
        </Card>
      </div>

      <Content styles={split}>
        <Content styles={splitMain}>
          <Content styles={tabsOuter}>
            <Tabs aria-label="ホームの詳細ビュー">
              <TabList>
                <Tab id="setup">セットアップ</Tab>
                <Tab id="pulse">配信インサイト</Tab>
              </TabList>
              <TabPanel id="setup">
                <Content styles={tabPad}>
                  <Card
                    variant="primary"
                    density="compact"
                    UNSAFE_style={{ width: "100%", minWidth: 0 }}
                  >
                    <div className={checklistCard}>
                      <Heading level={3}>未完了チェック</Heading>
                      <Text styles={muted}>
                        オンボーディングを完了するとダッシュボードが充実します。
                      </Text>
                      <Divider />
                      <CheckboxGroup
                        label="ワークスペース準備"
                        defaultValue={["domain"]}
                        name="workspace-setup-demo"
                      >
                        <Checkbox value="domain">カスタムドメインと SSL を確認</Checkbox>
                        <Checkbox value="billing">請求プロファイルと税設定を入力</Checkbox>
                        <Checkbox value="sso">SSO（試用）をセットアップ</Checkbox>
                      </CheckboxGroup>
                    </div>
                  </Card>
                </Content>
              </TabPanel>
              <TabPanel id="pulse">
                <Content styles={tabPad}>
                  <Card
                    variant="primary"
                    density="regular"
                    UNSAFE_style={{ width: "100%", minWidth: 0 }}
                  >
                    <div className={checklistCard}>
                      <Heading level={3}>配信とエンゲージメント</Heading>
                      <Text styles={muted}>キャンペーンの到達とクリックのデモ指標です。</Text>
                      <Divider />
                      <Content styles={feedRow}>
                        <Text>週次ダイジェスト · 開封 41% · クリック 9.2%</Text>
                        <Text styles={muted}>セグメント: 日本語 · 活動ユーザ上位 20%</Text>
                      </Content>
                      <Divider />
                      <Content styles={feedRow}>
                        <Text>プロダクト内アナウンス · 表示 12.4k</Text>
                        <Text styles={muted}>バナー + モーダル · A/B は無効</Text>
                      </Content>
                    </div>
                  </Card>
                </Content>
              </TabPanel>
            </Tabs>
          </Content>
        </Content>
        <Content styles={splitAside}>
          <Card variant="primary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
            <div className={metricCard}>
              <Heading level={3}>オペレーション</Heading>
              <Text styles={muted}>今日のキューと優先度の見立てです。</Text>
              <Divider />
              <Content styles={feedRow}>
                <div className={metricHead}>
                  <Text>レビュー待ちの変更</Text>
                  <Badge variant="negative">2</Badge>
                </div>
                <Text styles={muted}>権限ロールと Webhook シークレット</Text>
              </Content>
              <Divider />
              <Content styles={feedRow}>
                <Text>同期ジョブ</Text>
                <Text styles={muted}>次回実行 14:00 · CRM 双方向</Text>
              </Content>
              <Button fillStyle="outline" UNSAFE_style={{ width: "100%", marginTop: 8 }}>
                キューをすべて見る
              </Button>
            </div>
          </Card>
        </Content>
      </Content>
    </Content>
  );
}
