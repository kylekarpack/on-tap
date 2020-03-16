
require('dotenv').config();
const xray = require("x-ray");
const axios = require("axios");

class UntappdClient {

	constructor() {
		this.xray = xray();
	}

	async getBeer(beer) {			

		const url = `https://untappd.com/search?q=${encodeURIComponent(beer.brewery)}%20${encodeURIComponent(beer.beer)}&type=beer`;

		let results = await this.xray(url, ".results-container .beer-item", [{
			beer: ".name a",
			brewery: ".brewery a",
			style: ".style",
			rating: ".rating .num"
		}]);

		const result = results[0];

		if (result) {
			result.rating = Number(result.rating.replace("(", "").replace(")", ""));
		}

		return result;
	}

}

module.exports = UntappdClient;