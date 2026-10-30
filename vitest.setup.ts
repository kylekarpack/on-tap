import "@testing-library/jest-dom/vitest";
import axios from "axios";
import { vi, type Mock } from "vite-plus/test";

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

// Keep React's error-boundary stack traces out of the test output
const originalConsoleError = console.error;
vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
  const message = args.map((arg) => String(arg)).join(" ");
  if (message.includes("The above error occurred in the") || message.includes("React will try to recreate")) {
    return;
  }
  originalConsoleError(...args);
});
