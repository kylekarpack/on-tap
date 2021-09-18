import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "utilities/graphql/schemas";
import { resolvers } from "utilities/graphql/resolvers";

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