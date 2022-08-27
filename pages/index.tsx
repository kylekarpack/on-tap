import {
  AppBar,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography
} from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
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

  const changeVenue = (e: SelectChangeEvent): void => {
    const newVenue: Venue = JSON.parse(e.target.value);
    router.push({
      query: { venue: newVenue.value, venueId: newVenue.params?.venueId }
    });
    setVenue(newVenue);
  };

  const changeSort = (e: SelectChangeEvent): void => {
    const newSort: Sort = JSON.parse(e.target.value);
    setSort(newSort);
  };

  return (
    <>
      <Head>
        <title>On Tap Seattle</title>
      </Head>

      <AppBar position="sticky" sx={{ top: 0, width: "100%" }}>
        <Toolbar>
          <IconButton
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Image width={24} height={24} src="/icons/favicon-196.png" alt="Main logo" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}>
            On Tap Sea
          </Typography>
          <FormControl>
            <InputLabel id="venueLabel">Venue</InputLabel>
            <Select
              size="small"
              labelId="venueLabel"
              label="Venue"
              value={JSON.stringify(venue)}
              onChange={changeVenue}
            >
              {venues.map((el) => (
                <MenuItem key={el.value} value={JSON.stringify(el)}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          &nbsp;
          <FormControl>
            <InputLabel id="sortLabel">Sort</InputLabel>
            <Select size="small" labelId="sortLabel" label="Sort" value={JSON.stringify(sort)} onChange={changeSort}>
              {sorts.map((el) => (
                <MenuItem key={el.field + el.dir} value={JSON.stringify(el)}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

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
