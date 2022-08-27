import { Beer, BeersParams } from "lib/types";
import { Connector, ConnectorConstructor } from "../connectors/connectorBase";

/**
 * Resolvers for GraphQL querties
 */
export const resolvers = {
  Query: {
    beers: async (_: never, { venue, params }: BeersParams): Promise<Beer[]> => {
      let client: Connector;

      try {
        const { default: Constructor }: { default: ConnectorConstructor } = await import(`../connectors/${venue}.ts`);
        client = new Constructor(params);
      } catch (e) {
        throw new Error(`No connector found for venue "${venue}"!`);
      }
      return client.execute(params);
    }
  }
};
