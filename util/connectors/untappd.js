
require('dotenv').config();
import xray from "x-ray";

export default class UntappdClient {

	constructor() {
		this.xray = xray();
	}

	async getBeer(beer) {			

		const url = `https://untappd.com/search?q=${encodeURIComponent(beer.brewery)}%20${encodeURIComponent(beer.beer)}&type=beer`;

		const [result] = await this.xray(url, ".results-container .beer-item", [{
			beer: ".name a",
			brewery: ".brewery a",
			style: ".style",
			rating: ".rating .num",
			ratings: ".ibu",
			details: ".name a@href"
		}]);

		if (result) {
			result.rating = Number(result.rating.replace("(", "").replace(")", ""));
		}

		return result;
	}

}