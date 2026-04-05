import {
  Badge,
  Card,
  Content,
  Divider,
  Heading,
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
  alignItems: "end",
  gap: 16,
});

const kpiRow = style({
  display: "grid",
  width: "full",
  gap: 20,
  gridTemplateColumns: {
    default: "minmax(0, 1fr)",
    sm: "repeat(3, minmax(0, 1fr))",
  },
});

const kpiInner = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  minWidth: 0,
});

const kpiHead = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

const kpiValue = style({
  font: "heading-lg",
  fontWeight: "bold",
});

const muted = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

const listHeader = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 12,
  paddingBottom: 4,
});

const customerRow = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  paddingY: 12,
});

const rowTop = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
});

const nameBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
  flexGrow: 1,
});

const companyName = style({
  font: "heading-sm",
  fontWeight: "bold",
});

const metaLine = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8,
});

const emptyPad = style({
  paddingY: 24,
});

const cardBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  minWidth: 0,
});

type CustomerStatus = "active" | "trial" | "at_risk";

type CustomerRecord = {
  id: string;
  name: string;
  plan: "Enterprise" | "Business" | "Starter";
  region: string;
  status: CustomerStatus;
  contact: string;
  lastActive: string;
};

const CUSTOMERS: CustomerRecord[] = [
  {
    id: "1",
    name: "株式会社サンプル",
    plan: "Enterprise",
    region: "東京",
    status: "active",
    contact: "admin@sample.example.jp",
    lastActive: "本日 09:12",
  },
  {
    id: "2",
    name: "デモ商事",
    plan: "Business",
    region: "大阪",
    status: "active",
    contact: "billing@demo-shoji.example.jp",
    lastActive: "昨日 18:40",
  },
  {
    id: "3",
    name: "スタートアップラボ",
    plan: "Starter",
    region: "福岡",
    status: "trial",
    contact: "founder@su-lab.example.jp",
    lastActive: "3日前",
  },
  {
    id: "4",
    name: "クリエイティブ・ワークス",
    plan: "Business",
    region: "名古屋",
    status: "at_risk",
    contact: "finance@creativeworks.example.jp",
    lastActive: "7日前",
  },
  {
    id: "5",
    name: "グローバルテック合同会社",
    plan: "Enterprise",
    region: "札幌",
    status: "active",
    contact: "ops@globaltech.example.jp",
    lastActive: "本日 11:02",
  },
  {
    id: "6",
    name: "ヘルスケア総合研究所",
    plan: "Business",
    region: "横浜",
    status: "trial",
    contact: "trial@health-lab.example.jp",
    lastActive: "本日 08:05",
  },
];

function statusBadgeProps(status: CustomerStatus): {
  label: string;
  variant: "positive" | "informative" | "negative";
} {
  switch (status) {
    case "active":
      return { label: "利用中", variant: "positive" };
    case "trial":
      return { label: "トライアル", variant: "informative" };
    case "at_risk":
      return { label: "支払い遅延", variant: "negative" };
  }
}

function planBadgeProps(plan: CustomerRecord["plan"]): {
  variant: "accent" | "informative" | "neutral";
} {
  switch (plan) {
    case "Enterprise":
      return { variant: "accent" };
    case "Business":
      return { variant: "informative" };
    case "Starter":
      return { variant: "neutral" };
  }
}

type FilterKey = "all" | CustomerStatus;

export const Route = createFileRoute("/_app/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  const [filterKey, setFilterKey] = useState<FilterKey>("all");

  const filtered = CUSTOMERS.filter((c) => {
    return filterKey === "all" || c.status === filterKey;
  });

  const activeCount = CUSTOMERS.filter((c) => c.status === "active").length;
  const trialCount = CUSTOMERS.filter((c) => c.status === "trial").length;
  const atRiskCount = CUSTOMERS.filter((c) => c.status === "at_risk").length;

  return (
    <Content styles={stack}>
      <div className={toolbar}>
        <SegmentedControl
          aria-label="ステータスで絞り込み"
          selectedKey={filterKey}
          onSelectionChange={(key) => {
            setFilterKey(key as FilterKey);
          }}
        >
          <SegmentedControlItem id="all">すべて</SegmentedControlItem>
          <SegmentedControlItem id="active">利用中</SegmentedControlItem>
          <SegmentedControlItem id="trial">トライアル</SegmentedControlItem>
          <SegmentedControlItem id="at_risk">要フォロー</SegmentedControlItem>
        </SegmentedControl>
      </div>

      <Content styles={kpiRow}>
        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <Content styles={kpiInner}>
            <Content styles={kpiHead}>
              <Text>アクティブ契約</Text>
              <Badge fillStyle="subtle" variant="positive">
                健全
              </Badge>
            </Content>
            <Text styles={kpiValue}>{activeCount}</Text>
            <Text styles={muted}>稼働中の有料・本番ワークスペース</Text>
          </Content>
        </Card>
        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <Content styles={kpiInner}>
            <Content styles={kpiHead}>
              <Text>トライアル</Text>
              <Badge fillStyle="subtle" variant="informative">
                評価中
              </Badge>
            </Content>
            <Text styles={kpiValue}>{trialCount}</Text>
            <Text styles={muted}>コンバージョン施策の優先候補</Text>
          </Content>
        </Card>
        <Card variant="secondary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
          <Content styles={kpiInner}>
            <Content styles={kpiHead}>
              <Text>要フォロー</Text>
              <Badge fillStyle="subtle" variant="negative">
                優先
              </Badge>
            </Content>
            <Text styles={kpiValue}>{atRiskCount}</Text>
            <Text styles={muted}>回収・拡張が必要なアカウント</Text>
          </Content>
        </Card>
      </Content>

      <Card variant="primary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
        <div className={cardBody}>
          <Content styles={listHeader}>
            <Heading level={3}>顧客一覧</Heading>
            <Text styles={muted}>
              {filtered.length} 件表示（全 {CUSTOMERS.length} 件中）
            </Text>
          </Content>

          {filtered.length === 0 ? (
            <div className={emptyPad}>
              <Text styles={muted}>
                条件に一致する顧客がありません。フィルターまたは検索語を調整してください。
              </Text>
            </div>
          ) : (
            filtered.map((c, index) => {
              const st = statusBadgeProps(c.status);
              const pl = planBadgeProps(c.plan);
              return (
                <div key={c.id}>
                  {index > 0 ? <Divider /> : null}
                  <div className={customerRow}>
                    <div className={rowTop}>
                      <div className={nameBlock}>
                        <Text styles={companyName}>{c.name}</Text>
                        <Text styles={muted}>{c.contact}</Text>
                      </div>
                      <Badge fillStyle="subtle" variant={st.variant}>
                        {st.label}
                      </Badge>
                    </div>
                    <div className={metaLine}>
                      <Badge fillStyle="subtle" variant={pl.variant}>
                        {c.plan}
                      </Badge>
                      <Text styles={muted}>
                        {c.region} · 最終アクティビティ {c.lastActive}
                      </Text>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </Content>
  );
}
