import Head from "next/head";
import { useState } from "react";
import { Table } from "rsuite";
import useApi from "../util/hooks/useApi";

const { Column, HeaderCell, Cell, Pagination } = Table;

export default function Home() {
	let { data, loading, error } = useApi("/api/flatstick");
	const [state, setState] = useState({});

	const sort = () => {
		const { sortColumn, sortType } = state;
		if (sortColumn && sortType) {
			data = data.sort((a, b) => {
				let x = a[sortColumn];
				let y = b[sortColumn];
				if (typeof x === "string") {
					x = x.charCodeAt();
				}
				if (typeof y === "string") {
					y = y.charCodeAt();
				}
				if (sortType === "asc") {
					return x - y;
				} else {
					return y - x;
				}
			});
		}
	};

	const handleSort = (sortColumn, sortType) => {
		setState({
			sortColumn,
			sortType,
		});
		sort();
	};

	return (
		<div>
			<Head>
				<title>On Tap Seattle</title>
			</Head>

			<h1 className="title">On Tap Seattle</h1>
			<h2 className="subtitle">Flatstick</h2>
			{error ? (
				<div>Error: {error.message}</div>
			) : (
				<Table
					height={500}
					loading={loading}
					data={data}
					sortColumn={state.sortColumn}
					sortType={state.sortType}
					onSortColumn={handleSort}>
					<Column flexGrow={1} fixed sortable>
						<HeaderCell>Rating</HeaderCell>
						<Cell dataKey="rating" />
					</Column>
					<Column flexGrow={2} fixed sortable>
						<HeaderCell>Beer</HeaderCell>
						<Cell dataKey="beer" />
					</Column>

					<Column flexGrow={1} fixed sortable>
						<HeaderCell>Brewery</HeaderCell>
						<Cell dataKey="brewery" />
					</Column>

					<Column flexGrow={1} fixed sortable>
						<HeaderCell>Location</HeaderCell>
						<Cell dataKey="location" />
					</Column>

					<Column flexGrow={1} fixed sortable>
						<HeaderCell>Style</HeaderCell>
						<Cell dataKey="style" />
					</Column>

					<Column flexGrow={1} fixed sortable>
						<HeaderCell>ABV</HeaderCell>
						<Cell dataKey="abv" />
					</Column>

					<Column flexGrow={1} fixed sortable>
						<HeaderCell>IBU</HeaderCell>
						<Cell dataKey="ibu" />
					</Column>

					<Column flexGrow={1} fixed sortable>
						<HeaderCell>Amount</HeaderCell>
						<Cell dataKey="amount" />
					</Column>
				</Table>
			)}
		</div>
	);
}
