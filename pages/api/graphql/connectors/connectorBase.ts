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
		const output = await Promise.all(
			beers.map(async (beerData) => {
				let appendix = await this.untapped.getBeer(beerData);
				const beer = new Beer(beerData);
				beer.augment(appendix);
				return beer;
			})
		);

		return output;
	}
}

export default ConnectorBase;
