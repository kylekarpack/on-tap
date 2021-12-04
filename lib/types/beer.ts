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

  public beer?: string = null;

  public id?: number = null;

  public brewery?: string = null;

  public style?: string = null;

  public amount?: number = null;

  public location?: string = null;

  public abv?: number = null;

  public ibu?: number = null;

  public rating?: number = null;

  public ratings?: number = null;

  public details?: string = null;

  public labelImageUrl?: string = null;

  public metadata?: AlgoliaBeer = null;
}
