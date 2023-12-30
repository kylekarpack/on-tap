/* istanbul ignore file */
import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Beer {
    id: Int
    guid: ID
    beer: String
    brewery: String
    style: String
    amount: Float
    location: String
    abv: Float
    ibu: Float
    rating: Float
    ratings: Int
    details: String
    labelImageUrl: String
  }

  type Query {
    beers(venue: String!): [Beer]
  }
`;
