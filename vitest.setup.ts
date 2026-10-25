import "@testing-library/jest-dom/vitest";
import axios from "axios";
import fetch from "node-fetch";
import { vi, type Mock } from "vitest";

global.fetch = fetch as unknown as typeof globalThis.fetch;

// jsdom doesn't implement matchMedia; MantineProvider reads it on mount
window.matchMedia = window.matchMedia || ((query: string): MediaQueryList => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false
}));

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
