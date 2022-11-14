import { ApolloServer } from "apollo-server-micro";
import { resolvers, typeDefs } from "lib/graphql";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.start().then(() => {
  const handler = apolloServer.createHandler({ path: "/api/graphql" });
  return handler;
});
