import Flatstick from "../../../util/connectors/flatstick";

export const resolvers = {
	Query: {
		beers: async (parent, args) => {
			const type = "flatstick";
			const DataSource = (await import(`../../../util/connectors/${type}.js`)).default;
			const client = new DataSource();
			const data = await client.execute();
			return data;
		},
	},
};