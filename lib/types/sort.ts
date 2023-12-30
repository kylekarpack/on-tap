import { Beer } from "./beer";

export type Sort = {
  /**
   * The human-readable name of this sort
   */
  label?: string;

  /**
   * The field to sort on
   */
  field: keyof Beer;

  /**
   * The direction to sort
   */
  dir?: "asc" | "desc";
};
