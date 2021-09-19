import { Resolver, Query, Args } from "type-graphql";
import { Beer } from "utilities/types/beer";
import ConnectorBase from "../connectors/connectorBase";
import "reflect-metadata";

@Resolver(Beer)
export class BeerResolver {
	@Query(returns => [Beer])
	async beers(@Args() { venue }: { venue: string }): Promise<Beer[]> {
		let client: ConnectorBase;

		try {
			client = new (await import(`../connectors/${venue}.ts`)).default();
		} catch {
			throw new Error(`Venue "${venue}" is not registered!`);
		}
		return client.execute();
	}
}

export const resolvers = {
  Query: {
    beers: async (_: never, { venue }: { venue: string }): Promise<Beer[]> => {
      let client: ConnectorBase;

      try {
        client = new (await import(`../connectors/${venue}.ts`)).default();
      } catch {
        throw new Error(`Venue "${venue}" is not registered!`);
      }
      return client.execute();
    }
  }
};
