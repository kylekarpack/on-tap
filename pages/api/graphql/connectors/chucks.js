import ConnectorBase from "./connector-base";
import axios from "axios";

export default class Chucks extends ConnectorBase {
	constructor() {
		super();
	}

	async read() {
		const { data } = await axios.get("https://taplists.web.app/data?menu=GW");
		return data.filter(el => {
			return el.beer && el.beer !== "_" && isNaN(Number(el.beer));
		});
	}

	process(data) {
		data.forEach((d) => {
			const split = d.beer.split(":");
			d.brewery = split.shift().replace("_", "");
			d.beer = split.join(":").trim();
			d.location = d.origin;
			d.style = d.type;
			d.abv = `${d.abv}%`;
		});
		return data;
	}
}
