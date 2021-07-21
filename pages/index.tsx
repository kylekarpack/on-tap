import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useState } from "react";
import { Container, Content, SelectPicker, Table } from "rsuite";
import { Beer } from "util/types/beer";
import { GET_BEERS } from "../util/queries/getBeers";
import Ratings from "react-ratings-declarative";

const { Column, HeaderCell, Cell } = Table;

const sort = (state, data: Beer[]) => {
	const { sortColumn, sortType } = state;
	if (sortColumn && sortType && data) {
		let copy = JSON.parse(JSON.stringify(data));
		return copy.sort((a: Beer, b: Beer) => {
			let x = a[sortColumn];
			let y = b[sortColumn];
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

export default function Home() {
	const [state, setState] = useState<any>({
		venue: "flatstick",
	});

	const { loading, error, data } = useQuery(GET_BEERS, {
		variables: {
			venue: state.venue || "flatstick",
		},
	}) as { data: { beers: Beer[] }; loading: boolean; error: Error };

	const handleSort = (sortColumn, sortType) => {
		setState({
			...state,
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
						{ label: "Flatstick Pioneer Square", value: "flatstick" },
						{ label: "Flatstick Kirkland", value: "flatstickKirkland" },
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
							<Cell dataKey="rating">
								{(rowData: Beer) => (
									<>
										{rowData.rating ? (
											<div style={{ textAlign: "center" }}>
												<small style={{ display: "block" }}>
													{rowData.rating}
												</small>
												<div style={{ marginTop: "-8px" }}>
													<Ratings rating={rowData.rating}>
														<Ratings.Widget
															widgetDimension="10px"
															widgetSpacing="0"
														/>
														<Ratings.Widget
															widgetDimension="10px"
															widgetSpacing="0"
														/>
														<Ratings.Widget
															widgetDimension="10px"
															widgetSpacing="0"
														/>
														<Ratings.Widget
															widgetDimension="10px"
															widgetSpacing="0"
														/>
														<Ratings.Widget
															widgetDimension="10px"
															widgetSpacing="0"
														/>
													</Ratings>
												</div>
											</div>
										) : null}
									</>
								)}
							</Cell>
						</Column>
						<Column flexGrow={2} fixed sortable>
							<HeaderCell>Beer</HeaderCell>
							<Cell dataKey="beer">
								{(rowData: Beer) => (
									<a
										href={`https://untappd.com/beer/${rowData.id}`}
										target="_blank"
										rel="nofollow noreferrer">
										{rowData.beer}
									</a>
								)}
							</Cell>
						</Column>

						<Column flexGrow={2} sortable>
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
							<Cell dataKey="abv">
								{(rowData: Beer) => rowData.abv && `${rowData.abv}%`}
							</Cell>
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>IBU</HeaderCell>
							<Cell dataKey="ibu" />
						</Column>

						<Column flexGrow={1} sortable>
							<HeaderCell>Remaining</HeaderCell>
							<Cell dataKey="amount">
								{(rowData: Beer) => rowData.amount && `${rowData.amount}%`}
							</Cell>
						</Column>
					</Table>
				)}
			</Content>
		</Container>
	);
}
