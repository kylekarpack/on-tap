import "@testing-library/jest-dom/vitest";
import axios from "axios";
import { vi, type Mock } from "vitest";

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
