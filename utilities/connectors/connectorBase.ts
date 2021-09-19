import { Beer } from "utilities/types";
import xray from "x-ray";
import UntappdApi from "./untappd";

abstract class ConnectorBase {
  protected xray = xray();
  protected untapped = new UntappdApi();

  protected url: string;
  protected selector: string;
  protected selectors: { [key: string]: string }[];
  protected key: string;

  public async execute(): Promise<Beer[]> {
    const pageData = await this.read();
    const beers = this.process(pageData);
    return this.compare(beers);
  }

  protected async read(): Promise<Beer[]> {
    return this.xray(this.url, this.selector, this.selectors);
  }

  protected process(data: any[]): any[] {
    return data;
  }

  private async compare(beers: Beer[]): Promise<Beer[]> {
    return Promise.all(
      beers.map(async (beerData) => {
        let appendix = await this.untapped.getBeer(beerData);
        const beer = new Beer(beerData);
        beer.augment(appendix);
        return beer;
      })
    );
  }
}

export default ConnectorBase;
