import { sorts, venues } from "lib/constants";
import { Sort, Venue } from "lib/types";
import Home from "./home";

type PageProps = {
  searchParams: Promise<{ venue?: string; venueId?: string; sort?: string }>;
};

/**
 * The home page for the application
 */
export default async function Page({ searchParams }: PageProps) {
  const { venue, venueId, sort } = await searchParams;
  const initialVenue: Venue | null = venue
    ? venues.find((el) => el.value === venue && (!venueId || el.params?.venueId === venueId))
    : null;

  const initialSort: Sort | null = sort ? (sorts.find((el) => `${el.field}:${el.dir}` === sort) ?? null) : null;

  return <Home initialVenue={initialVenue} initialSort={initialSort} />;
}
