import axios from "axios";
import { AlgoliaBeer, Beer } from "lib/types";

/**
 * Main connector to query Untappd
 */
export default class Untappd {
  /**
   * Get a beer information
   */
  async getBeer(beer: Beer): Promise<Beer> {
    for (const query of this.queries(beer)) {
      const result = await this.search(query);

      if (result && this.isMatch(beer, result)) {
        return Beer.fromAlgoliaBeer(result);
      }
    }

    return new Beer();
  }

  /**
   * Whether an Algolia hit is a plausible match for the venue's beer.
   *
   * Guards against cross-brewery false positives: a loose query (e.g. a bare
   * beer name) can otherwise resolve to a beer from a different brewery.
   * Collab beers are exempt because the Untappd brewery may be either side of
   * the collaboration.
   */
  isMatch(beer: Beer, result: AlgoliaBeer): boolean {
    const inputBrewery = beer.brewery?.trim().split("/")[0].trim() ?? "";
    if (!inputBrewery) {
      return true;
    }

    const name = beer.beer ?? "";
    const segments = name.split(" + ");
    if (segments.length > 1) {
      return true;
    }

    const resultBrewery = (result.brewery_name ?? "").toLowerCase();
    const inputFirst = inputBrewery.split(" ")[0].toLowerCase();
    const resultFirst = resultBrewery.split(" ")[0];

    return resultBrewery.includes(inputFirst) || inputBrewery.toLowerCase().includes(resultFirst);
  }

  /**
   * Build the search queries to try, in order of decreasing specificity
   *
   * Untappd's search index requires every word of the query to match the
   * record, so try progressively shorter and simpler variants
   */
  queries(beer: Beer): string[] {
    const brewery = beer.brewery?.trim().split("/")[0].trim() ?? "";
    const breweryShort = brewery.split(" ")[0];

    let name = beer.beer?.replace(
      / (ipa|hazy|stout|porter|sour|hazy|iipa|pilsner|brown|tripel|ale|lager|bba|nitro)$/gi,
      ""
    );
    name = name.trim().split(" - ").shift().trim();

    // Separate the collaborating breweries: "BreakThru + Tall Trees Feasting
    // of Flowers" becomes "Feasting of Flowers"
    const segments = name.split(" + ");
    const core = segments[segments.length - 1].trim();

    // Remove an echo of the brewery name from the start of non-collab names,
    // e.g. "Bizarre Cemetery Polka Pint" with brewery "Bizarre"
    let partial = name;
    if (segments.length === 1 && brewery && name.toLowerCase().startsWith(`${brewery.toLowerCase()} `)) {
      partial = name.slice(brewery.length).trim();
    }

    const cleaned = this.clean(partial);

    const queries = new Set<string>();

    for (const candidate of [name, cleaned]) {
      if (!candidate) {
        continue;
      }

      if (brewery) {
        queries.add(`${brewery} ${candidate}`.trim());
      }

      if (breweryShort) {
        queries.add(`${breweryShort} ${candidate}`.trim());
      }

      // Collab segment only: the other breweries' names need not match
      if (segments.length > 1) {
        const cleanedCore = this.clean(core);
        if (brewery) {
          queries.add(`${brewery} ${cleanedCore}`.trim());
        }
        if (breweryShort) {
          queries.add(`${breweryShort} ${cleanedCore}`.trim());
        }
      }

      // Trailing style words Untappd may not carry in the beer name
      const stripped = this.stripStyles(candidate).trim();
      if (brewery) {
        queries.add(`${brewery} ${stripped}`.trim());
      }
      if (breweryShort) {
        queries.add(`${breweryShort} ${stripped}`.trim());
      }
      if (!brewery) {
        queries.add(stripped);
      }
    }

    return Array.from(queries).filter((query) => query.trim().length > 0);
  }

  /**
   * Run an Untappd search
   */
  async search(query: string): Promise<AlgoliaBeer | undefined> {
    const queryParams = {
      "x-algolia-agent": "Algolia for vanilla JavaScript 3.24.8",
      "x-algolia-application-id": process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      "x-algolia-api-key": process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
    };

    const beerQuery = encodeURIComponent(query);

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
    return data.hits[0];
  }

  /**
   * Clean a beer name of tokens Untappd does not index: serving sizes,
   * fresh-hop variants, "FH" abbreviations and vintages
   */
  clean(name: string): string {
    return name
      .replace(/(\(\s*)?\d+(\.\d+)?\s*oz(\s*\))?\s*$/gi, "")
      .replace(/\s+(pint|half\s+pint)\s*$/gi, "")
      .replace(/\b(fresh\s*hop|fh)\b/gi, " ")
      .replace(/(\d{4})$/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s(-]+/g, "")
      .trimEnd()
      .trim();
  }

  /**
   * Remove trailing style words from a beer name
   */
  stripStyles(name: string): string {
    return name
      .replace(/(\s+(?:hazy|ipa|ale|stout|pilsner|porter|sour|lager|pale|tripel|nitro|cider))+\s*$/gi, "")
      .trim();
  }
}
