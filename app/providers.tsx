"use client";

import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import { theme } from "styles/mantineTheme";
import type { ReactNode } from "react";
import { useApollo } from "../lib/apolloClient";

/**
 * Layout for all pages
 */
export default function Providers({ children }: { children: ReactNode }) {
  const apolloClient = useApollo(undefined);

  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </ApolloProvider>
  );
}
