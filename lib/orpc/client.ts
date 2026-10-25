import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "./router";

// Register the in-process server-side client during SSR. The build-time flag
// keeps this (and everything it imports) out of the browser bundle.
if (import.meta.env.SSR) {
  await import("./server");
}

declare global {
  var $client: RouterClient<typeof router> | undefined;
}

/**
 * The RPC link talks to the oRPC route handler at /api/rpc (same-origin path)
 */
const link = new RPCLink({
  url: "/api/rpc"
});

/**
 * Typesafe oRPC client for the router: direct in-process calls during SSR,
 * remote RPC in the browser
 */
export const client: RouterClient<typeof router> = globalThis.$client ?? createORPCClient(link);

/**
 * TanStack Query helpers built from the client: use with
 * `orpc.beers.queryOptions({ input })` etc.
 */
export const orpc = createTanstackQueryUtils(client);
