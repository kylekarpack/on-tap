import axios from "axios";
import * as cheerio from "cheerio";
import { Beer } from "lib/types";
import ConnectorBase from "./connectorBase";

/**
 * The Untappd menu embed theme that powers the Pine Box's tap list
 */
const shopId = 45275;
const themeId = 170957;

/**
 * The connector for The Pinebox
 */
export default class Pinebox extends ConnectorBase {
  /**
   * Build the connector
   */
  constructor() {
    super();
    this.key = "pinebox";
  }

  /**
   * Get the URL from which to fetch Pinebox beers
   */
  protected get url(): string {
    return `https://business.untappd.com/locations/${shopId}/themes/${themeId}/js`;
  }

  /**
   * Provide logic to read beers
   */
  protected async read(): Promise<unknown[]> {
    const { data } = await axios.get<string>(this.url);
    const html = this.extractHtml(data);
    return this.parse(html);
  }

  /**
   * Extract the full menu HTML from the embed script
   */
  extractHtml(script: string): string {
    const marker = "container.innerHTML = ";
    const start = script.indexOf(marker);

    if (start < 0) {
      throw new Error("Unexpected pinebox embed script!");
    }

    const raw = script.slice(start + marker.length);

    if (raw[0] !== '"') {
      throw new Error("Unexpected pinebox embed script!");
    }

    // Locate the end of the string literal (the first unescaped quote)
    let cursor = 1;
    while (cursor < raw.length) {
      if (raw[cursor] === "\\") {
        cursor += 2;
      } else if (raw[cursor] === '"') {
        break;
      } else {
        cursor += 1;
      }
    }

    return this.unescape(raw.slice(1, cursor));
  }

  /**
   * Unescape a JavaScript string literal body
   */
  unescape(body: string): string {
    return body.replace(/\\(.)/g, (_, char) => {
      switch (char) {
        case "n":
          return "\n";
        case "t":
          return "\t";
        default:
          return char;
      }
    });
  }

  /**
   * Parse the menu HTML for beers
   */
  parse(html: string): Partial<Beer>[] {
    const $ = cheerio.load(html);

    // Only parse the first menu tab (Today's tap offerings)
    const $menu = $("div[id^='menu-']").first();

    return $(".menu-item .item", $menu)
      .toArray()
      .map((el) => {
        const details = $(el).find(".item-description").text().replace(/\s+/g, " ").trim();

        return {
          beer: $(el).find(".item-name > a > span, .item-name > a").first().text().trim(),
          brewery: ($(el).find(".brewery").text() || "").trim(),
          style: ($(el).find(".item-category").text() || "").trim(),
          location: ($(el).find(".item-brewery-location").text() || "").trim(),
          abv: parseFloat(($(el).find(".item-abv").text() || "").match(/[\d.]+/)?.[0] ?? "") || null,
          ibu: parseInt($(el).find(".item-ibu").text(), 10) || null,
          details: details || null
        };
      });
  }
}
