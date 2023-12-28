/* eslint-disable react/no-invalid-html-attribute */
import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import Meta from "components/Meta";
import { useApollo } from "../lib/apolloClient";
import type { AppProps } from "next/app";
import "../styles/globals.css";

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
        <NextUIProvider className="dark">
          <Component {...pageProps} />
        </NextUIProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
