import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

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
			<table className="table is-bordered is-striped is-fullwidth flatstick">
				<thead>
					<tr title="Click to sort!">
						<th>Rating</th>
						<th>Beer</th>
						<th>Brewery</th>
						<th>Location</th>
						<th>Style</th>
						<th>ABV</th>
						<th>IBU</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<th className="has-text-centered loading" colSpan={8}>
								Loading Flatstick ratings...
								<progress className="progress is-small is-primary" max={100}>
									15%
								</progress>
							</th>
						</tr>
					) : null}
					{data.map((el) => (
						<tr>
							<td>{el.rating}</td>

							<td>{el.beer}</td>
							<td>{el.brewery}</td>
							<td>{el.location}</td>
							<td>{el.style}</td>
							<td>{el.abv}</td>
							<td>{el.ibu}</td>
							<td>{el.ibu}</td>
							<td>{el.amount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
