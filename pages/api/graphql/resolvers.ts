import { Beer } from "util/types/beer";
import ConnectorBase from "./connectors/connectorBase";

export const resolvers = {
	Query: {
		beers: async (_, { venue }): Promise<Beer[]> => {
			let client: ConnectorBase;

			try {
				client = new (await import(`./connectors/${venue}.ts`)).default();
			} catch {
				throw `Venue "${venue}" is not registered!`;
			}
			return await client.execute();
		},
	},
};