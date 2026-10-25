import axios from "axios";
import { describe, expect, it, type Mocked } from "vitest";
import Chucks from "./chucks";

// axios is auto-mocked globally in vitest.setup.ts
const mockedAxios = axios as Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
  data: [
    {
      beer: "Brewery: Test Beer"
    }
  ]
});

describe("chucks connector", () => {
  it("loads data", async () => {
    const chucks = new Chucks({ venueId: "GW" });
    const data = await chucks.execute();
    expect(data).toHaveLength(1);
  });
});
