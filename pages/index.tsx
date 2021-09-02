import Table from "components/table";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Content, SelectPicker } from "rsuite";
import { Sort } from "util/types/sort";

export default function Home({ initialVenue }: { initialVenue: string }) {
	const router = useRouter();
	const [venue, setVenue] = useState<string>(initialVenue || "flatstick");
	const [sort, setSort] = useState<Sort>({ field: "rating", dir: "desc" });

	const changeVenue = (venue: string): void => {
		router.push({
			query: { venue },
		});
		setVenue(venue);
	};

	const changeSort = (sort: Sort): void =>{

	}

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
					data={[
						{ label: "Flatstick Pioneer Square", value: "flatstick" },
						{ label: "Flatstick Kirkland", value: "flatstickKirkland" },
						{ label: "Chuck's Greenwood", value: "chucks" },
					]}
				/>
				{/* <SelectPicker
					onChange={changeVenue}
					value={venue}
					searchable={false}
					cleanable={false}
					data={[
						{ label: "Flatstick Pioneer Square", value: "flatstick" },
						{ label: "Flatstick Kirkland", value: "flatstickKirkland" },
						{ label: "Chuck's Greenwood", value: "chucks" },
					]}
				/> */}
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
