import { Beer } from "lib/types";
import ConnectorBase from "../connectors/connectorBase";

/**
 * Resolvers for GraphQL querties
 */
export const resolvers = {
  Query: {
    beers: async (_: never, { venue }: { venue: string }): Promise<Beer[]> => {
      let client: ConnectorBase;

      try {
        const Connector = (await import(`../connectors/${venue}.ts`)).default();
        client = new Connector();
      } catch {
        throw new Error(`No connector found for venue "${venue}"!`);
      }
      return client.execute();
    }
  }
};
