import { os, type } from "@orpc/server";
import { Beer, BeersParams } from "lib/types";
import Bottleworks from "../connectors/bottleworks";
import Chucks from "../connectors/chucks";
import { ConnectorConstructor } from "../connectors/connectorBase";
import Flatstick from "../connectors/flatstick";
import Fremont from "../connectors/fremont";
import Pinebox from "../connectors/pinebox";

/**
 * Statically register all venue connectors
 */
const connectors: Record<string, ConnectorConstructor> = {
  bottleworks: Bottleworks,
  chucks: Chucks,
  flatstick: Flatstick,
  fremont: Fremont,
  pinebox: Pinebox
};

/**
 * The beers procedure: returns the tap list for a venue
 */
export const beers = os
  .errors({
    UNKNOWN_VENUE: {
      message: "No connector found for venue"
    }
  })
  .input(type<BeersParams>())
  // Flatten the Beer class instances to plain objects so the handler output can
  // cross the RSC boundary without Next.js complaining about class prototypes
  .output(type<Beer[]>((load) => load.map((beer) => ({ ...beer }))))
  .handler(async ({ input, errors }): Promise<Beer[]> => {
    const Constructor = connectors[input.venue];

    if (!Constructor) {
      throw errors.UNKNOWN_VENUE({ message: `No connector found for venue "${input.venue}"!` });
    }

    return new Constructor(input.params).execute();
  });

/**
 * Server-side router for oRPC. Contains no Next.js specific logic so it can be
 * reused by route handlers, tests and the server-side client.
 */
export const router = { beers };
