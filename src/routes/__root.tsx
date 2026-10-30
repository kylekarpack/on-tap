import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Meta from "components/Meta";
import { useState, type ReactNode } from "react";
import { theme } from "styles/mantineTheme";
import "styles/globals.css";
import "@mantine/core/styles/default-css-variables.css";
import "@mantine/core/styles/baseline.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Alert.css";
import "@mantine/core/styles/Anchor.css";
import "@mantine/core/styles/Card.css";
import "@mantine/core/styles/Combobox.css";
import "@mantine/core/styles/Group.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/Popover.css";
import "@mantine/core/styles/SimpleGrid.css";
import "@mantine/core/styles/Skeleton.css";
import "@mantine/core/styles/Stack.css";
import "@mantine/core/styles/Text.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "On Tap Seattle" },
      { name: "theme-color", content: "#8bd7f8", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#1a1b1e", media: "(prefers-color-scheme: dark)" },
      { name: "apple-mobile-web-app-capable", content: "yes" }
    ],
    links: [
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", href: "/icons/favicon-196.png" },
      { rel: "apple-touch-icon", href: "/icons/apple-icon-180.png" }
    ]
  }),
  component: RootComponent,
  notFoundComponent: () => <p>Not Found</p>
});

function RootComponent() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }));
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Outlet />
        </MantineProvider>
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript defaultColorScheme="auto" />
        <Meta />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
