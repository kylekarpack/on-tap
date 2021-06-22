import { Beer } from "util/types/beer";
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
				ibu: ".details .ibu",
			},
		];
	}

	process(data: Beer[]): Beer[] {
		for (let beer of data) {
			const amount = String(beer.amount).match(/[0-9]{1,3}\%/g);
			if (amount) {
				beer.amount = parseFloat(amount[0]);
			}
			beer.abv = Number(beer.abv) || null;
		}
		return data;
	}
}
