import { Beer, Sort } from "./types";

/**
 * Sort a list of data by a given predicate
 */
export const sortTable = (sort: Sort, data: Beer[]) => {
  if (!Array.isArray(data)) {
    throw new Error("List to sort must be an array");
  }

  const { field, dir } = sort;
  if (field && dir && Array.isArray(data)) {
    const copy = JSON.parse(JSON.stringify(data));
    return copy.sort((a: Beer, b: Beer) => {
      const x = a[field];
      const y = b[field];

      // Put empty values at end
      if (x == null || x === "") {
        return 1;
      }
      if (y == null || y === "") {
        return -1;
      }
      if (typeof x === "string" && typeof y === "string") {
        if (dir === "asc") {
          return x.localeCompare(y);
        }
        return y.localeCompare(x);
      }
      if (dir === "asc") {
        return Number(x) - Number(y);
      }
      return Number(y) - Number(x);
    });
  }
  return data;
};
