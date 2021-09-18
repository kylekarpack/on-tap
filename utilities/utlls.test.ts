import { Beer, Sort } from "./types";
import { sortTable } from "./utils";

describe("table sort functions", () => {

	const sort: Sort = { field: "rating", dir: "desc" };

  it("sorts empty array", () => {
    expect(sortTable(sort, [])).toEqual([]);
  });

	it("sorts array with one element", () => {
		const data: Beer[] = [];
	})

});
