import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useState } from "react";
import { Container, Content, Table, SelectPicker } from "rsuite";
import { GET_BEERS } from "../util/queries/getBeers";

const { Column, HeaderCell, Cell, Pagination } = Table;

const sort = (state, data) => {
	const { sortColumn, sortType } = state;
	if (sortColumn && sortType) {
		return [...data].sort((a, b) => {
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
	return data;
};

export default function Home() {
	const [state, setState] = useState({
		venue: "chucks",
	});

	console.log("state", state.venue);
	const { loading, error, data } = useQuery(GET_BEERS, {
		variables: {
			venue: state.venue,
		},
	});

	const handleSort = (sortColumn, sortType) => {
		setState({
			sortColumn,
			sortType,
		});
	};

	return (
		<Container>
			<Head>
				<title>On Tap Seattle</title>
			</Head>

			<Content style={{ padding: "1em" }}>
				<h1 className="title">On Tap Seattle</h1>
				<SelectPicker
					onChange={(e) => setState({ venue: e })}
					value={state.venue}
					searchable={false}
					cleanable={false}
					data={[
						{ label: "Flatstick", value: "flatstick" },
						{ label: "Chuck's Greenwood", value: "chucks" },
					]}
				/>
				{error ? (
					<div>Error: {error.message}</div>
				) : (
					<Table
						height={500}
						loading={loading}
						data={sort(state, data?.beers)}
						sortColumn={state.sortColumn}
						sortType={state.sortType}
						onSortColumn={handleSort}
						affixHeader
						affixHorizontalScrollbar>
						<Column flexGrow={1} fixed sortable>
							<HeaderCell>Rating</HeaderCell>
							<Cell dataKey="rating" />
						</Column>
						<Column flexGrow={2} fixed sortable>
							<HeaderCell>Beer</HeaderCell>
							<Cell dataKey="beer">
								{(rowData) => (
									<a
										href={rowData.details}
										target="_blank"
										rel="nofollow noreferrer">
										{rowData.beer}
									</a>
								)}
							</Cell>
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>Brewery</HeaderCell>
							<Cell dataKey="brewery" />
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>Location</HeaderCell>
							<Cell dataKey="location" />
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>Style</HeaderCell>
							<Cell dataKey="style" />
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>ABV</HeaderCell>
							<Cell dataKey="abv" />
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>IBU</HeaderCell>
							<Cell dataKey="ibu" />
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>Amount</HeaderCell>
							<Cell dataKey="amount" />
						</Column>
					</Table>
				)}
			</Content>
		</Container>
	);
}
