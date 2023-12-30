import { MouseEvent, useMemo } from "react";
import { Beer } from "lib/types";

/**
 * Beer link hook
 */
const useBeerLink = (beer: Beer) => {
  const isIos = useMemo(() => navigator.userAgent.match(/iPad|iPhone|iPod/i), []);
  const isAndroid = useMemo(() => navigator.userAgent.match("Android"), []);

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

  return {
    onClick,
    beerLink: beer.id ? `https://untappd.com/beer/${beer.id}` : null
  };
};

export default useBeerLink;
