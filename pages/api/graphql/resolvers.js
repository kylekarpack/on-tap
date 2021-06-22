export const resolvers = {
	Query: {
		beers: async (parent, { venue }) => {
			let client;

			try {
				client = new (await import(`./connectors/${venue}.ts`)).default();
			} catch {
				throw `Venue "${venue}" is not registered!`;
			}
			return await client.execute();
		},
	},
};