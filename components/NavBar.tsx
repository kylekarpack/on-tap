import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { sorts, venues } from "lib/constants";
import { SearchState } from "lib/types/searchState";

type NavBarProps = {
  searchState: SearchState;
  setSearchState: (e: SearchState) => void;
};

/**
 * Nav bar component
 */
const NavBar: FunctionComponent<NavBarProps> = ({ searchState, setSearchState }) => {
  const router = useRouter();
  const [venue, setVenue] = useState(new Set([searchState.venue?.value || venues[0]?.value]));
  const [sort, setSort] = useState(new Set([searchState.sort?.field]));
  const [sortDir, setSortDir] = useState<"asc" | "desc">(searchState.sort?.dir);

  useEffect(() => {
    const value = [...venue][0];
    const currentVenue = venues.find((el) => el.value === value);
    const sortField = [...sort][0];

    setSearchState({
      venue: currentVenue,
      sort: {
        field: sortField,
        dir: sortDir
      }
    });

    router.push({
      query: {
        venue: currentVenue?.value,
        sortField,
        sortDir
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venue, sort, sortDir]);

  return (
    <Navbar
      position="sticky"
      isBordered
      isBlurred
      maxWidth="full"
      className="flex"
      classNames={{
        wrapper: "px-2 sm:px-6"
      }}
    >
      <NavbarBrand className="hidden md:flex flex-1 min-w-8">
        <Image width={40} height={40} src="/icons/favicon-196.png" alt="Main logo" className="rounded" />
        <div className="px-4 text-gray-50 text-xl font-bold">On Tap Sea</div>
      </NavbarBrand>

      <NavbarContent className="flex-auto" justify="center">
        <NavbarItem className="w-1/2">
          <Select
            label="Venue"
            selectedKeys={venue}
            onSelectionChange={setVenue as any}
            items={venues}
            size="sm"
            classNames={{ popoverContent: "min-w-48" }}
          >
            {(item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            )}
          </Select>
        </NavbarItem>
        <NavbarItem className="w-1/2 flex items-center gap-2">
          <Select
            label="Sort"
            selectedKeys={sort}
            onSelectionChange={setSort as any}
            items={sorts}
            size="sm"
            classNames={{ popoverContent: "min-w-36 float-right" }}
          >
            {(item) => (
              <SelectItem key={item.field} value={item.field}>
                {item.label}
              </SelectItem>
            )}
          </Select>
          <Button
            isIconOnly
            onPress={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
            size="sm"
            variant="faded"
            aria-label="Sort order"
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
