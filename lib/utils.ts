import { Beer, Sort } from "./types";

/**
 * Build a Vercel Image Optimization URL for a source image.
 *
 * Vercel serves `/_vercel/image?url=...&w=...&q=...` which resizes and
 * re-encodes images on the fly (the equivalent of next/image optimization).
 * In development (or non-Vercel hosts) the endpoint does not exist, so we
 * fall back to the original source and rely on `onError` to recover.
 */
export const vercelImage = (src: string, width: number, quality = 75): string => {
  if (src.startsWith("data:") || src.startsWith("blob:") || src.startsWith("/_vercel/image")) {
    return src;
  }
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

/**
 * Sort a list of data by a given predicate
 */
export const sortTable = (sort: Sort, data: Beer[]) => {
  if (!Array.isArray(data)) {
    throw new Error("List to sort must be an array");
  }

  const { field, dir } = sort;
  if (field && dir && Array.isArray(data)) {
    // Shallow copy is enough: sorting only reorders the array, it never mutates
    // the beer objects themselves, and avoids the cost of a deep clone.
    const copy = [...data];
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
