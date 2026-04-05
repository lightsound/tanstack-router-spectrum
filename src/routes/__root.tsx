import { Content, Heading, Provider, Text } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  Outlet,
  createRootRoute,
  useRouter,
  type NavigateOptions,
  type ToOptions,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import "@react-spectrum/s2/page.css";
import "../global.css";

const fallbackPage = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingX: 24,
  paddingY: 28,
  minHeight: "screen",
  width: "full",
  boxSizing: "border-box",
  backgroundColor: "layer-1",
});

const errorTitle = style({
  color: "negative",
});

const bodyText = style({
  font: "body",
  color: "neutral",
});

declare module "@react-spectrum/s2" {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Pick<NavigateOptions, Exclude<keyof NavigateOptions, keyof ToOptions>>;
  }
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
  pendingComponent: PendingComponent,
});

function RootComponent() {
  const router = useRouter();

  return (
    <Provider
      locale="ja-JP"
      router={{
        navigate: (href: ToOptions, opts) => {
          if (typeof href === "string") return;
          return router.navigate({ ...href, ...opts });
        },
        useHref: (href) => {
          if (typeof href === "string") return href;
          return router.buildLocation(href).href;
        },
      }}
    >
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </Provider>
  );
}

function NotFoundComponent() {
  return (
    <Content styles={fallbackPage}>
      <Heading level={1}>404</Heading>
      <Text styles={bodyText}>ページが見つかりませんでした。</Text>
    </Content>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <Content styles={fallbackPage}>
      <Heading level={1} styles={errorTitle}>
        エラー
      </Heading>
      <Text styles={bodyText}>{error.message}</Text>
    </Content>
  );
}

function PendingComponent() {
  return (
    <Content styles={fallbackPage}>
      <Text styles={bodyText}>読み込み中...</Text>
    </Content>
  );
}
