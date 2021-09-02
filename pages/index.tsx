import Table from "components/table";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Content, SelectPicker } from "rsuite";
import { Sort } from "util/types/sort";

const venues = [
	{ label: "Flatstick Pioneer Square", value: "flatstick" },
	{ label: "Flatstick Kirkland", value: "flatstickKirkland" },
	{ label: "Chuck's Greenwood", value: "chucks" },
];

const sorts: Sort[] = [
	{
		label: "Rating (High to Low)",
		field: "rating",
		dir: "desc"
	},
	{
		label: "Rating (Low to High)",
		field: "rating",
		dir: "asc"
	},
	{
		label: "Name (A to Z)",
		field: "beer",
		dir: "asc"
	},
	{
		label: "Name (Z to A)",
		field: "beer",
		dir: "desc"
	}
]

export default function Home({ initialVenue }: { initialVenue: string }) {
	const router = useRouter();
	const [venue, setVenue] = useState<string>(initialVenue || "flatstick");
	const [sort, setSort] = useState<Sort>(sorts[0]);

	const changeVenue = (venue: string): void => {
		router.push({
			query: { venue },
		});
		setVenue(venue);
	};

	const changeSort = (_: never, sort: Sort): void =>{
		setSort(sort);
	};

	return (
		<Container>
			<Head>
				<title>On Tap Seattle</title>
			</Head>

			<Content style={{ padding: "1em" }}>
				<h1 className="title">On Tap Seattle</h1>
				<SelectPicker
					onChange={changeVenue}
					value={venue}
					searchable={false}
					cleanable={false}
					data={venues}
				/>
				&nbsp;
				<SelectPicker
					onSelect={changeSort}
					value={sort.label}
					valueKey="label"
					searchable={false}
					cleanable={false}
					data={sorts}
				/>
				<Table venue={venue} sort={sort} />
			</Content>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			initialVenue: context.query.venue ?? null,
		},
	};
};
