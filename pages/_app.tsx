/* eslint-disable react/no-invalid-html-attribute */
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material";
import Meta from "components/Meta";
import type { AppProps } from "next/app";
import "styles/globals.css";
import Head from "next/head";
import { useApollo } from "../lib/apolloClient";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8bd7f8"
    }
  }
});

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
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
