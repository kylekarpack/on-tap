class Beer {
	
	beer;
	brewery;
	style;
	abv;
	amount;
	rating;

	constructor(beer) {
		this.beer = beer.beer;
		this.brewery = beer.brewery;
		this.style = beer.style;
		this.abv = beer.abv;
		this.amount = beer.amount;
		this.rating = beer.rating;
	}
	
};

module.exports = Beer;