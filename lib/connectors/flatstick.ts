import axios from "axios";
import { Beer, OptionalParams } from "lib/types";
import ConnectorBase from "./connectorBase";

/**
 * DigitalPour condensed menu item returned from the patron mobile API
 */
type CondensedMenuItem = {
  PercentFull: number;
  BeverageName: string;
  ProducerList: string;
  BeverageStyle: string;
  FullBeverageStyle: string;
  Location: string;
  Abv: number | null;
  Ibu: number | null;
  Prices: {
    Price: number;
    DisplayName: string;
    DisplayOnMenu: boolean;
  }[];
};

/**
 * Company ID for Flatstick Pub on DigitalPour
 */
const companyId = "533c6a06fb890c0fd033e5e0";

/**
 * Patron API key used by the DigitalPour mobile apps
 */
const apiKey = "56ec4bd35e0033085c5b86db";

/**
 * The connector for Flatstick venues
 */
export default class Flatstick extends ConnectorBase {
  /**
   * Build the connector
   */
  constructor(protected params: OptionalParams) {
    super();
    this.key = "flatstick";
  }

  /**
   * Get the URL from which to fetch Flatstick beers
   */
  protected get url(): string {
    const locationId = this.params.venueId;

    return `https://mobile.digitalpour.com/DashboardServer/v7/MobileApp/CondensedMenuItems/${companyId}/${locationId}/Tap?ApiKey=${apiKey}`;
  }

  /**
   * Provide logic to read beers
   */
  protected async read(): Promise<unknown[]> {
    const { data } = await axios.get<CondensedMenuItem[]>(this.url);
    return data;
  }

  /**
   * Process the beers received from DigitalPour
   */
  process(data: CondensedMenuItem[]): Partial<Beer>[] {
    return data.map((item) => ({
      amount: Math.round(item.PercentFull * 100) || null,
      beer: item.BeverageName,
      brewery: (item.ProducerList || "").split("/")[0].trim(),
      style: (item.FullBeverageStyle || item.BeverageStyle || "").trim(),
      location: item.Location,
      abv: item.Abv,
      ibu: item.Ibu
    }));
  }
}
