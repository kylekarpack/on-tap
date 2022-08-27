/* istanbul ignore file */
import { gql } from "apollo-server-micro";

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

  input Params {
    venueId: String
  }

  type Query {
    beers(venue: String!, params: Params): [Beer]
  }
`;
