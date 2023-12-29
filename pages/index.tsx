import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import List from "components/list";
import { sorts, venues } from "lib/constants";
import { Sort, Venue } from "lib/types";

/**
 * The home page for the application
 */
export default function Home({ initialVenue }: { initialVenue: Venue }) {
  const router = useRouter();
  const [venue, setVenue] = useState<Venue>(initialVenue || venues[0]);
  const [sort, setSort] = useState<Sort>(sorts[0]);

  const changeVenue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newVenue: Venue = JSON.parse(e.target.value);
    router.push({
      query: { venue: newVenue.value, venueId: newVenue.params?.venueId }
    });
    setVenue(newVenue);
  };

  const changeSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newSort: Sort = JSON.parse(e.target.value);
    setSort(newSort);
  };

  return (
    <>
      <Head>
        <title>On Tap Seattle</title>
      </Head>

      <NavBar venue={venue} changeVenue={changeVenue} sort={sort} changeSort={changeSort} />

      <List venue={venue} sort={sort} />
    </>
  );
}

/**
 * Get the initial venue from the query, if applicable
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  let initialVenue: Venue = null;
  if (context.query.venue) {
    const { venueId } = context.query;
    initialVenue = venues.find(
      (el) => el.value === context.query.venue && (!venueId || el.params?.venueId === venueId)
    );
  }
  return {
    props: {
      initialVenue
    }
  };
};
