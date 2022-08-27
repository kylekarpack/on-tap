import axios from "axios";
import Chucks from "./chucks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
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
