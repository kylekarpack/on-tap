import { venues, sorts } from "./constants";

describe("constants", () => {
  it("venues exists", () => {
    expect(Array.isArray(venues)).toBe(true);
  });

  it("sorts exists", () => {
    expect(Array.isArray(sorts)).toBe(true);
  });
});
