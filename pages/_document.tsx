import { Head, Html, Main, NextScript } from "next/document";

/**
 * The main document template.
 */
export default function Document() {
  return (
    <Html lang="en" className="dark dark:bg-gradient-to-tr dark:from-[#242425] to-[#54595e]">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
