import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import xray from "x-ray";

jest.mock("x-ray");
xray.mockImplementation(() => () => [
  {
    beer: "Test",
    amount: "12%",
    ibu: 10,
    abv: 5.5,
    style: "IPA"
  }
]);

jest.mock("axios");
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
