import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    // Keep search params as plain strings (no JSON quoting), so values like
    // venueId="1" don't get serialized as venueId="\"1\"" in the URL.
    parseSearch: (searchStr) => {
      if (searchStr.startsWith("?")) searchStr = searchStr.slice(1);
      const params = new URLSearchParams(searchStr);
      const result: Record<string, string> = {};
      params.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    },
    stringifySearch: (search) => {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(search ?? {})) {
        if (value != null) {
          params.set(key, String(value));
        }
      }
      const str = params.toString();
      return str ? `?${str}` : "";
    }
  });
  return router;
}
