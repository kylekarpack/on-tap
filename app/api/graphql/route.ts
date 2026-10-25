import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers, typeDefs } from "lib/graphql";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(apolloServer);

export const GET = handler;
export const POST = handler;
