import { ORPCError } from "@orpc/client";
import { createRouterClient } from "@orpc/server";
import axios from "axios";
import { describe, expect, it, type Mocked } from "vitest";
import { router } from "./router";

// axios is auto-mocked globally in vitest.setup.ts
const mockedAxios = axios as Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
  data: [
    {
      beer: "Brewery: Test Beer"
    }
  ]
});

/**
 * Server-side client for the router
 */
const client = createRouterClient(router);

describe("beers procedure", () => {
  it("loads beers for a known venue", async () => {
    const result = await client.beers({ venue: "chucks", params: { venueId: "GW" } });
    expect(result).toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("fails with a typesafe error when venue does not exist", async () => {
    const result = client.beers({ venue: "VenueDoesNotExist" });
    await expect(result).rejects.toMatchObject({ code: "UNKNOWN_VENUE" });

    const error: unknown = await result.catch((e) => e);
    expect(error instanceof ORPCError).toBe(true);
    expect((error as ORPCError<"UNKNOWN_VENUE", unknown>).message).toContain("VenueDoesNotExist");
  });

  it("propagates connector failures", async () => {
    mockedAxios.get.mockRejectedValue(new Error("network down"));
    await expect(client.beers({ venue: "chucks", params: { venueId: "GW" } })).rejects.toThrowError("network down");
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          beer: "Brewery: Test Beer"
        }
      ]
    });
  });
});
