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
        // eslint-disable-next-line new-cap
        client = new (await import(`../connectors/${venue}.ts`)).default();
      } catch {
        throw new Error(`No connector found for venue "${venue}"!`);
      }
      return client.execute();
    }
  }
};
