import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "util/graphql/schemas";
import { resolvers } from "util/graphql/resolvers";

const apolloServer = new ApolloServer({
	typeDefs,
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