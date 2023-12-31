import { Head, Html, Main, NextScript } from "next/document";

/**
 * The main document template.
 */
export default function Document() {
  return (
    <Html lang="en" className="dark bg-gray-100 dark:bg-gray-800">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
