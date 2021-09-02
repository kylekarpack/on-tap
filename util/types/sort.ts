import { Beer } from "./beer";

export type Sort = {
  field: keyof Beer;
  dir: "asc" | "desc";
};
