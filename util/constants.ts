import { Sort } from "./types/sort";

export const venues = [
  { label: "Flatstick Pioneer Square", value: "flatstick" },
  { label: "Flatstick Kirkland", value: "flatstickKirkland" },
  { label: "Chuck's Greenwood", value: "chucks" }
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
