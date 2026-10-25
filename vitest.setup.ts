import "@testing-library/jest-dom/vitest";
import axios from "axios";
import fetch from "node-fetch";
import { vi, type Mock } from "vitest";

global.fetch = fetch as unknown as typeof globalThis.fetch;

vi.mock("axios");
(axios.post as Mock).mockResolvedValue({
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
