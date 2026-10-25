import { ColorSchemeScript } from "@mantine/core";
import Document, { Head, Html, Main, NextScript } from "next/document";

/**
 * Custom document
 *
 * ColorSchemeScript resolves data-mantine-color-scheme before first paint so
 * the initial render already matches the device color scheme.
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <ColorSchemeScript defaultColorScheme="auto" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
