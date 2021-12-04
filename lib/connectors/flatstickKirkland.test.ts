import FlatstickKirkland from "./flatstickKirkland";

describe("flatstick kirkland connector", () => {
  it("loads data", async () => {
    const flatstick = new FlatstickKirkland();
    const data = await flatstick.execute();
    expect(data).toHaveLength(1);
  });
});
