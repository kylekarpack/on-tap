import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import List from "components/list";
import { sorts, venues } from "lib/constants";
import { Sort } from "lib/types";

/**
 * The home page for the application
 */
export default function Home({ initialVenue }: { initialVenue: string }) {
  const router = useRouter();
  const [venue, setVenue] = useState<string>(initialVenue || venues[0].value);
  const [sort, setSort] = useState<Sort>(sorts[0]);

  const changeVenue = (e: SelectChangeEvent): void => {
    const newVenue = e.target.value;
    router.push({
      query: { venue: newVenue }
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

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Image width={24} height={24} src="/icons/favicon-196.png" alt="Main logo" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              On Tap Sea
            </Typography>
            <FormControl>
              <InputLabel id="venueLabel">Venue</InputLabel>
              <Select size="small" labelId="venueLabel" label="Venue" value={venue} onChange={changeVenue}>
                {venues.map((el) => (
                  <MenuItem key={el.value} value={el.value}>
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
                  <MenuItem key={el.field} value={JSON.stringify(el)}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Box>

      <List venue={venue} sort={sort} />
    </>
  );
}

/**
 * Get the initial venue from the query, if applicable
 */
export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    initialVenue: context.query.venue ?? null
  }
});
