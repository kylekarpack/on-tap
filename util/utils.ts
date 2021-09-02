import { Beer } from "./types/beer";

export const sortTable = (
	state: { sortColumn: string; sortType: string },
	data: Beer[]
) => {
	const { sortColumn, sortType } = state;
	if (sortColumn && sortType && data) {
		let copy = JSON.parse(JSON.stringify(data));
		return copy.sort((a: Beer, b: Beer) => {
			let x = (a as any)[sortColumn];
			let y = (b as any)[sortColumn];
			if (typeof x === "string") {
				x = x.charCodeAt(0);
			}
			if (typeof y === "string") {
				y = y.charCodeAt(0);
			}
			if (sortType === "asc") {
				return x - y;
			} else {
				return y - x;
			}
		});
	}
	return data;
};
