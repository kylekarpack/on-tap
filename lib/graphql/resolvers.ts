import { Beer, BeersParams } from "lib/types";
import Chucks from "../connectors/chucks";
import { ConnectorConstructor } from "../connectors/connectorBase";
import Flatstick from "../connectors/flatstick";
import Fremont from "../connectors/fremont";
import Pinebox from "../connectors/pinebox";

/**
 * Statically register all venue connectors
 */
const connectors: Record<string, ConnectorConstructor> = {
  chucks: Chucks,
  flatstick: Flatstick,
  fremont: Fremont,
  pinebox: Pinebox
};

/**
 * Resolvers for GraphQL querties
 */
export const resolvers = {
  Query: {
    beers: async (_: never, { venue, params }: BeersParams): Promise<Beer[]> => {
      const Constructor = connectors[venue];

      if (!Constructor) {
        throw new Error(`No connector found for venue "${venue}"!`);
      }

      return new Constructor(params).execute();
    }
  }
};
