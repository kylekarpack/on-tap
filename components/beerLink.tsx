import type { MouseEvent } from "react";
import { Beer } from "utilities/types";

export default function BeerLink({ beer }: { beer: Beer }) {
  const isIos = navigator.userAgent.match("/iPad|iPhone|iPod//i");
  const isAndroid = navigator.userAgent.match("Android");

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isIos) {
      e.preventDefault();
      window.location.href = `untappd://beer/${beer.id}`;
      return false;
    } else if (isAndroid) {
      e.preventDefault();
      window.location.href = `intent://beer/${beer.id}/#Intent;scheme=untappd;package=com.untappdllc.app;end`;
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {beer.id ? (
        <a href={`https://untappd.com/beer/${beer.id}`} onClick={onClick} target="_blank" rel="nofollow noreferrer">
          {beer.beer}
        </a>
      ) : (
        beer.beer
      )}
    </>
  );
}
