import Home from "./home";
import { venues } from "lib/constants";
import { Venue } from "lib/types";

type PageProps = {
  searchParams: Promise<{ venue?: string; venueId?: string }>;
};

/**
 * The home page for the application
 */
export default async function Page({ searchParams }: PageProps) {
  const { venue, venueId } = await searchParams;
  const initialVenue: Venue | null = venue
    ? venues.find((el) => el.value === venue && (!venueId || el.params?.venueId === venueId))
    : null;

  return <Home initialVenue={initialVenue} />;
}
