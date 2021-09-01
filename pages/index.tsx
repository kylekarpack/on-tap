import Table from "components/table";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Content, SelectPicker } from "rsuite";

export default function Home({ initialVenue }: { initialVenue: string }) {
	const router = useRouter();
	const [venue, setVenue] = useState<string>(initialVenue || "flatstick");

	const changeVenue = (venue: string): void => {
		router.push({
			query: { venue },
		});
		setVenue(venue);
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
					data={[
						{ label: "Flatstick Pioneer Square", value: "flatstick" },
						{ label: "Flatstick Kirkland", value: "flatstickKirkland" },
						{ label: "Chuck's Greenwood", value: "chucks" },
					]}
				/>
				<Table venue={venue} />
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
