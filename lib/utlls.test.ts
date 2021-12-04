import { Beer, Sort } from "./types";
import { sortTable } from "./utils";

describe("table sort functions", () => {
  const defaultSort: Sort = { field: "rating", dir: "desc" };
  const defaultData: Beer[] = [
    {
      rating: 4
    },
    {
      rating: null
    },
    {
      rating: 5
    }
  ];

  it("handles error conditions", () => {
    expect(sortTable).toThrow();
    expect(() => sortTable(defaultSort, null)).toThrow();
  });

  it("passes through array with no criteria", () => {
    expect(sortTable({} as any, defaultData)).toEqual(defaultData);
  });

  it("sorts empty array", () => {
    expect(sortTable(defaultSort, [])).toEqual([]);
  });

  it("sorts by number", () => {
    expect(sortTable(defaultSort, defaultData)).toEqual([
      {
        rating: 5
      },
      {
        rating: 4
      },
      {
        rating: null
      }
    ]);

    expect(sortTable({ ...defaultSort, ...{ dir: "asc" } }, defaultData)).toEqual([
      {
        rating: 4
      },
      {
        rating: 5
      },
      {
        rating: null
      }
    ]);
  });

  it("sorts by string", () => {
    const data: Beer[] = [
      {
        beer: "A Beer"
      },
      {
        beer: "C Beer"
      },
      {
        beer: "B Beer"
      }
    ];

    expect(sortTable({ field: "beer", dir: "asc" }, data)).toEqual([
      {
        beer: "A Beer"
      },
      {
        beer: "B Beer"
      },
      {
        beer: "C Beer"
      }
    ]);

    expect(sortTable({ field: "beer", dir: "desc" }, data)).toEqual([
      {
        beer: "C Beer"
      },
      {
        beer: "B Beer"
      },
      {
        beer: "A Beer"
      }
    ]);
  });
});
