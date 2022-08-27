import xray from "x-ray";
import { Beer, OptionalParams } from "lib/types";
import UntappdApi from "./untappd";

/**
 * Interface for all connectors
 */
export interface Connector {
  /**
   * Execute the connector's function to get beers
   */
  execute: (params?: OptionalParams) => Promise<Beer[]>;
}

/**
 * Interface for a constructable connector
 */
export interface ConnectorConstructor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (params?: any): Connector;
}

/**
 * The base connector class
 */
abstract class ConnectorBase implements Connector {
  protected xray = xray();

  protected untapped = new UntappdApi();

  protected url: string;

  protected selector: string;

  protected selectors: { [key: string]: string }[];

  protected key: string;

  /**
   * Execute the read function to get beers
   */
  public async execute(params?: OptionalParams): Promise<Beer[]> {
    const pageData = await this.read(params);
    const beers = this.process(pageData);
    return this.compare(beers);
  }

  /**
   * Provide logic to read beers
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async read(params?: OptionalParams): Promise<Beer[]> {
    return this.xray(this.url, this.selector, this.selectors);
  }

  /**
   * Process the beers array
   */
  protected process(data: unknown[]): Partial<Beer>[] {
    return data;
  }

  /**
   * Compare this beer to outside data
   */
  private async compare(beers: Beer[]): Promise<Beer[]> {
    return Promise.all(
      beers.map(async (beerData) => {
        const appendix = await this.untapped.getBeer(beerData);
        const beer = new Beer(beerData);
        beer.augment(appendix);
        return beer;
      })
    );
  }
}

export default ConnectorBase;
