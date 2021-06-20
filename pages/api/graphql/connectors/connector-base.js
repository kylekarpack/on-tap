
import xray from "x-ray";
import UntappdApi from "./untappd";
//import Beer from "./models/Beer";

class ConnectorBase {

	constructor() {
		this.xray = xray();
		this.untapped = new UntappdApi();
	}

	async read() {
		return this.xray(this.url, this.selector, this.selectors);
	}

	process(data) {
		return data;
	}

	async execute() {
		const pageData = await this.read();
		let beers = this.process(pageData);
		return await this.compare(beers);
	}

	async compare(beers) {
		let output = [];
		for (let beer of beers) {
			let appendix = await this.untapped.getBeer(beer);
			output.push({
				...beer,
				...appendix
			});
		}

		return output;

	}

	createBeer(data) {
		//return new Beer(data);
	}

}

export default ConnectorBase;