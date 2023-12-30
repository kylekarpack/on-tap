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
    <Navbar position="sticky" isBordered isBlurred maxWidth="full">
      <NavbarBrand className="flex-1 md:flex-1">
        <Image width={40} height={40} src="/icons/favicon-196.png" alt="Main logo" className="rounded" />
        <div className="px-4 text-gray-50 text-xl font-bold hidden md:block">On Tap Sea</div>
      </NavbarBrand>

      <NavbarContent className="flex-5 md:flex-1">
        <NavbarItem className="w-1/2">
          <Select label="Venue" selectedKeys={venue} onSelectionChange={setVenue} items={venues} size="sm">
            {(item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            )}
          </Select>
        </NavbarItem>
        <NavbarItem className="w-1/2">
          <Select label="Sort" selectedKeys={sort} onSelectionChange={setSort} items={sorts} size="sm">
            {(item) => (
              <SelectItem key={item.field} value={item.field}>
                {item.label}
              </SelectItem>
            )}
          </Select>{" "}
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly onPress={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}>
            {sortDir === "asc" ? "↑" : "↓"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
