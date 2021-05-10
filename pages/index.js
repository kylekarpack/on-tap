import Head from "next/head";
import { Table } from "rsuite";
import useApi from "../util/hooks/useApi";

const { Column, HeaderCell, Cell, Pagination } = Table;

export default function Home() {
	const { data, loading, error } = useApi("/api/flatstick");

	return (
		<div>
			<Head>
				<title>On Tap Seattle</title>
			</Head>

			<h1 className="title">On Tap Seattle</h1>
			<br />
			<br />
			<h2 className="subtitle">Flatstick</h2>
			{error ? (
				<div>Error: {error.message}</div>
			) : (
				<Table
					height={500}
					loading={loading}
					data={data}
					onRowClick={(data) => {
						console.log(data);
					}}>
					<Column flexGrow={1} fixed>
						<HeaderCell>Rating</HeaderCell>
						<Cell dataKey="rating" />
					</Column>
					<Column flexGrow={2} fixed>
						<HeaderCell>Beer</HeaderCell>
						<Cell dataKey="beer" />
					</Column>

					<Column flexGrow={1} fixed>
						<HeaderCell>Brewery</HeaderCell>
						<Cell dataKey="brewery" />
					</Column>

					<Column flexGrow={1} fixed>
						<HeaderCell>Location</HeaderCell>
						<Cell dataKey="location" />
					</Column>

					<Column flexGrow={1} fixed>
						<HeaderCell>Style</HeaderCell>
						<Cell dataKey="style" />
					</Column>

					<Column flexGrow={1} fixed>
						<HeaderCell>ABV</HeaderCell>
						<Cell dataKey="abv" />
					</Column>

					<Column flexGrow={1} fixed>
						<HeaderCell>IBU</HeaderCell>
						<Cell dataKey="ibu" />
					</Column>

					<Column flexGrow={1} fixed>
						<HeaderCell>Amount</HeaderCell>
						<Cell dataKey="amount" />
					</Column>
				</Table>
			)}
		</div>
	);
}
