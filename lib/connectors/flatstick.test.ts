import xray from "x-ray";
import Flatstick from "./flatstick";

describe("flatstick connector", () => {
  it("loads data", async () => {
    const flatstick = new Flatstick({ venueId: "pioneer-square" });
    const data = await flatstick.execute();
    expect(data).toHaveLength(1);
    expect(data[0].rating).toBe(4.75);
    expect(data[0].beer).toBe("Test");
  });

  it("loads partial data", async () => {
    (xray as jest.Mock<any>).mockImplementation(() => () => [
      {
        beer: "Test Partial"
      }
    ]);
    const flatstick = new Flatstick({ venueId: "pioneer-square" });
    const data = await flatstick.execute();
    expect(data).toHaveLength(1);
    expect(data[0].beer).toBe("Test Partial");
    expect(data[0].rating).toBe(4.75);
  });
});
