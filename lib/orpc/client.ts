"use client";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "./router";

/**
 * The RPC link talks to the oRPC route handler at /api/rpc (same-origin path)
 */
export const link = new RPCLink({
  url: "/api/rpc"
});

/**
 * Typesafe oRPC client for the router
 */
export const client: RouterClient<typeof router> = createORPCClient(link);

/**
 * TanStack Query helpers built from the client: use with
 * `orpc.beers.queryOptions({ input })` etc.
 */
export const orpc = createTanstackQueryUtils(client);
