import axios from "axios";
import { Beer } from "utilities/types";
import ConnectorBase from "./connectorBase";

type ChucksBeer = {
  tap: number;
  beer: string;
  shop: string;
  Keg$: string;
  abv: string;
  origin: string;
  type: string;
  color: string;
  Size: string;
  serving: string;
  oz: number;
  costOz: number;
  priceOz: number;
  price: string;
  growler: number;
  crowler: number;
};

export default class Chucks extends ConnectorBase {
  async read(): Promise<Beer[]> {
    const { data } = await axios.get("https://taplists.web.app/data?menu=GW");
    return data.filter((el: ChucksBeer) => el.price !== "NaN");
  }

  process(data: ChucksBeer[]): Partial<Beer>[] {
    return data.map((d) => {
      const split = d.beer.split(":");

      return {
        brewery: split.shift().replace("_", ""),
        beer: split.join(":").trim(),
        location: d.origin,
        style: d.type,
        abv: parseFloat(d.abv) || null
      };
    });
  }
}
