import { Beer } from "./types/beer";
import { Sort } from "./types/sort";

export const sortTable = (sort: Sort, data: Beer[]) => {
  const { field, dir } = sort;
  if (field && dir && data) {
    let copy = JSON.parse(JSON.stringify(data));
    return copy.sort((a: Beer, b: Beer) => {
      let x = (a as any)[field];
      let y = (b as any)[field];

      // Put empty values at end
      if (x == null || x === "") {
        return 1;
      }
      if (y == null || y === "") {
        return -1;
      }
      if (typeof x === "string") {
        x = x.charCodeAt(0);
      }
      if (typeof y === "string") {
        y = y.charCodeAt(0);
      }
      if (dir === "asc") {
        return x - y;
      } else {
        return y - x;
      }
    });
  }
  return data;
};
