"use client";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState, type ReactNode } from "react";
import { theme } from "styles/mantineTheme";

/**
 * Layout for all pages
 */
export default function Providers({ children }: { children: ReactNode }) {
  // Create the client in state rather than module scope so each server render
  // and browser tab gets its own isolated cache. staleTime keeps server-streamed
  // data from being refetched the instant hydration lands.
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }));

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            {children}
          </MantineProvider>
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
