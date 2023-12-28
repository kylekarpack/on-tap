import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Select, SelectItem } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import List from "components/list";
import { sorts, venues } from "lib/constants";
import { Sort, Venue } from "lib/types";

/**
 * The home page for the application
 */
export default function Home({ initialVenue }: { initialVenue: Venue }) {
  const router = useRouter();
  const [venue, setVenue] = useState<Venue>(initialVenue || venues[0]);
  const [sort, setSort] = useState<Sort>(sorts[0]);

  const changeVenue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newVenue: Venue = JSON.parse(e.target.value);
    router.push({
      query: { venue: newVenue.value, venueId: newVenue.params?.venueId }
    });
    setVenue(newVenue);
  };

  const changeSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newSort: Sort = JSON.parse(e.target.value);
    setSort(newSort);
  };

  return (
    <>
      <Head>
        <title>On Tap Seattle</title>
      </Head>

      <Navbar position="sticky" isBordered isBlurred maxWidth="full">
        <NavbarBrand>
          <Image width={32} height={32} src="/icons/favicon-196.png" alt="Main logo" />
          <div className="px-2 text-gray-50">On Tap Sea</div>
        </NavbarBrand>

        <NavbarContent>
          <NavbarItem className="w-1/2">
            <Select label="Venue" value={JSON.stringify(venue)} onChange={changeVenue} items={venues} size="sm">
              {(item) => (
                <SelectItem key={JSON.stringify(item)} value={JSON.stringify(item)}>
                  {item.label}
                </SelectItem>
              )}
            </Select>
          </NavbarItem>
          <NavbarItem className="w-1/2">
            <Select label="Sort" value={JSON.stringify(sort)} onChange={changeSort} items={sorts} size="sm">
              {(item) => (
                <SelectItem key={item.field + item.dir} value={JSON.stringify(item)} textValue={item.label}>
                  {item.label}
                </SelectItem>
              )}
            </Select>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <List venue={venue} sort={sort} />
    </>
  );
}

/**
 * Get the initial venue from the query, if applicable
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  let initialVenue: Venue = null;
  if (context.query.venue) {
    const { venueId } = context.query;
    initialVenue = venues.find(
      (el) => el.value === context.query.venue && (!venueId || el.params?.venueId === venueId)
    );
  }
  return {
    props: {
      initialVenue
    }
  };
};
