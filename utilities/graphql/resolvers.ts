import { Beer } from "utilities/types";
import ConnectorBase from "../connectors/connectorBase";

export const resolvers = {
  Query: {
    beers: async (_: never, { venue }: { venue: string }): Promise<Beer[]> => {
      let client: ConnectorBase;

      try {
        client = new (await import(`../connectors/${venue}.ts`)).default();
      } catch {
        throw new Error(`No connector found for venue "${venue}"!`);
      }
      return client.execute();
    }
  }
};
