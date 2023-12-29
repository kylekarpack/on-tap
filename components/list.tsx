import { useQuery } from "@apollo/client";
import { Card, CardBody, CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { FunctionComponent } from "react";
import { GET_BEERS } from "lib/queries";
import { Beer, Sort, Venue } from "lib/types";
import { sortTable } from "lib/utils";
import BeerLink from "./beerLink";
import styles from "./list.module.css";
import { CompactNumber, Percentage } from "./number";

/**
 * Render a list of beers
 */
const BeerList: FunctionComponent<{ venue: Venue; sort: Sort }> = ({ venue, sort }) => {
  const { loading, error, data } = useQuery<{ beers: Beer[] }>(GET_BEERS, {
    variables: {
      venue: venue.value,
      params: {
        venueId: venue.params?.venueId
      }
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

  const listData: Beer[] = sortTable(sort, data?.beers) ?? [];
  return (
    <div data-testid="list">
      {listData.map((beer) => (
        <Card isBlurred shadow="sm" className="m-2" key={beer.guid}>
          <CardBody className="p-4">
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-12 items-center justify-center">
              <div className="grid grid-cols-5 col-span-7 gap-4 md:gap-12 items-center md:items-start">
                <div className="relative col-span-1">
                  <Image
                    width={100}
                    height={100}
                    alt="Beer Label"
                    className="object-cover rounded-lg shadow-md"
                    src={beer.labelImageUrl ?? "/badge-beer-default.png"}
                  />
                </div>
                <div className="col-span-4">
                  <div className="text-3xl">
                    <BeerLink beer={beer} />
                  </div>
                  <div className="text-gray-100 text-sm">
                    {beer.brewery} {beer.style ? "-" : ""} {beer.style}
                  </div>
                </div>
              </div>

              <div className="col-span-5">
                <div className="grid grid-cols-3 gap-4 md:gap-12">
                  {beer.rating ? (
                    <div className="col-span-1">
                      <div className="font-light text-sm text-gray-300">Rating</div>
                      <div className={styles.data}>
                        {beer.rating?.toFixed(2)}
                        {beer.ratings && (
                          <small className="text-gray-400 text-xs">
                            &nbsp; (<CompactNumber value={beer.ratings} />)
                          </small>
                        )}
                      </div>
                    </div>
                  ) : null}
                  {beer.abv && beer.abv !== 0 ? (
                    <div className="col-span-1">
                      <div className="font-light text-sm text-gray-300">ABV</div>
                      <div className={styles.data}>
                        <Percentage value={beer.abv} />
                      </div>
                    </div>
                  ) : null}
                  {beer.ibu && beer.ibu !== 0 ? (
                    <div className="col-span-1">
                      <div className="font-light text-sm text-gray-300">IBU</div>
                      <div className={styles.data}>{beer.ibu}</div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default BeerList;
