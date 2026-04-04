import { Content } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";

import { resolveAppMainHeader } from "./-app-nav";
import { AppMainHeader } from "./-AppMainHeader";
import { AppSidebar } from "./-AppSidebar";
import { AppTopbar } from "./-AppTopbar";

const shell = style({
  display: "flex",
  flexDirection: "row",
  minHeight: "screen",
  width: "full",
});

const mainColumn = style({
  flexGrow: 1,
  flexShrink: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "layer-2",
});

const mainScroll = style({
  flexGrow: 1,
  overflow: "auto",
  paddingX: 24,
  paddingY: 28,
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

const mainInner = style({
  width: "full",
  maxWidth: 1120,
  marginX: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const Route = createFileRoute("/_app")({
  component: AppShellLayout,
});

function AppShellLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { sectionLabel, leadText } = resolveAppMainHeader(pathname);

  return (
    <Content styles={shell}>
      <AppSidebar />
      <Content styles={mainColumn}>
        <AppTopbar />
        <Content styles={mainScroll}>
          <Content styles={mainInner}>
            <AppMainHeader sectionLabel={sectionLabel} leadText={leadText} />
            <Outlet />
          </Content>
        </Content>
      </Content>
    </Content>
  );
}
