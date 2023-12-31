import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import List from "@/components/List";
import NavBar from "components/NavBar";
import { venues } from "lib/constants";
import { Beer, Venue } from "lib/types";
import { SearchState } from "lib/types/searchState";

/**
 * The home page for the application
 */
export default function Home(initialState: SearchState) {
  const [searchState, setSearchState] = useState<SearchState>(initialState);

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

  const props: SearchState = {
    venue: initialVenue ?? venues[0],
    sort: {
      field: (context.query.sortField as keyof Beer) ?? "rating",
      dir: (context.query.sortDir as "asc" | "desc") ?? "desc"
    }
  };

  return {
    props
  };
};
