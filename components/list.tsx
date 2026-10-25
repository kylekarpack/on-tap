import { useQuery } from "@apollo/client";
import { Alert, Card, Group, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";
import { GET_BEERS } from "lib/queries";
import { Beer, Sort, Venue } from "lib/types";
import { sortTable } from "lib/utils";
import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";
import BeerLink from "./beerLink";
import { CompactNumber, Percentage } from "./number";

/**
 * The generic stat layout shared by rating, abv and ibu
 */
const Stat: FunctionComponent<{ label: string; children?: ReactNode }> = ({ label, children }) => (
  <Stack gap={2}>
    <Text fz="10px" fw={600} tt="uppercase" c="dimmed" lh={1.2} style={{ letterSpacing: "0.08em" }}>
      {label}
    </Text>
    <Text fz="15px" fw={600} style={{ fontVariantNumeric: "tabular-nums" }}>
      {children}
    </Text>
  </Stack>
);

/**
 * Render a list of beers
 */
const BeerList: FunctionComponent<{ venue: Venue; sort: Sort }> = ({ venue, sort }) => {
  const { loading, error, data } = useQuery<{ beers: Beer[] }>(GET_BEERS, {
    variables: {
      venue: venue.value,
      params: {
        venueId: venue.params?.venueId
      }
    }
  });

  if (loading) {
    return <ListSkeleton />;
  }

  if (error) {
    return (
      <Alert
        data-testid="error"
        title="Error"
        color="red"
        variant="light"
        icon={
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {/* Triangle alert glyph (from Lucide, ISC licensed) */}
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.73-2" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        }
        withCloseButton={false}
        role="alert"
        aria-live="polite"
      >
        {error.message}
      </Alert>
    );
  }

  const listData: Beer[] = sortTable(sort, data?.beers) ?? [];
  return (
    <SimpleGrid data-testid="list" cols={{ base: 1, sm: 2 }} spacing="sm">
      {listData.length === 0 ? (
        <Text c="dimmed" ta="center" p="xl">
          No beers on tap right now
        </Text>
      ) : null}
      {listData.map((beer) => (
        <Card key={beer.guid} radius="lg" shadow="sm" padding="md">
          <Group wrap="nowrap" align="flex-start" gap="md">
            <Image
              width={48}
              height={48}
              src={beer.labelImageUrl || "/badge-beer-default.png"}
              alt={beer.beer ?? ""}
              style={{
                borderRadius: 12,
                backgroundColor: "var(--mantine-color-default)",
                objectFit: "contain"
              }}
            />
            <Stack gap={6} style={{ minWidth: 0 }}>
              <BeerLink beer={beer} />
              <Text size="sm" c="dimmed" lh={1.4} style={{ opacity: 0.85 }} lineClamp={1}>
                {beer.brewery} {beer.style ? "-" : ""} {beer.style}
              </Text>
              <Group gap="xl" mt={2} wrap="wrap">
                {beer.rating ? (
                  <Stat label="Rating">
                    {beer.rating.toFixed(2)}
                    {beer.ratings && (
                      <Text span fz="xs" fw={400} c="dimmed">
                        &nbsp; (<CompactNumber value={beer.ratings} />)
                      </Text>
                    )}
                  </Stat>
                ) : null}
                {beer.abv && beer.abv !== 0 ? (
                  <Stat label="ABV">
                    <Percentage value={beer.abv} />
                  </Stat>
                ) : null}
                {beer.ibu && beer.ibu !== 0 ? (
                  <Stat label="IBU">
                    {beer.ibu}
                  </Stat>
                ) : null}
              </Group>
            </Stack>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};

/**
 * Skeleton cards shown while the tap list loads
 */
const ListSkeleton: FunctionComponent = () => (
  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} h={96} radius="lg" />
    ))}
  </SimpleGrid>
);

export default BeerList;
