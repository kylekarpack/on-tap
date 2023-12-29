import { Link } from "@nextui-org/react";
import { Beer } from "lib/types";
import type { FunctionComponent, MouseEvent } from "react";

/**
 * Create a link to a beer item in Untappd
 */
const BeerLink: FunctionComponent<{ beer: Beer }> = ({ beer }) => {
  const isIos = navigator.userAgent.match(/iPad|iPhone|iPod/i);
  const isAndroid = navigator.userAgent.match("Android");

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isIos) {
      e.preventDefault();
      window.location.href = `untappd://beer/${beer.id}`;
      return false;
    }
    if (isAndroid) {
      e.preventDefault();
      window.location.href = `intent://beer/${beer.id}/#Intent;scheme=untappd;package=com.untappdllc.app;end`;
      return false;
    }
    return true;
  };

  if (beer.id) {
    return (
      <Link
        href={`https://untappd.com/beer/${beer.id}`}
        onClick={onClick}
        target="_blank"
        rel="nofollow noreferrer"
        className="text-xl text-blue-300"
      >
        {beer.beer}
      </Link>
    );
  }

  return <>{beer.beer}</>;
};

export default BeerLink;
