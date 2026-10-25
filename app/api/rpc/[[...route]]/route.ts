import { RPCHandler } from "@orpc/server/fetch";
import { router } from "lib/orpc/router";

/**
 * Serves the oRPC router over the RPC protocol, matching URLs like /api/rpc/beers
 */
const handler = new RPCHandler(router);

async function handle(request: Request): Promise<Response> {
  const { response } = await handler.handle(request, {
    prefix: "/api/rpc",
    context: {}
  });

  return response ?? new Response("Not Found", { status: 404 });
}

export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
