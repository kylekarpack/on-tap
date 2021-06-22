export interface Beer {
	id: number;
	beer: string;
	brewery: string;
	style: string;
	amount: number;
	location: string;
	abv: number;
	ibu: number;
	rating: number;
	ratings: number;
	details: string;
}

export interface AlgoliaBeer {
	bid: number;
	beer_abv: number;
	beer_name: string;
	beer_index: string;
	brewery_label: string;
	brewery_name: string;
	brewery_id: number;
	type_name: string;
	type_id: number;
	homebrew: number;
	in_production: number;
	popularity: number;
	alias_alt: string[];
	spelling_alt: any[];
	brewery_alias: string[];
	beer_label: string;
	beer_index_short: string;
	beer_name_sort: string;
	brewery_name_sort: string;
	rating_score: number;
	rating_count: number;
	brewery_beer_name: string;
	index_date: string;
	objectID: string;
}
