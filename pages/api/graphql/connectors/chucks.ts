import ConnectorBase from "./connectorBase";
import axios from "axios";
import { Beer } from "util/types/beer";

export default class Chucks extends ConnectorBase {
	constructor() {
		super();
	}

	async read(): Promise<Beer[]> {
		const { data } = await axios.get("https://taplists.web.app/data?menu=GW");
		return data.filter((el: Beer) => {
			return el.beer && el.beer !== "_" && isNaN(Number(el.beer));
		});
	}

	process(data): Beer[] {
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
