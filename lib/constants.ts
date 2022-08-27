/* istanbul ignore file */
import { Sort, Venue } from "./types";

export const venues: Venue[] = [
  {
    label: "Flatstick Pioneer Square",
    value: "flatstick",
    params: {
      venueId: "pioneer-square"
    }
  },
  {
    label: "Flatstick Kirkland",
    value: "flatstick",
    params: {
      venueId: "kirkland"
    }
  },
  {
    label: "Chuck's Greenwood",
    value: "chucks",
    params: {
      venueId: "GW"
    }
  },
  {
    label: "Chuck's Seward",
    value: "chucks",
    params: {
      venueId: "SP"
    }
  },
  {
    label: "The Pinebox",
    value: "pinebox"
  }
];

export const sorts: Sort[] = [
  {
    label: "Rating (High to Low)",
    field: "rating",
    dir: "desc"
  },
  {
    label: "Rating (Low to High)",
    field: "rating",
    dir: "asc"
  },
  {
    label: "Name (A to Z)",
    field: "beer",
    dir: "asc"
  },
  {
    label: "Name (Z to A)",
    field: "beer",
    dir: "desc"
  },
  {
    label: "Style (A to Z)",
    field: "style",
    dir: "asc"
  },
  {
    label: "Style (Z to A)",
    field: "style",
    dir: "desc"
  },
  {
    label: "ABV (High to Low)",
    field: "abv",
    dir: "desc"
  },
  {
    label: "ABV (Low to High)",
    field: "abv",
    dir: "asc"
  },
  {
    label: "IBU (High to Low)",
    field: "ibu",
    dir: "desc"
  },
  {
    label: "IBU (Low to High)",
    field: "ibu",
    dir: "asc"
  }
];
