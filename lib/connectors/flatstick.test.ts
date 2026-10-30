import axios from "axios";
import { describe, expect, it, type Mocked } from "vite-plus/test";
import Flatstick from "./flatstick";

// axios is auto-mocked globally in vitest.setup.ts
const mockedAxios = axios as Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
  data: [
    {
      PercentFull: 0.85,
      BeverageName: "Test",
      ProducerList: "Test Brewery",
      BeverageStyle: "IPA",
      FullBeverageStyle: "West Coast IPA ",
      Location: "Seattle, WA",
      Abv: 7.0,
      Ibu: null
    }
  ]
});

describe("flatstick connector", () => {
  it("loads data", async () => {
    const flatstick = new Flatstick({ venueId: "2" });
    const data = await flatstick.execute();
    expect(data).toHaveLength(1);
    expect(data[0].beer).toBe("Test");
    expect(data[0].amount).toBe(85);
    expect(data[0].abv).toBe(7.0);
  });

  it("requests the correct venue", async () => {
    const flatstick = new Flatstick({ venueId: "1" });
    await flatstick.execute();
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});
