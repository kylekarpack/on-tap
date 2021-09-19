import Flatstick from "./flatstick";

describe("flatstick connector", () => {
  it("loads data", async () => {
    const flatstick = new Flatstick();
    const data = await flatstick.execute();
    expect(data).toHaveLength(1);
		expect(data[0].rating).toBe(4.75);
  });
});
