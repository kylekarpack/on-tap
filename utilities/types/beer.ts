export class Beer {
  constructor(source: Partial<Beer>) {
    Object.assign(this, source);
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

export interface AlgoliaBeer {
  bid: number;
  beer_abv: number;
  beer_name: string;
  beer_index: string;
  brewery_label: string;
  brewery_name: string;
  brewery_id: number;
  type_name: string;
  type_id: number;
  homebrew: number;
  in_production: number;
  popularity: number;
  alias_alt: string[];
  spelling_alt: any[];
  brewery_alias: string[];
  beer_label: string;
  beer_index_short: string;
  beer_name_sort: string;
  brewery_name_sort: string;
  rating_score: number;
  rating_count: number;
  brewery_beer_name: string;
  index_date: string;
  objectID: string;
}