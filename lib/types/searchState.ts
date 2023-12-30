import { Sort } from "./sort";
import { Venue } from "./venue";

export type SearchState = {
  /**
   *
   */
  venue: Venue;
  /**
   *
   */
  sort: Sort;
};
