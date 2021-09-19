import { Beer } from "utilities/types";
import ConnectorBase from "./connectorBase";

export default class Flatstick extends ConnectorBase {
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

  process(data: Beer[]): Beer[] {
    for (let beer of data) {
      const amount = String(beer.amount).match(/\d{1,3}\%/g);
      if (amount) {
        beer.amount = parseFloat(amount[0]);
      }
      if (beer.ibu) {
        beer.ibu = parseFloat(beer.ibu as any);
      }
      beer.abv = Number(beer.abv) || null;
      beer.style = beer.style?.trim();
    }
    return data;
  }
}
