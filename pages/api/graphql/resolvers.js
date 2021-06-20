export const resolvers = {
	Query: {
		beers: async (parent, args) => {
			const type = "flatstick";
			const DataSource = (await import(`./connectors/${type}.js`)).default;
			const client = new DataSource();
			const data = await client.execute();
			return data;
		},
	},
};