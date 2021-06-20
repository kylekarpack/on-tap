import Head from "next/head";
import { useState } from "react";
import { Table, Container, Content } from "rsuite";
import { gql, useQuery } from "@apollo/client";

const { Column, HeaderCell, Cell, Pagination } = Table;

export default function Home() {

	const [state, setState] = useState({});

	const { loading, error, data } = useQuery(
		gql`query {
			beers {
				beer
				brewery
				style
				amount
				location
				abv
				ibu
				rating
				ratings
				details
			}
		}`
	);

	const sort = () => {
		const { sortColumn, sortType } = state;
		if (sortColumn && sortType) {
			data.beers.sort((a, b) => {
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
		<Container>
			<Head>
				<title>On Tap Seattle</title>
			</Head>

			<Content>
				<h1 className="title">On Tap Seattle</h1>
				<h2 className="subtitle">Flatstick</h2>
				{error ? (
					<div>Error: {error.message}</div>
				) : (
					<Table
						height={500}
						loading={loading}
						data={data.beers}
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
