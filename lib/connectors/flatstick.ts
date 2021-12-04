import { Beer } from "lib/types";
import ConnectorBase from "./connectorBase";

/**
 * The base connector for Flatstick venues
 */
export default class Flatstick extends ConnectorBase {
  /**
   * Build the connector
   */
  constructor() {
    super();
    this.key = "flatstick";
    this.url = "https://flatstickpub.com/pioneer-square/";
    this.selector = ".tap-list .item";
    this.selectors = [
      {
        beer: ".beverage",
        brewery: ".brewer",
        style: ".style",
        amount: ".amount@style",
        location: ".details .location",
        abv: ".details .abv",
        ibu: ".details .ibu"
      }
    ];
  }

  /**
   * Process the beers received from Flatstick
   */
  process(data: Beer[]): Beer[] {
    for (const beer of data) {
      const amount = String(beer.amount).match(/\d{1,3}%/g);
      if (amount) {
        beer.amount = parseFloat(amount[0]);
      }
      if (beer.ibu) {
        beer.ibu = parseFloat(String(beer.ibu));
      }
      beer.abv = Number(beer.abv) || null;
      beer.style = beer.style?.trim();
    }
    return data;
  }
}