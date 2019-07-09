import xray from "x-ray";
import Beer from "./models/Beer";

export default class ConnectorBase {

	constructor() {
		this.xray = xray();
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
		const processed = this.process(pageData);
		return processed.map(beer => new Beer(beer));

	}

}