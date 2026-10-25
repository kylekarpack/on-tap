import { Beer, OptionalParams } from "lib/types";
import UntappdApi from "./untappd";

/**
 * Interface for all connectors
 */
export interface Connector {
  /**
   * Execute the connector's function to get beers
   */
  execute: () => Promise<Beer[]>;
}

/**
 * Interface for a constructable connector
 */
export interface ConnectorConstructor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (params?: OptionalParams): Connector;
}

/**
 * The base connector class
 */
abstract class ConnectorBase implements Connector {
  protected untapped = new UntappdApi();

  private _url: string;

  /**
   * Get the URL from which to set beers
   */
  protected get url(): string {
    return this._url;
  }

  /**
   * Set the URL from which to fetch beers
   */
  protected set url(url: string) {
    this._url = url;
  }

  protected key: string;

  /**
   * Execute the read function to get beers
   */
  public async execute(): Promise<Beer[]> {
    const pageData = await this.read();
    const beers = this.process(pageData);

    // Number the beers in the order they were fetched so the tap list can be
    // restored to its menu order after sorting by other fields
    beers.forEach((beer, index) => {
      if (beer.order == null) {
        beer.order = index;
      }
    });

    return this.compare(beers);
  }

  /**
   * Provide logic to read beers
   */
  protected async read(): Promise<unknown[]> {
    throw new Error("Not implemented");
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
