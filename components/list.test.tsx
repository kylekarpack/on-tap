import { MantineProvider } from "@mantine/core";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { Beer, Venue } from "lib/types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import List from "./list";

/**
 * Mutable response state read by the wire-mock client, re-declared per domain below
 */
const state = vi.hoisted(() => ({
  data: [] as unknown[],
  error: undefined as unknown
}));

/**
 * Replace the oRPC client with a proxy that answers any procedure path with the
 * test state, then build the real TanStack Query utils on top of it
 */
vi.mock("lib/orpc/client", () => {
  const invocation = async () => {
    if (state.error) {
      throw state.error;
    }
    return state.data;
  };

  const client = new Proxy(invocation, {
    get: (_target, prop) => (typeof prop === "symbol" || prop === "then" ? undefined : client)
  });

  return { orpc: createTanstackQueryUtils(client as never) };
});

const testVenue: Venue = {
  label: "Chucks",
  value: "chucks",
  params: {
    venueId: "GW"
  }
};

const testSort = { dir: "asc" as const, field: "beer" as const };

function renderList() {
  return render(
    <MantineProvider>
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <List venue={testVenue} sort={testSort} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

describe("list component", () => {
  beforeEach(() => {
    state.data = [];
    state.error = undefined;
  });

  it("renders an empty list", async () => {
    const cmp = renderList();

    await waitFor(() => {
      expect(cmp.getByTestId("list")).toHaveTextContent("No beers on tap right now");
    });
  });

  it("renders error", async () => {
    state.error = new Error("Bad");

    const cmp = renderList();

    await waitFor(() => {
      expect(cmp.getByTestId("error")).toHaveTextContent("Error");
    });
  });

  it("renders list", async () => {
    state.data = [
      new Beer({
        id: 1,
        rating: 4.1,
        ratings: 10,
        beer: "Test",
        brewery: "Test Brewery",
        abv: 4,
        ibu: 15
      }),
      new Beer({ beer: "Test Partial" })
    ];

    const cmp = renderList();

    await waitFor(() => {
      expect(cmp.getByTestId("list")).toBeVisible();
      expect(cmp.getByTestId("list").childElementCount).toEqual(2);
    });
  });
});
