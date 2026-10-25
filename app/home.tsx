"use client";

import { Select } from "@mantine/core";
import List from "components/list";
import { sorts, venues } from "lib/constants";
import { Sort, Venue } from "lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.css";

/**
 * The home page for the application
 */
export default function Home({ initialVenue }: { initialVenue: Venue | null }) {
  const router = useRouter();
  const [venue, setVenue] = useState<Venue>(initialVenue || venues[0]);
  const [sort, setSort] = useState<Sort>(sorts[0]);

  /**
   * Push the new query params, and scroll to top if changed
   */
  const changeVenue = (value: string): void => {
    const newVenue: Venue = JSON.parse(value);
    const query = new URLSearchParams({ venue: newVenue.value });
    if (newVenue.params?.venueId) {
      query.set("venueId", newVenue.params.venueId);
    }
    router.push(`/?${query.toString()}`);
    setVenue(newVenue);
  };

  const changeSort = (value: string): void => {
    const newSort: Sort = JSON.parse(value);
    setSort(newSort);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Image width={28} height={28} src="/icons/favicon-196.png" alt="Main logo" style={{ borderRadius: 8 }} />
            <span className={styles.wordmark}>On Tap</span>
          </div>
          <div className={styles.controls}>
            <Select
              id="venueSelect"
              // A button input keeps iOS from offering text selection/autofill
              type="button"
              autoComplete="off"
              onContextMenu={(event) => event.preventDefault()}
              className={styles.select}
              classNames={{ option: styles.selectOption }}
              label="Venue"
              data={venues.map((el) => ({ value: JSON.stringify(el), label: el.label }))}
              value={JSON.stringify(venue)}
              onChange={(value) => {
                if (value) {
                  changeVenue(value);
                }
              }}
              allowDeselect={false}
              style={{ flexBasis: 200, flexGrow: 1, flexShrink: 1, maxWidth: 260 }}
            />
            <Select
              id="sortSelect"
              // A button input keeps iOS from offering text selection/autofill
              type="button"
              autoComplete="off"
              onContextMenu={(event) => event.preventDefault()}
              className={styles.select}
              classNames={{ option: styles.selectOption }}
              label="Sort"
              data={sorts.map((el) => ({ value: JSON.stringify(el), label: el.label }))}
              value={JSON.stringify(sort)}
              onChange={(value) => {
                if (value) {
                  changeSort(value);
                }
              }}
              allowDeselect={false}
              style={{ flexBasis: 200, flexGrow: 1, flexShrink: 1, maxWidth: 260 }}
            />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <List venue={venue} sort={sort} />
      </main>
    </>
  );
}
