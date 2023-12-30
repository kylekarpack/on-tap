/* istanbul ignore file */
import { Sort, Venue } from "./types";

export const venues: Venue[] = [
  {
    label: "Flatstick Pioneer Square",
    value: "flatstick-pioneer-square"
  },
  {
    label: "Flatstick Kirkland",
    value: "flatstick-kirkland"
  },
  {
    label: "Chuck's Greenwood",
    value: "chucks-greenwood"
  },
  {
    label: "Chuck's Seward",
    value: "chucks-seward"
  },
  {
    label: "The Pinebox",
    value: "pinebox"
  }
];

export const sorts: Sort[] = [
  {
    label: "Rating",
    field: "rating"
  },
  {
    label: "Name",
    field: "beer"
  },
  {
    label: "Style",
    field: "style"
  },
  {
    label: "ABV",
    field: "abv"
  },
  {
    label: "IBU",
    field: "ibu"
  }
];
