import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { FunctionComponent } from "react";
import { sorts, venues } from "lib/constants";
import { Sort, Venue } from "lib/types";

type NavBarProps = {
  venue: Venue;
  sort: Sort;
  changeVenue: (venue: React.ChangeEvent<HTMLSelectElement>) => void;
  changeSort: (sort: React.ChangeEvent<HTMLSelectElement>) => void;
};

/**
 * Nav bar component
 */
const NavBar: FunctionComponent<NavBarProps> = ({ venue, changeVenue, sort, changeSort }) => (
  <Navbar position="sticky" isBordered isBlurred maxWidth="full">
    <NavbarBrand className="flex-1 md:flex-1">
      <Image width={40} height={40} src="/icons/favicon-196.png" alt="Main logo" className="rounded" />
      <div className="px-4 text-gray-50 text-xl font-bold hidden md:block">On Tap Sea</div>
    </NavbarBrand>

    <NavbarContent className="flex-5 md:flex-1">
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
);

export default NavBar;
