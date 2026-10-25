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
  protected async read(): Promise<Partial<Beer>[]> {
    const { data } = await axios.get<string>(this.url);
    const html = this.extractHtml(data);
    return this.process(html);
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
    const end = raw.lastIndexOf('";');

    return JSON.parse(`"${raw.slice(0, end)}"`);
  }

  /**
   * Process the beers received from Untappd
   */
  process(html: string): Partial<Beer>[] {
    const $ = cheerio.load(html);

    // Only scrape the first menu tab (Today's tap offerings)
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
