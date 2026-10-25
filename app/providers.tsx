"use client";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { theme } from "styles/mantineTheme";

/**
 * Layout for all pages
 */
export default function Providers({ children }: { children: ReactNode }) {
  // Create the client in state rather than module scope so each server render
  // and browser tab gets its own isolated cache
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
