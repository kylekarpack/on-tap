import axios from "axios";
import { resolvers } from "./resolvers";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
  data: [
    {
      beer: "Brewery: Test Beer"
    }
  ]
});

describe("resolvers", () => {
  it("loads resolvers", async () => {
    const result = resolvers.Query.beers(null as never, { venue: "chucks", params: { venueId: "GW" } });
    await expect(result).resolves.toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("fails when resolver does not exist", async () => {
    const result = resolvers.Query.beers(null as never, { venue: "VenueDoesNotExist" });
    await expect(result).rejects.toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
