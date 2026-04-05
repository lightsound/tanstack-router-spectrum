import {
  Badge,
  Card,
  Content,
  Divider,
  Heading,
  ProgressBar,
  SegmentedControl,
  SegmentedControlItem,
  Text,
} from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: "full",
});

const toolbar = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 16,
});

const metricGrid = style({
  display: "grid",
  width: "full",
  gap: 20,
  gridTemplateColumns: {
    default: "minmax(0, 1fr)",
    lg: "repeat(2, minmax(0, 1fr))",
  },
});

const metricCardInner = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
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
  font: "heading-lg",
  fontWeight: "bold",
});

const muted = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

export const Route = createFileRoute("/_app/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [range, setRange] = useState<string>("30d");

  return (
    <Content styles={stack}>
      <Content styles={toolbar}>
        <SegmentedControl
          aria-label="集計期間"
          selectedKey={range}
          onSelectionChange={(key) => {
            setRange(String(key));
          }}
        >
          <SegmentedControlItem id="7d">7日</SegmentedControlItem>
          <SegmentedControlItem id="30d">30日</SegmentedControlItem>
          <SegmentedControlItem id="90d">90日</SegmentedControlItem>
        </SegmentedControl>
        <Text styles={muted}>
          表示中: {range === "7d" ? "直近7日" : range === "30d" ? "直近30日" : "直近90日"}
        </Text>
      </Content>

      <Content styles={metricGrid}>
        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <Content styles={metricCardInner}>
            <Content styles={metricHead}>
              <Heading level={3}>ページビュー</Heading>
              <Badge fillStyle="subtle" variant="positive">
                +12.4%
              </Badge>
            </Content>
            <Text styles={metricValue}>428,900</Text>
            <Text styles={muted}>ランディングからチェックアウトまでのトラフィック</Text>
            <Divider />
            <ProgressBar label="前年同期比の達成率" value={78} />
          </Content>
        </Card>

        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <Content styles={metricCardInner}>
            <Content styles={metricHead}>
              <Heading level={3}>コンバージョン</Heading>
              <Badge fillStyle="subtle" variant="informative">
                安定
              </Badge>
            </Content>
            <Text styles={metricValue}>3.28%</Text>
            <Text styles={muted}>訪問セッションあたりの成約率（デモ）</Text>
            <Divider />
            <ProgressBar label="目標 4.0% に対する進捗" value={82} />
          </Content>
        </Card>

        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <Content styles={metricCardInner}>
            <Content styles={metricHead}>
              <Heading level={3}>解約予兆スコア</Heading>
              <Badge fillStyle="subtle" variant="notice">
                要ウォッチ
              </Badge>
            </Content>
            <Text styles={metricValue}>上位 14%</Text>
            <Text styles={muted}>利用頻度低下とサポート問い合わせから推定</Text>
            <Divider />
            <ProgressBar label="健康度（高いほど良好）" value={62} />
          </Content>
        </Card>

        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <Content styles={metricCardInner}>
            <Content styles={metricHead}>
              <Heading level={3}>平均セッション時間</Heading>
              <Badge fillStyle="subtle" variant="positive">
                +48秒
              </Badge>
            </Content>
            <Text styles={metricValue}>6分 12秒</Text>
            <Text styles={muted}>モバイルとデスクトップの加重平均</Text>
            <Divider />
            <ProgressBar label="エンゲージメント目標" value={71} />
          </Content>
        </Card>
      </Content>
    </Content>
  );
}
