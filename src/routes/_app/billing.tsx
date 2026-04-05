import {
  Badge,
  Button,
  Card,
  Content,
  Divider,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute } from "@tanstack/react-router";

const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  width: "full",
});

const invoiceRow = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  paddingY: 12,
});

const rowTop = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
});

const invoiceId = style({
  font: "heading-sm",
  fontWeight: "bold",
});

const amount = style({
  font: "heading-sm",
  fontWeight: "bold",
});

const muted = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

const cardInner = style({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  minWidth: 0,
});

const tabPad = style({
  paddingTop: 16,
});

export const Route = createFileRoute("/_app/billing")({
  component: BillingPage,
});

function BillingPage() {
  return (
    <Content styles={stack}>
      <Tabs aria-label="請求の表示セクション">
        <TabList>
          <Tab id="open">未決済</Tab>
          <Tab id="history">支払い履歴</Tab>
        </TabList>
        <TabPanel id="open">
          <Content styles={tabPad}>
            <Card variant="primary" density="regular" UNSAFE_style={{ width: "100%", minWidth: 0 }}>
              <div className={cardInner}>
                <div className={invoiceRow}>
                  <div className={rowTop}>
                    <Text styles={invoiceId}>INV-2026-0042</Text>
                    <Badge variant="negative">期限超過</Badge>
                  </div>
                  <Text styles={muted}>請求日 2026/03/28 · 太郎 太郎（経理）</Text>
                  <Text styles={amount}>¥182,600（税込）</Text>
                </div>
                <Divider />
                <div className={invoiceRow}>
                  <div className={rowTop}>
                    <Text styles={invoiceId}>INV-2026-0041</Text>
                    <Badge fillStyle="subtle" variant="notice">
                      支払い待ち
                    </Badge>
                  </div>
                  <Text styles={muted}>請求日 2026/04/01 · 株式会社サンプル</Text>
                  <Text styles={amount}>¥1,245,000（税込）</Text>
                </div>
                <Divider />
                <Button variant="accent" UNSAFE_style={{ alignSelf: "flex-start", marginTop: 12 }}>
                  一括リマインドを送信
                </Button>
              </div>
            </Card>
          </Content>
        </TabPanel>
        <TabPanel id="history">
          <Content styles={tabPad}>
            <Card
              variant="secondary"
              density="regular"
              UNSAFE_style={{ width: "100%", minWidth: 0 }}
            >
              <div className={cardInner}>
                <div className={invoiceRow}>
                  <div className={rowTop}>
                    <Text styles={invoiceId}>INV-2026-0038</Text>
                    <Badge fillStyle="subtle" variant="positive">
                      支払い済み
                    </Badge>
                  </div>
                  <Text styles={muted}>決済日 2026/03/15 · Visa ·••• 4242</Text>
                  <Text styles={amount}>¥96,800（税込）</Text>
                </div>
                <Divider />
                <div className={invoiceRow}>
                  <div className={rowTop}>
                    <Text styles={invoiceId}>INV-2026-0037</Text>
                    <Badge fillStyle="subtle" variant="positive">
                      支払い済み
                    </Badge>
                  </div>
                  <Text styles={muted}>決済日 2026/03/02 · 銀行振込</Text>
                  <Text styles={amount}>¥328,400（税込）</Text>
                </div>
              </div>
            </Card>
          </Content>
        </TabPanel>
      </Tabs>
    </Content>
  );
}
