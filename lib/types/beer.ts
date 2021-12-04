import { AlgoliaBeer } from "./algoliaBeer";

/**
 * Beer data container
 */
export class Beer {
  /**
   * Create a beer from a partial beer
   */
  constructor(source?: Partial<Beer>) {
    if (source != null) {
      Object.assign(this, source);
    }
  }

  /**
   * Create a beer from an Algolia beer search result
   */
  public fromAlgoliaBeer?(source: AlgoliaBeer) {
    if (source == null) {
      return new Beer();
    }

    const beer: Partial<Beer> = {
      id: source.bid,
      beer: source.beer_name,
      brewery: source.brewery_name,
      style: source.type_name,
      rating: Math.round(source.rating_score * 100) / 100 || null,
      ratings: Number(source.rating_count) || null,
      abv: source.beer_abv,
      labelImageUrl: source.beer_label
    };

    return new Beer(beer);
  }

  /**
   * Augment a beer's data with data from another beer object
   */
  public augment?(beer: Partial<Beer>) {
    Object.keys(beer).forEach((key) => {
      if ((beer as any)[key] != null && (this as any)[key] == null) {
        (this as any)[key] = (beer as any)[key];
      }
    });
  }

  /**
   * The name of this beer
   */
  public beer?: string = null;

  /**
   * The id of this beer in Untappd
   */
  public id?: number = null;

  /**
   * The brewery for this beer
   */
  public brewery?: string = null;

  /**
   * The style of this beer
   */
  public style?: string = null;

  /**
   * The amount of this beer remaining at the given venue
   */
  public amount?: number = null;

  /**
   * The location this beer was brewed
   */
  public location?: string = null;

  /**
   * The alcohol by volume percetage of this beer
   */
  public abv?: number = null;

  /**
   * The international bitterness units measurement of this beer
   */
  public ibu?: number = null;

  /**
   * The Untapped rating of this beer
   */
  public rating?: number = null;

  /**
   * The number of ratings received
   */
  public ratings?: number = null;

  /**
   * Any details or description of this beer
   */
  public details?: string = null;

  /**
   * The URL to the main image for this beer
   */
  public labelImageUrl?: string = null;

  /**
   * Metadata properties for this beer
   */
  public metadata?: AlgoliaBeer = null;
}
