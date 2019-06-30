import { xray } from "x-ray";

export default class ConnectorBase {

	constructor() {
		this.xray = new xray();
	}

	url = "";
	selector = "";
	selectors = [{

	}];

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

}