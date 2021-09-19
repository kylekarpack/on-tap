import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "utilities/graphql/schemas";
import { resolvers, BeerResolver } from "utilities/graphql/resolvers";
import { buildSchemaSync } from "type-graphql";

const schema = buildSchemaSync({
	resolvers: [BeerResolver]
});

const apolloServer = new ApolloServer({
	schema,
	resolvers,
	introspection: true,
	playground: true,
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default apolloServer.createHandler({ path: "/api/graphql" });