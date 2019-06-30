import { xray } from "x-ray";
//import Beer from "./models/Beer";

export default class ConnectorBase {

	constructor() {
		this.xray = new xray();
	}

	async read() {
		return this.xray(this.url, this.selector, this.selectors);
	}

	process(data) {
		//throw "Process method not implemented";
		return data;
	}

	async execute() {
		const pageData = await this.read();
		return this.process(pageData);
	}

	createBeer(data) {
		//return new Beer(data);
	}

}