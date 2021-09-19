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

  public beer: string = null;
  public id: number = null;
  public brewery: string = null;
  public style: string = null;
  public amount: number = null;
  public location: string = null;
  public abv: number = null;
  public ibu: number = null;
  public rating: number = null;
  public ratings: number = null;
  public details: string = null;
  public labelImageUrl: string = null;
}
