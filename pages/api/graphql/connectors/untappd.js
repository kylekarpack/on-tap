require("dotenv").config();
import axios from "axios";
import xray from "x-ray";

export default class UntappdClient {
	constructor() {
		this.xray = xray();
	}

	async getBeer(beer) {

		const search = await axios.post(
			"https://9wbo4rq3ho-dsn.algolia.net/1/indexes/beer/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.24.8&x-algolia-application-id=9WBO4RQ3HO&x-algolia-api-key=1d347324d67ec472bb7132c66aead485",
			{
				params: `query=${encodeURIComponent(
					beer.brewery
				)}%20${encodeURIComponent(beer.beer)}&hitsPerPage=1`,
			},
			{
				headers: {
					accept: "application/json",
					"accept-language": "en-US,en;q=0.9",
					"content-type": "application/x-www-form-urlencoded",
					"sec-ch-ua":
						'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"sec-ch-ua-mobile": "?0",
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "cross-site",
				},
				referrer: "https://untappd.com/",
				referrerPolicy: "origin-when-cross-origin",
			}
		);

		const { data } = search;
		const [result] = data.hits;

		if (!result) {
			return {};
		}

		console.log(result);

		return {
			beer: result.beer_name,
			brewery: result.brewery_name,
			style: result.type_name,
			rating: result.rating_score,
			ratings: result.rating_count,
		};

	}
}
