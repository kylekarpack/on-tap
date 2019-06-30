import ConnectorBase from "../connector-base";

export default class Flatstick extends ConnectorBase {

	url = "https://flatstickpub.com/kirkland/";
	selector = ".tap-list .item";
	selectors = [{
		beer: '.beverage',
		brewery: '.brewer',
		style: ".style",
		amount: ".amount@style"
	}];

	process(data) {
		for (let beer of data) {
			beer.amount = beer.amount.match(/[0-9]{1,3}\%/g);
			if (beer.amount) {
				beer.amount = beer.amount[0];
			}
		}

		return this.createBeer(data);;
	}
	
}