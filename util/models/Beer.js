class Beer {
	
	beer;
	brewery;
	style;
	abv;
	amount;
	rating;

	constructor(beer) {
		this.beer = this.normalize(beer.beer);
		this.brewery = this.normalize(beer.brewery);
		this.style = this.normalize(beer.style);
		this.location = this.normalize(beer.location);
		this.abv = parseFloat(beer.abv) || null;
		this.ibu = parseFloat(beer.ibu) || null;
		this.amount = parseFloat(beer.amount) || null;
		this.price = parseFloat(beer.price) || null;
		this.rating = beer.rating || null;
	}

	normalize(str) {
		return String(str || "").trim().normalize();
	}
	
};

module.exports = Beer;