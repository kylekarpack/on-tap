import { gql } from "@apollo/client";

export const GET_BEERS = gql`
	query($venue: String!) {
		beers(venue: $venue) {
			beer
			brewery
			style
			amount
			location
			abv
			ibu
			rating
			ratings
			details
		}
	}
`;
