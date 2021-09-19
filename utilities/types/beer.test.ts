import { Beer } from "./beer";

describe("beer object", () => {
  it("can instantiate", () => {
    const beer = new Beer();
    expect(beer).toBeDefined();
  });

  it("augments", () => {
    const beer = new Beer({ id: 1, abv: 5, brewery: "Old Brewery" });
    beer.augment({
      beer: "Beer Name",
      brewery: "New Brewery"
    });
    expect(beer.beer).toBe("Beer Name");
    expect(beer.abv).toBe(5);
    expect(beer.brewery).toBe("Old Brewery");
  });

  it("merges with algoila", () => {
    const beer = new Beer();
    const augmented = beer.fromAlgoliaBeer({
      rating_score: 4.222,
      rating_count: 10
    });
    expect(augmented).toBeDefined();
    expect(augmented.rating).toEqual(4.22);
    expect(augmented.ratings).toEqual(10);
  });

  it("merges with algolia with only some properties", () => {
    const beer = new Beer();
    const augmented = beer.fromAlgoliaBeer({
      beer_name: "Test",
      brewery_name: "Test Brewery"
    });
    expect(augmented.rating).toBe(null);
    expect(augmented.ratings).toBe(null);
    expect(augmented.beer).toBe("Test");
    expect(augmented.brewery).toBe("Test Brewery");
  });

  it("merges with algoila if source is null", () => {
    const beer = new Beer();
    const augmented = beer.fromAlgoliaBeer(null);
    expect(augmented).toEqual(new Beer());
  });
});
