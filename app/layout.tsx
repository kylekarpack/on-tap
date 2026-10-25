import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Meta from "components/Meta";
import type { Metadata, Viewport } from "next";
import Providers from "./providers";
import "@mantine/core/styles.css";
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
      </head>
      <body>
        <Providers>{children}</Providers>
        <Meta />
      </body>
    </html>
  );
}
