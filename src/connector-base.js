
const xray = require("x-ray");
//import Beer from "./models/Beer";

class ConnectorBase {

	constructor() {
		this.xray = xray();
	}

	async read() {
		console.log(this.url);
		return this.xray(this.url, this.selector, this.selectors);
	}

	process(data) {
		//throw "Process method not implemented";
		return data;
	}

	async execute() {
		const pageData = await this.read();
		console.warn(pageData);
		return this.process(pageData);
	}

	createBeer(data) {
		//return new Beer(data);
	}

}

module.exports = ConnectorBase;