import "@testing-library/jest-dom/vitest";
import axios from "axios";
import fetch from "node-fetch";
import { vi } from "vitest";
import xray from "x-ray";

global.fetch = fetch;

vi.mock("x-ray");
xray.mockImplementation(() => () => [
  {
    beer: "Test",
    amount: "12%",
    ibu: 10,
    abv: 5.5,
    style: "IPA"
  }
]);

vi.mock("axios");
axios.post.mockResolvedValue({
  data: {
    hits: [
      {
        beer_name: "Test from Algolia",
        rating_score: 4.75,
        rating_count: 1
      }
    ]
  }
});
