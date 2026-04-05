import {
  ActionButton,
  ActionButtonGroup,
  Badge,
  Content,
  Divider,
  Heading,
  Text,
} from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useNavigate, useRouterState } from "@tanstack/react-router";

import { NAV, navItemIsActive } from "./-app-nav";

const sidebar = style({
  width: 240,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingX: 16,
  paddingY: 24,
  backgroundColor: "layer-1",
  borderEndWidth: 1,
  borderColor: "gray-200",
  minWidth: 0,
  overflowX: "hidden",
});

const brand = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  minWidth: 0,
  width: "full",
});

const brandMark = style({
  width: 40,
  height: 40,
  borderRadius: "lg",
  backgroundColor: "accent-subtle",
  borderWidth: 1,
  borderColor: "gray-200",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "none",
});

const brandMarkLetter = style({
  font: "heading-sm",
  fontWeight: "bold",
  color: "accent",
});

const navStack = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
  width: "full",
});

const navGroup = style({
  width: "full",
});

/** 縦ナビでは ActionButton が既定で幅フィット＋中央寄せのため、行いっぱい＆左寄せにする */
const navItemButton = style({
  width: "full",
});

const brandHeading = style({
  marginTop: 0,
  marginBottom: 0,
  font: "heading-lg",
  fontWeight: "bold",
  lineHeight: "ui",
  minWidth: 0,
  flexGrow: 1,
  height: 40,
  display: "flex",
  alignItems: "center",
  overflowX: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const planFooter = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  paddingY: 4,
  boxShadow: "none",
});

const planLabel = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

export function AppSidebar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Content styles={sidebar}>
      <Content styles={brand}>
        <Content styles={brandMark} aria-hidden>
          <Text styles={brandMarkLetter}>A</Text>
        </Content>
        <Heading level={2} styles={brandHeading}>
          Acme
        </Heading>
      </Content>
      <Divider />
      <Content styles={navStack}>
        <ActionButtonGroup
          aria-label="メインメニュー"
          density="regular"
          orientation="vertical"
          styles={navGroup}
        >
          {NAV.map(({ id, label, to }) => (
            <ActionButton
              key={id}
              isQuiet={!navItemIsActive(pathname, to)}
              styles={navItemButton}
              UNSAFE_style={{ justifyContent: "start" }}
              onPress={() => {
                void navigate({ to });
              }}
            >
              {label}
            </ActionButton>
          ))}
        </ActionButtonGroup>
      </Content>
      <Divider />
      <Content styles={planFooter}>
        <Text styles={planLabel}>プラン</Text>
        <Badge fillStyle="subtle" variant="informative">
          Pro
        </Badge>
      </Content>
    </Content>
  );
}
