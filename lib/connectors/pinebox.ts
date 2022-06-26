import { Beer } from "lib/types";
import ConnectorBase from "./connectorBase";

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
    this.url = "http://pinebox.jjshanks.net/draft";
    this.selector = "#draft_list tr";
    this.selectors = [
      {
        beer: ".draft_name",
        brewery: ".draft_brewery",
        location: ".draft_origin",
        abv: ".draft_abv"
      }
    ];
  }

  /**
   * Process the beers received from The Pinebox
   */
  process(data: Beer[]): Beer[] {
    for (const beer of data) {
      beer.abv = parseFloat(beer.abv?.toString()) ?? null;
    }
    return data;
  }
}
