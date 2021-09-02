import { gql } from "apollo-server-micro";

export const typeDefs = gql`
	type Beer {
		id: Int
		beer: String
		brewery: String
		style: String
		amount: Float
		location: String
		abv: Float
		ibu: Float
		rating: Float
		ratings: String
		details: String
		labelImageUrl: String
	}

	type Query {
		beers(venue: String!): [Beer]
	}
`;
