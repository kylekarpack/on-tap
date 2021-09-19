import Flatstick from "./flatstick";
import xray from "x-ray";

describe("flatstick connector", () => {
  it("loads data", async () => {
    const flatstick = new Flatstick();
    const data = await flatstick.execute();
    expect(data).toHaveLength(1);
    expect(data[0].rating).toBe(4.75);
  });

  it("loads partial data", async () => {
    (xray as jest.Mock<any>).mockImplementation(() => () => [
      {
        beer: "Test Partial"
      }
    ]);
    const flatstick = new Flatstick();
    const data = await flatstick.execute();
    expect(data).toHaveLength(1);
    expect(data[0].beer).toBe("Test Partial");
  });
});
