import axios from "axios";
import dotenv from "dotenv";
import { AlgoliaBeer, Beer } from "lib/types";

dotenv.config();

/**
 * Main connector to query Untappd
 */
export default class Untappd {
  /**
   * Get a beer information
   */
  async getBeer(beer: Beer): Promise<Beer> {
    let searchBeer = beer.beer?.replace(
      / (ipa|hazy|stout|porter|sour|hazy|cider|tripel|pale|iipa|pilsner|brown|ale|lager|bba|nitro)$/gi,
      ""
    );
    searchBeer = searchBeer.trim();
    [searchBeer] = searchBeer.split(" - ");
    searchBeer = searchBeer.trim();

    let brewery = beer.brewery?.trim() ?? "";
    [brewery] = brewery.split("/"); // Remove any collabs
    brewery = brewery.trim();

    const queryParams = {
      "x-algolia-agent": "Algolia for vanilla JavaScript 3.24.8",
      "x-algolia-application-id": process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      "x-algolia-api-key": process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
    };

    const beerQuery = `${encodeURIComponent(brewery)}%20${encodeURIComponent(searchBeer)}`;

    const postData = JSON.stringify({
      params: `query=${beerQuery}&hitsPerPage=1`
    });

    const search = await axios.post(
      `https://${process.env.NEXT_PUBLIC_ALGOLIA_SERVER}.algolia.net/1/indexes/beer/query`,
      postData,
      {
        params: queryParams,
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded",
          referrer: process.env.NEXT_PUBLIC_ALGOLIA_REFERRER
        }
      }
    );

    const { data } = search;
    const result: AlgoliaBeer = data.hits[0];

    return Beer.fromAlgoliaBeer(result);
  }
}
