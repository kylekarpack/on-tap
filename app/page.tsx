import { sorts, venues } from "lib/constants";
import { Sort, Venue } from "lib/types";
import Home from "./home";

type PageProps = {
  searchParams: Promise<{
    venue?: string;
    venueId?: string;
    sort?: string;
    sortBy?: string;
    by?: string;
    dir?: string;
    sortDir?: string;
    direction?: string;
  }>;
};

/**
 * The home page for the application
 */
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const { venue, venueId } = params;
  const sortField = params.sort ?? params.sortBy ?? params.by;
  const sortDir = params.dir ?? params.sortDir ?? params.direction;

  const initialVenue: Venue | null = venue
    ? venues.find((el) => el.value === venue && (!venueId || el.params?.venueId === venueId))
    : null;

  const initialSort: Sort | null =
    sortField != null
      ? (sorts.find((el) => el.field === sortField && (sortDir == null || el.dir === sortDir)) ?? null)
      : null;

  return <Home initialVenue={initialVenue} initialSort={initialSort} />;
}
