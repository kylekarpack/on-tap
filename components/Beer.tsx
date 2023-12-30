import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import useBeerLink from "lib/hooks/useBeerLink";
import { CompactNumber, Percentage } from "./number";
import type { Beer as BeerType } from "lib/types";

/**
 * Beer card component
 */
const Beer: FunctionComponent<{ beer: BeerType }> = ({ beer }) => {
  const { onClick, beerLink } = useBeerLink(beer);

  return (
    <Card isBlurred isPressable shadow="none" radius="none" className="border-b-1 border-gray-700" key={beer.guid}>
      <CardBody className="px-4 py-6">
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-12 items-center justify-center">
          <div className="grid grid-cols-5 col-span-7 gap-4 md:gap-12 items-center">
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
              <div className="text-md sm:text-xl font-semibold">
                {beerLink ? (
                  <Link
                    href={beerLink}
                    onClick={onClick}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="text-blue-300"
                  >
                    {beer.beer}
                  </Link>
                ) : (
                  beer.beer
                )}
              </div>
              <div className="text-gray-100">
                <div>{beer.brewery}</div>
                <div className="text-sm text-gray-400">{beer.style}</div>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="grid grid-cols-3 gap-4 md:gap-12">
              {beer.rating ? (
                <div className="col-span-1">
                  <div className="font-light text-sm text-gray-400">Rating</div>
                  <div className="text-xl">
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
                  <div className="font-light text-sm text-gray-400">ABV</div>
                  <div className="text-xl">
                    <Percentage value={beer.abv} />
                  </div>
                </div>
              ) : null}
              {beer.ibu && beer.ibu !== 0 ? (
                <div className="col-span-1">
                  <div className="font-light text-sm text-gray-400">IBU</div>
                  <div className="text-xl">{beer.ibu}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Beer;
