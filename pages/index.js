import Head from "next/head";
import { useEffect, useState } from "react";
import { Table } from "rsuite";

const { Column, HeaderCell, Cell, Pagination } = Table;

export default function Home() {
	const [venue, setVenue] = useState("flatstick");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (venue) {
			setLoading(true);
			fetch("/api/flatstick")
				.then((d) => {
					d.json().then((beers) => setData(beers));
				})
				.finally(setLoading(false));
		}
	}, [venue]);

	return (
		<div>
			<Head>
				<title>On Tap Seattle</title>
			</Head>

			<h1 className="title">On Tap Seattle</h1>
			<br />
			<br />
			<h2 className="subtitle">Flatstick</h2>
			<Table
				height={400}
				sortColumn="rating"
				sortType="desc"
				loading={loading}
				data={data}
				onRowClick={(data) => {
					console.log(data);
				}}>
				<Column fixed>
					<HeaderCell>Rating</HeaderCell>
					<Cell dataKey="rating" />
				</Column>
				<Column fixed>
					<HeaderCell>Beer</HeaderCell>
					<Cell dataKey="beer" />
				</Column>

				<Column fixed>
					<HeaderCell>Brewery</HeaderCell>
					<Cell dataKey="brewery" />
				</Column>

				<Column fixed>
					<HeaderCell>Location</HeaderCell>
					<Cell dataKey="location" />
				</Column>

				<Column fixed>
					<HeaderCell>Style</HeaderCell>
					<Cell dataKey="style" />
				</Column>

				<Column fixed>
					<HeaderCell>ABV</HeaderCell>
					<Cell dataKey="abv" />
				</Column>

				<Column fixed>
					<HeaderCell>IBU</HeaderCell>
					<Cell dataKey="ibu" />
				</Column>

				<Column fixed>
					<HeaderCell>Amount</HeaderCell>
					<Cell dataKey="amount" />
				</Column>
			</Table>
		</div>
	);
}
