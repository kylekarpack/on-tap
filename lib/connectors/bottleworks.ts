import axios from "axios";
import { Beer } from "lib/types";
import ConnectorBase from "./connectorBase";

/**
 * The direct URL of Bottleworks' draft list
 */
const directUrl = "https://bottleworks.com/draft-list";

/**
 * bottleworks.com is a Toast storefront behind a Cloudflare JS challenge that
 * blocks server-side requests, so fetch through the public r.jina.ai reader
 * proxy, which renders the page and returns clean markdown text
 */
const proxyUrl = `https://r.jina.ai/${directUrl}`;

/**
 * Each drink in the "Now Pouring" section renders as a markdown link whose
 * label is the beer name, optional ABV, tasting notes and trailing brewery
 * attribution, e.g.
 *
 * [Bizarre Cemetery Polka Pint 4.5% Best Bitter ale... - Bizarre](https://bottleworks.com/menu/.../item-bizarre-cemetery-polka-pint_{uuid})
 */
const itemPattern = /\[([\s\S]*?)\]\(https:\/\/bottleworks\.com\/menu\/[^)]*\/item-([a-z0-9-]+)_[0-9a-f-]+\)/gi;

/**
 * The connector for Bottleworks
 */
export default class Bottleworks extends ConnectorBase {
  /**
   * Build the connector
   */
  constructor() {
    super();
    this.key = "bottleworks";
  }

  /**
   * Get the URL from which to fetch Bottleworks beers
   */
  protected get url(): string {
    return proxyUrl;
  }

  /**
   * Provide logic to read beers
   */
  protected async read(): Promise<unknown[]> {
    const { data } = await axios.get<string>(this.url);
    return this.parse(data);
  }

  /**
   * Parse the draft list markdown for beers
   */
  parse(markdown: string): Partial<Beer>[] {
    return Array.from(markdown.matchAll(itemPattern)).map(([, label, slug]) => {
      // Undo markdown escaping (e.g. "4\.5%", "\+") and drop item images
      const text = label
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\\(.)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();

      const abvMatch = text.match(/(\d+(\.\d+)?)%/);
      const abv = abvMatch ? parseFloat(abvMatch[1]) : null;

      // The beer name precedes the ABV when present; otherwise derive it from
      // the URL slug (e.g. "bizarre-zip-zinger-fresh-hop-table-beer-pint"),
      // preferring the label casing when it simply title-cases that slug
      let beer: string;
      if (abvMatch) {
        beer = text.slice(0, abvMatch.index).trim();
      } else {
        const slugName = this.titleize(slug);
        beer = slugName.toLowerCase() === text.toLowerCase() ? text : slugName;
      }

      // Anything after the ABV (or the name) is the description, followed by
      // the trailing "- Brewery" attribution
      const rest = abvMatch ? text.slice((abvMatch.index ?? 0) + abvMatch[0].length).trim() : "";
      const attribution = rest.includes(" - ")
        ? rest.slice(rest.lastIndexOf(" - ") + 3).trim()
        : this.getCollabPrefix(beer);

      return {
        beer,
        brewery: attribution || null,
        abv,
        details: rest.replace(/ - [^-]+$/, "").trim() || null
      };
    });
  }

  /**
   * Get the collaborating brewery from a name such as "Cloudburst + Steeplejack"
   */
  getCollabPrefix(beer: string): string {
    if (!beer.includes(" + ")) {
      return "";
    }

    return beer.slice(0, beer.indexOf(" +")).trim();
  }

  /**
   * Turn a URL slug into a title, e.g. "bizarre-zip-zinger-fresh-hop-table-beer-pint"
   * to "Bizarre Zip Zinger Fresh Hop Table Beer Pint"
   */
  titleize(slug: string): string {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}
