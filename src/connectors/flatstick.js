const ConnectorBase = require("../connector-base");

class Flatstick extends ConnectorBase {

	constructor() {
		super();
		this.url = "https://flatstickpub.com/pioneer-square/";
		this.selector = ".tap-list .item";
		this.selectors = [{
			beer: '.beverage',
			brewery: '.brewer',
			style: ".style",
			amount: ".amount@style"
		}];
	}

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

module.exports = Flatstick;