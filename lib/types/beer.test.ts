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
    const augmented = Beer.fromAlgoliaBeer({
      rating_score: 4.222,
      rating_count: 10
    });
    expect(augmented).toBeDefined();
    expect(augmented.rating).toEqual(4.22);
    expect(augmented.ratings).toEqual(10);
  });

  it("merges with algolia with only some properties", () => {
    const augmented = Beer.fromAlgoliaBeer({
      beer_name: "Test",
      brewery_name: "Test Brewery"
    });
    expect(augmented.rating).toBe(null);
    expect(augmented.ratings).toBe(null);
    expect(augmented.beer).toBe("Test");
    expect(augmented.brewery).toBe("Test Brewery");
  });

  it("merges with algoila if source is null", () => {
    const augmented = Beer.fromAlgoliaBeer(null);
    augmented.guid = expect.any(String);

    const beer = new Beer();
    beer.guid = expect.any(String);

    expect(augmented).toEqual(beer);
  });
});
