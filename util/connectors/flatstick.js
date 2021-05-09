import ConnectorBase from "./connector-base";

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

	process(data) {
		for (let beer of data) {
			beer.amount = beer.amount.match(/[0-9]{1,3}\%/g);
			if (beer.amount) {
				beer.amount = beer.amount[0];
			}
		}
		return data;
	}
}