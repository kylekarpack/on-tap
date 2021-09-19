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
