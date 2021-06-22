import xray from "x-ray";
import { Beer } from "util/types/beer";
import UntappdApi from "./untappd";

class ConnectorBase {
	protected xray = xray();
	protected untapped = new UntappdApi();

	protected url: string;
	protected selector: string;
	protected selectors: { [key: string]: string }[];
	protected key: string;

	public async execute(): Promise<Beer[]> {
		const pageData = await this.read();
		const beers = this.process(pageData);
		return await this.compare(beers);
	}

	protected async read(): Promise<Beer[]> {
		return this.xray(this.url, this.selector, this.selectors);
	}

	protected process(data: any[]): any[] {
		return data;
	}

	private async compare(beers: Beer[]): Promise<Beer[]> {
		let output = [];
		for (let beer of beers) {
			let appendix = await this.untapped.getBeer(beer);
			output.push({
				...beer,
				...appendix,
			});
		}

		return output;
	}
}

export default ConnectorBase;
