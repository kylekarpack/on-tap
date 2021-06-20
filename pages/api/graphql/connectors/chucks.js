import ConnectorBase from "./connector-base";
import axios from "axios";

export default class Chucks extends ConnectorBase {

	constructor() {
		super();
	}

	async read() {
		const { data } = await axios.get("https://taplists.web.app/data?menu=GW");
		return data;
	}

	process(data) {
		data.forEach(d => {
			const split = d.beer.split(":");
			d.brewery = split.unshift();
			d.beer = split.join(":").trim();
		});
		return data;
	}
	
}