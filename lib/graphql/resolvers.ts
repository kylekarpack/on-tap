import Chucks from "lib/connectors/chucks";
import Pinebox from "lib/connectors/pinebox";
import { Beer, BeersParams } from "lib/types";
import { Connector } from "../connectors/connectorBase";
import Flatstick from "../connectors/flatstick";

const connectorsMap: Record<string, Connector> = {
  "flatstick-kirkland": new Flatstick({ venueId: "kirkland" }),
  "flatstick-pioneer-square": new Flatstick({ venueId: "pioneer-square" }),
  "chucks-greenwood": new Chucks({ venueId: "GW" }),
  "chucks-seward": new Chucks({ venueId: "SW" }),
  pinebox: new Pinebox()
};

/**
 * Resolvers for GraphQL querties
 */
export const resolvers = {
  Query: {
    beers: async (_: never, { venue }: BeersParams): Promise<Beer[]> => {
      const client = connectorsMap[venue];
      if (!client) {
        throw new Error(`No connector found for venue "${venue}"!`);
      }

      return client.execute();
    }
  }
};
