import { gql } from "apollo-server-micro";

export const typeDefs = gql`
	type Beer {
		beer: String
		brewery: String
		style: String
		amount: String
		location: String
		abv: String
		ibu: String
		rating: Float
		ratings: String
		details: String
	}

	type Query {
		beers(venue: String!): [Beer]
	}
`;
