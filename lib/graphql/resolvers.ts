import { Beer, BeersParams } from "lib/types";
import { Connector } from "../connectors/connectorBase";
import Flatstick from "../connectors/flatstick";

const connectorsMap: Record<string, Connector> = {
  "flatstick-kirkland": new Flatstick({ venueId: "kirkland" }),
  "flatstick-pioneer-square": new Flatstick({ venueId: "pioneer-square" })
};

/**
 * Resolvers for GraphQL querties
 */
export const resolvers = {
  Query: {
    beers: async (_: never, { venue, params }: BeersParams): Promise<Beer[]> => {
      const client = connectorsMap[venue];
      if (!client) {
        throw new Error(`No connector found for venue "${venue}"!`);
      }

      return client.execute();
    }
  }
};
