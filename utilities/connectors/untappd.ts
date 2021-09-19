require("dotenv").config();
import axios from "axios";
import { Beer, AlgoliaBeer } from "utilities/types";

export default class Untappd {
  async getBeer(beer: Beer): Promise<Partial<Beer>> {
    let searchBeer = beer.beer?.replace(/ (ipa|stout|porter|sour|hazy|cider|tripel)$/gi, "");
		searchBeer = searchBeer.split(" - ")[0];
    const search = await axios.post(
      `https://${process.env.NEXT_PUBLIC_ALGOLIA_SERVER}.algolia.net/1/indexes/beer/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.24.8&x-algolia-application-id=${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}&x-algolia-api-key=${process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}`,
      {
        params: `query=${encodeURIComponent(beer.brewery)}%20${encodeURIComponent(searchBeer)}&hitsPerPage=1`
      },
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          referrer: process.env.NEXT_PUBLIC_ALGOLIA_REFERRER
        }
      }
    );

    const { data } = search;
    const result: AlgoliaBeer = data.hits[0];

    if (!result) {
      return {};
    }

    return {
      id: result.bid,
      beer: result.beer_name,
      brewery: result.brewery_name,
      style: result.type_name,
      rating: Math.round(result.rating_score * 100) / 100 || null,
      ratings: Number(result.rating_count) || null,
      abv: result.beer_abv,
      labelImageUrl: result.beer_label
    };
  }
}
