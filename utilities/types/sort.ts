import { Beer } from "./beer";

export type Sort = {
	label?: string;
  field: keyof Beer;
  dir: "asc" | "desc";
};
