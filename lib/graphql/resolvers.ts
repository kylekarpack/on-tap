import { Beer } from "lib/types";
import { Connector, ConnectorConstructor } from "../connectors/connectorBase";

/**
 * Resolvers for GraphQL querties
 */
export const resolvers = {
  Query: {
    beers: async (_: never, { venue }: { venue: string }): Promise<Beer[]> => {
      let client: Connector;

      try {
        const { default: Constructor }: { default: ConnectorConstructor } = await import(`../connectors/${venue}.ts`);
        client = new Constructor();
      } catch (e) {
        throw new Error(`No connector found for venue "${venue}"!`);
      }
      return client.execute();
    }
  }
};
