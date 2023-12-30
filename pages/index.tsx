import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import List from "components/list";
import NavBar from "components/NavBar";
import { venues } from "lib/constants";
import { Venue } from "lib/types";
import { SearchState } from "lib/types/searchState";

/**
 * The home page for the application
 */
export default function Home({ initialVenue }: { initialVenue: Venue }) {
  const [searchState, setSearchState] = useState<SearchState>({
    sort: {
      field: "rating",
      dir: "desc"
    },
    venue: initialVenue
  });

  return (
    <>
      <Head>
        <title>On Tap Seattle</title>
      </Head>

      <NavBar searchState={searchState} setSearchState={setSearchState} />

      <List venue={searchState.venue} sort={searchState.sort} />
    </>
  );
}

/**
 * Get the initial venue from the query, if applicable
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  let initialVenue: Venue = null;
  if (context.query.venue) {
    initialVenue = venues.find((el) => el.value === context.query.venue);
  }
  return {
    props: {
      initialVenue
    }
  };
};
