import { useQuery } from "@apollo/client";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import Image from "next/image";
import { FunctionComponent } from "react";
import { GET_BEERS } from "lib/queries";
import { Beer, Sort } from "lib/types";
import { sortTable } from "lib/utils";
import BeerLink from "./beerLink";
import styles from "./list.module.css";
import { CompactNumber, Percentage } from "./number";

/**
 * Render a list of beers
 */
const BeerList: FunctionComponent<{ venue: string; sort: Sort }> = ({ venue, sort }) => {
  const { loading, error, data } = useQuery<{ beers: Beer[] }>(GET_BEERS, {
    variables: {
      venue
    }
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 32 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert data-testid="error" sx={{ marginTop: "1em" }} severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }

  const listData: Beer[] = sortTable(sort, data?.beers) ?? [];

  return (
    <List data-testid="list" sx={{ width: "100%", bgcolor: "background.paper" }}>
      {listData.map((beer, i: number) => (
        <div key={beer.beer || i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar sx={{ mr: 2 }}>
              <Image width={50} height={50} src={beer.labelImageUrl || "/badge-beer-default.png"} alt={beer.beer} />
            </ListItemAvatar>
            <ListItemText>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: "1.35em", lineHeight: 1.1 }} variant="subtitle1">
                    <BeerLink beer={beer} />
                  </Typography>
                  <Typography sx={{ my: 1, opacity: 0.75 }} component="div" variant="body2" color="text.primary">
                    {beer.brewery} {beer.style ? "-" : ""} {beer.style}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    {beer.rating ? (
                      <Grid item xs={4}>
                        <div className={styles.slim}>Rating</div>
                        <div className={styles.data}>
                          {beer.rating?.toFixed(2)}
                          {beer.ratings && (
                            <small style={{ opacity: 0.5, fontSize: "0.6em" }}>
                              &nbsp; (<CompactNumber value={beer.ratings} />)
                            </small>
                          )}
                        </div>
                      </Grid>
                    ) : null}
                    {beer.abv && beer.abv !== 0 ? (
                      <Grid item xs={4}>
                        <div className={styles.slim}>ABV</div>
                        <div className={styles.data}>
                          <Percentage value={beer.abv} />
                        </div>
                      </Grid>
                    ) : null}
                    {beer.ibu && beer.ibu !== 0 ? (
                      <Grid item xs={4}>
                        <div className={styles.slim}>IBU</div>
                        <div className={styles.data}>{beer.ibu}</div>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
};

export default BeerList;
