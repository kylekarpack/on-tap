import { gql } from "@apollo/client/core";

export const GET_BEERS = gql`
	query($venue: String!) {
		beers(venue: $venue) {
			id
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
			labelImageUrl
		}
	}
`;
