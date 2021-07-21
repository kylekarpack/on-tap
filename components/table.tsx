import { useQuery } from "@apollo/client";
import { useState } from "react";
import Ratings from "react-ratings-declarative";
import { Table } from "rsuite";
import { GET_BEERS } from "util/queries/getBeers";
import { Beer } from "util/types/beer";
import { sortTable } from "util/utils";

const { Column, HeaderCell, Cell } = Table;

export default function BeerTable({ venue }) {
	const [state, setState] = useState<any>({});

	const { loading, error, data } = useQuery(GET_BEERS, {
		variables: {
			venue,
		},
	}) as { data: { beers: Beer[] }; loading: boolean; error: Error };

	const handleSort = (sortColumn: string, sortType: string): void => {
		setState({
			...state,
			sortColumn,
			sortType,
		});
	};

	return error ? (
		<div>Error: {error.message}</div>
	) : (
		<Table
			height={550}
			loading={loading}
			data={sortTable(state, data?.beers)}
			sortColumn={state.sortColumn}
			sortType={state.sortType}
			onSortColumn={handleSort}
			affixHeader
			affixHorizontalScrollbar>
			<Column flexGrow={1} minWidth={75} fixed sortable>
				<HeaderCell>Rating</HeaderCell>
				<Cell dataKey="rating" f>
					{(rowData: Beer) => (
						<>
							{rowData.rating ? (
								<div style={{ textAlign: "center" }}>
									<small style={{ display: "block" }}>{rowData.rating}</small>
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
			<Column flexGrow={2} minWidth={100} fixed sortable>
				<HeaderCell>Beer</HeaderCell>
				<Cell dataKey="beer">
					{(rowData: Beer) =>
						rowData.id ? (
							<a
								href={`https://untappd.com/beer/${rowData.id}`}
								target="_blank"
								rel="nofollow noreferrer">
								{rowData.beer}
							</a>
						) : (
							rowData.beer
						)
					}
				</Cell>
			</Column>

			<Column flexGrow={2} minWidth={200} sortable>
				<HeaderCell>Brewery</HeaderCell>
				<Cell dataKey="brewery" />
			</Column>

			<Column flexGrow={1} minWidth={100} sortable>
				<HeaderCell>Location</HeaderCell>
				<Cell dataKey="location" />
			</Column>

			<Column flexGrow={1} minWidth={100} sortable>
				<HeaderCell>Style</HeaderCell>
				<Cell dataKey="style" />
			</Column>

			<Column flexGrow={1} minWidth={75} sortable>
				<HeaderCell>ABV</HeaderCell>
				<Cell dataKey="abv">
					{(rowData: Beer) => rowData.abv && `${rowData.abv}%`}
				</Cell>
			</Column>

			<Column flexGrow={1} minWidth={75} sortable>
				<HeaderCell>IBU</HeaderCell>
				<Cell dataKey="ibu" />
			</Column>

			<Column flexGrow={1} minWidth={75} sortable>
				<HeaderCell>Remaining</HeaderCell>
				<Cell dataKey="amount">
					{(rowData: Beer) => rowData.amount && `${rowData.amount}%`}
				</Cell>
			</Column>
		</Table>
	);
}
