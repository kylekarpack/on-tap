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
    const candidates: AlgoliaBeer[] = [];

    for (const query of this.queries(beer)) {
      const results = await this.search(query);

      for (const result of results) {
        if (result && this.isMatch(beer, result)) {
          candidates.push(result);
        }
      }
    }

    if (candidates.length === 0) {
      return new Beer();
    }

    const inputTokens = new Set(this.distinctiveTokens(beer.beer ?? ""));

    const rawTokens = (value: string): string[] =>
      value
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u)
        .filter((token) => token.length >= 2);

    const inputRaw = rawTokens(beer.beer ?? "");

    const score = (result: AlgoliaBeer): { missing: number; matched: number; extra: number; length: number } => {
      const resultTokens = new Set(this.distinctiveTokens(result.beer_name ?? ""));
      let missing = 0;
      for (const token of inputTokens) {
        if (!resultTokens.has(token)) {
          missing++;
        }
      }
      let extra = 0;
      for (const token of resultTokens) {
        if (!inputTokens.has(token)) {
          extra++;
        }
      }
      const resultRaw = new Set(rawTokens(result.beer_name ?? ""));
      let matched = 0;
      for (const token of inputRaw) {
        if (resultRaw.has(token)) {
          matched++;
        }
      }
      return { missing, matched, extra, length: (result.beer_name ?? "").length };
    };

    candidates.sort((a, b) => {
      const sa = score(a);
      const sb = score(b);
      if (sa.missing !== sb.missing) {
        return sa.missing - sb.missing;
      }
      if (sa.matched !== sb.matched) {
        return sb.matched - sa.matched;
      }
      if (sa.extra !== sb.extra) {
        return sa.extra - sb.extra;
      }
      return sa.length - sb.length;
    });

    return Beer.fromAlgoliaBeer(candidates[0]);
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
    const inputBrewery = this.normalizeBrewery(beer.brewery);
    if (!inputBrewery) {
      return true;
    }

    const name = beer.beer ?? "";
    const segments = name.split(" + ");
    if (segments.length > 1) {
      return true;
    }

    const resultBrewery = (result.brewery_name ?? "").toLowerCase();
    const inputWords = inputBrewery.toLowerCase().split(/\s+/).filter(Boolean);
    const inputToken = inputWords[inputWords.length - 1] ?? "";
    const resultBeerLower = (result.beer_name ?? "").toLowerCase();
    const breweryOk =
      (inputToken.length >= 2 && resultBrewery.includes(inputToken)) ||
      (inputToken.length >= 2 && resultBeerLower.includes(inputToken));

    if (!breweryOk) {
      return false;
    }

    const resultBeer = (result.beer_name ?? "").toLowerCase();
    if (resultBeer) {
      const inputTokens = this.distinctiveTokens(beer.beer ?? "");
      if (inputTokens.length > 0) {
        const resultTokens = new Set(this.distinctiveTokens(resultBeer));
        const overlap = inputTokens.some((token) => resultTokens.has(token));
        if (!overlap) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Build the search queries to try, in order of decreasing specificity
   *
   * Untappd's search index requires every word of the query to match the
   * record, so try progressively shorter and simpler variants
   */
  queries(beer: Beer): string[] {
    const brewery = this.normalizeBrewery(beer.brewery);
    const breweryShort = brewery.split(" ")[0];

    const withSynonyms = (beer.beer ?? "").replace(/\bextra special bitter\b/gi, "esb");
    let name = withSynonyms.replace(
      / (ipa|hazy|stout|porter|sour|hazy|iipa|diipa|dipa|pilsner|pils|brown|tripel|ale|lager|bba|nitro|cider|hefeweizen|dunkel|bitter|saison|modern|honey|pub|hard|extra|special|kombucha|seltzer)$/gi,
      ""
    );
    name = name.trim().split(/\s+-/).shift().trim();

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
        if (cleanedCore) {
          if (brewery) {
            queries.add(`${brewery} ${cleanedCore}`.trim());
          }
          if (breweryShort) {
            queries.add(`${breweryShort} ${cleanedCore}`.trim());
          }
          if (!brewery) {
            queries.add(cleanedCore);
          }
        }
      }

      // Trailing style words Untappd may not carry in the beer name
      const stripped = this.stripStyles(candidate).trim();
      if (stripped) {
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
    }

    return Array.from(queries).filter((query) => query.trim().length > 0);
  }

  /**
   * Run an Untappd search
   */
  async search(query: string): Promise<AlgoliaBeer[]> {
    const queryParams = {
      "x-algolia-agent": "Algolia for vanilla JavaScript 3.24.8",
      "x-algolia-application-id": process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      "x-algolia-api-key": process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
    };

    const beerQuery = encodeURIComponent(query);

    const postData = JSON.stringify({
      params: `query=${beerQuery}&hitsPerPage=5`
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
    return data.hits ?? [];
  }

  /**
   * Normalize a brewery name for matching/searching: drop leading emoji and
   * other non-alphanumeric decoration that venues use (e.g. the 🌱 fresh-hop
   * marker) and take the first segment of a collaboration.
   */
  normalizeBrewery(brewery: string | null | undefined): string {
    let raw = brewery?.trim().split("/")[0].trim() ?? "";
    raw = raw.replace(/\([^)]*\)/g, " ");
    raw = raw.replace(/^[^\p{L}\p{N}]+/u, "").trim();
    if (/leaked|cooler|see note/i.test(raw)) {
      const tokens = raw.split(/\s+/).filter(Boolean);
      raw = tokens[tokens.length - 1] ?? raw;
    }
    return raw.replace(/\s+/g, " ").trim();
  }

  /**
   * Tokens of a beer name that are distinctive (not generic style words).
   */
  distinctiveTokens(value: string): string[] {
    const stopWords = new Set([
      "fresh",
      "wet",
      "hop",
      "hops",
      "ipa",
      "iipa",
      "diipa",
      "dipa",
      "hazy",
      "ale",
      "stout",
      "porter",
      "sour",
      "lager",
      "pils",
      "pilsner",
      "pale",
      "tripel",
      "nitro",
      "cider",
      "wc",
      "west",
      "coast",
      "ddh",
      "the",
      "and",
      "of",
      "a",
      "an",
      "to",
      "in",
      "on",
      "at",
      "for",
      "with",
      "no",
      "series",
      "season",
      "dark",
      "mild",
      "amber",
      "extra",
      "special",
      "bitter",
      "hard",
      "non",
      "alcoholic",
      "bba",
      "ba",
      "imperial",
      "double",
      "single"
    ]);
    return value
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((token) => token.length >= 3 && !stopWords.has(token));
  }

  /**
   * Clean a beer name of tokens Untappd does not index: serving sizes,
   * fresh-hop variants, "FH" abbreviations and vintages
   */
  clean(name: string): string {
    return name
      .replace(/&/g, " ")
      .replace(/^[\s'"\u2018\u2019]+/g, "")
      .replace(/(\(\s*)?\d+(\.\d+)?\s*oz(\s*\))?\s*$/gi, "")
      .replace(/\s+(pint|half\s+pint)\s*$/gi, "")
      .replace(/\b(fresh\s*hop|wet\s*hop|fh)\b/gi, " ")
      .replace(/\bextra special bitter\b/gi, "esb")
      .replace(/\bextra special bitter\b/gi, "esb")
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
      .replace(
        /(\s+(?:hazy|ipa|iipa|diipa|dipa|ale|stout|porter|sour|lager|pale|tripel|nitro|cider|pilsner|pils|wc|ddh|mosaic|citra|simcoe|cascade|amarillo|centennial|chinook|columbus|galaxy|nelson|hefeweizen|dunkel|bitter|mexican|dark|mild|fruh|früh|saison|extra|special|hard|honey|pub|modern|ginger|kombucha|seltzer|grapefruit|mojito))+\s*$/gi,
        ""
      )
      .trim();
  }
}
