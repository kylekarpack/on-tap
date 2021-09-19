import { AlgoliaBeer } from ".";

export class Beer {
  constructor(source?: Partial<Beer>) {
		if (source != null) {
			Object.assign(this, source);
		}
  }

  public fromAlgoliaBeer(source: AlgoliaBeer) {

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

  public augment?(beer: Partial<Beer>) {
    for (let key in beer) {
      if ((beer as any)[key] != null && (this as any)[key] == null) {
        (this as any)[key] = (beer as any)[key];
      }
    }
  }

  public beer?: string;
  public id?: number;
  public brewery?: string;
  public style?: string;
  public amount?: number;
  public location?: string;
  public abv?: number;
  public ibu?: number;
  public rating?: number;
  public ratings?: number;
  public details?: string;
  public labelImageUrl?: string;
}
