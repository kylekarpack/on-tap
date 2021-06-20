import { gql } from "@apollo/client";

export const GET_BEERS = gql`
	query {
		beers {
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
