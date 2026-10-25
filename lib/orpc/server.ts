import { createRouterClient } from "@orpc/server";
import type { RouterClient } from "@orpc/server";
import { router } from "./router";

declare global {
  var $client: RouterClient<typeof router> | undefined;
}

globalThis.$client = createRouterClient(router);
