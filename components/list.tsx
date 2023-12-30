import { useQuery } from "@apollo/client";
import { CircularProgress } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { GET_BEERS } from "lib/queries";
import { Beer as BeerType, Sort, Venue } from "lib/types";
import { sortTable } from "lib/utils";
import Beer from "./Beer";

/**
 * Render a list of beers
 */
const BeerList: FunctionComponent<{ venue: Venue; sort: Sort }> = ({ venue, sort }) => {
  const { loading, error, data } = useQuery<{ beers: BeerType[] }>(GET_BEERS, {
    variables: {
      venue: venue.value
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error" className="m-2 p-4 bg-red-400 text-red-50">
        <div className="font-bold">Error</div>
        {error.message}
      </div>
    );
  }

  const listData: BeerType[] = sortTable(sort, data?.beers) ?? [];
  return (
    <div data-testid="list">
      {listData.map((beer) => (
        <Beer beer={beer} key={beer.guid} />
      ))}
    </div>
  );
};

export default BeerList;
