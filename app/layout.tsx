import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Meta from "components/Meta";
import type { Metadata, Viewport } from "next";
import Providers from "./providers";
// Import only the Mantine styles we actually use instead of the full bundle.
// Base styles (variables/reset/global) are provided by MantineProvider's own
// side-effect imports; the rest are the components rendered in the app.
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
import "styles/globals.css";

export const metadata: Metadata = {
  title: "On Tap Seattle",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true
  },
  icons: {
    icon: "/icons/favicon-196.png",
    apple: "/icons/apple-icon-180.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8bd7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1b1e" }
  ]
};

/**
 * Custom root layout
 *
 * mantineHtmlProps seeds data-mantine-color-scheme and suppresses its hydration
 * warning: ColorSchemeScript resolves data-mantine-color-scheme before first
 * paint so the initial render already matches the device color scheme.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <Meta />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
