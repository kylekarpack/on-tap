import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import "rsuite/dist/rsuite.min.css";
import "styles/globals.css";
import { useApollo } from "../lib/apolloClient";

/**
 * Layout for all pages
 */
function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/128.png"></link>
        <link rel="stylesheet" href="https://use.typekit.net/kia0axj.css" />
        <meta name="theme-color" content="#8bd7f8" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default App;
