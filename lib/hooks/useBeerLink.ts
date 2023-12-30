import { useMemo } from "react";
import { Beer } from "lib/types";

/**
 * Beer link hook
 */
const useBeerLink = (beer: Beer) => {
  const isIos = useMemo(() => navigator.userAgent.match(/iPad|iPhone|iPod/i), []);
  const isAndroid = useMemo(() => navigator.userAgent.match("Android"), []);

  const onClick = (shouldNavigate = false) => {
    if (isIos) {
      window.location.href = `untappd://beer/${beer.id}`;
      return false;
    }
    if (isAndroid) {
      window.location.href = `intent://beer/${beer.id}/#Intent;scheme=untappd;package=com.untappdllc.app;end`;
      return false;
    }
    if (shouldNavigate) {
      window.open(`https://untappd.com/beer/${beer.id}`, "_blank");
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
