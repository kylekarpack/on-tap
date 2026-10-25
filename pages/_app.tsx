import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import Meta from "components/Meta";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import "styles/globals.css";
import { theme } from "styles/mantineTheme";
import Head from "next/head";
import { useApollo } from "../lib/apolloClient";

/**
 * Layout for all pages
 */
function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <Meta />
      </Head>
      <ApolloProvider client={apolloClient}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Component {...pageProps} />
        </MantineProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
