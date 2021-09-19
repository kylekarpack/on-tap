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
});
