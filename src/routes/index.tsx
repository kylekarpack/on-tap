import { Select } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import List, { ListSkeleton } from "components/list";
import { sorts, venues } from "lib/constants";
import { Sort, Venue } from "lib/types";
import { Suspense, useState } from "react";
import styles from "app/index.module.css";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    venue: typeof search.venue === "string" ? search.venue : undefined,
    venueId: typeof search.venueId === "string" ? search.venueId : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
    dir: search.dir === "asc" || search.dir === "desc" ? (search.dir as "asc" | "desc") : undefined
  }),
  component: Home
});

function resolveVenue(venue?: string, venueId?: string): Venue {
  if (venue) {
    const found = venues.find((el) => el.value === venue && (!venueId || el.params?.venueId === venueId));
    if (found) return found;
  }
  return venues[0];
}

function resolveSort(sort?: string, dir?: "asc" | "desc"): Sort {
  if (sort) {
    const found = sorts.find((el) => el.field === sort && (dir == null || el.dir === dir));
    if (found) return found;
  }
  return sorts[0];
}

function Home() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  const [venue, setVenue] = useState<Venue>(() => resolveVenue(search.venue, search.venueId));
  const [sort, setSort] = useState<Sort>(() => resolveSort(search.sort, search.dir));

  const changeVenue = (value: string): void => {
    const newVenue: Venue = JSON.parse(value);
    setVenue(newVenue);
    navigate({
      search: (prev) => ({
        ...prev,
        venue: newVenue.value,
        venueId: newVenue.params?.venueId,
        sort: sort.field,
        dir: sort.dir
      })
    });
  };

  const changeSort = (value: string): void => {
    const newSort: Sort = JSON.parse(value);
    setSort(newSort);
    navigate({
      search: (prev) => ({
        ...prev,
        sort: newSort.field,
        dir: newSort.dir
      }),
      replace: true
    });
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <img width={28} height={28} src="/icons/favicon-196.png" alt="Main logo" style={{ borderRadius: 8 }} />
            <span className={styles.wordmark}>On Tap</span>
          </div>
          <div className={styles.controls}>
            <Select
              id="venueSelect"
              type="button"
              autoComplete="off"
              onContextMenu={(event) => event.preventDefault()}
              className={styles.select}
              classNames={{ option: styles.selectOption }}
              label="Venue"
              data={venues.map((el) => ({ value: JSON.stringify(el), label: el.label }))}
              value={JSON.stringify(venue)}
              onChange={(value) => {
                if (value) changeVenue(value);
              }}
              allowDeselect={false}
            />
            <Select
              id="sortSelect"
              type="button"
              autoComplete="off"
              onContextMenu={(event) => event.preventDefault()}
              className={styles.select}
              classNames={{ option: styles.selectOption }}
              label="Sort"
              data={sorts.map((el) => ({ value: JSON.stringify(el), label: el.label }))}
              value={JSON.stringify(sort)}
              onChange={(value) => {
                if (value) changeSort(value);
              }}
              allowDeselect={false}
            />
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<ListSkeleton />}>
          <List venue={venue} sort={sort} />
        </Suspense>
      </main>
    </>
  );
}
