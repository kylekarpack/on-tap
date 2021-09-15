import Table from "components/table";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Content, FlexboxGrid, SelectPicker } from "rsuite";
import { sorts, venues } from "util/constants";
import { Sort } from "util/types/sort";

export default function Home({ initialVenue }: { initialVenue: string }) {
  const router = useRouter();
  const [venue, setVenue] = useState<string>(initialVenue || venues[0].value);
  const [sort, setSort] = useState<Sort>(sorts[0]);

  const changeVenue = (venue: string): void => {
    router.push({
      query: { venue }
    });
    setVenue(venue);
  };

  const changeSort = (_: never, sort: Sort): void => {
    setSort(sort);
  };

  return (
    <Container>
      <Head>
        <title>On Tap Seattle</title>
      </Head>

      <Content style={{ padding: "1em" }}>
        <h1 style={{ fontSize: "2em" }}>On Tap Seattle</h1>
        <FlexboxGrid>
          <FlexboxGrid.Item style={{marginRight:"1em"}}>
            <SelectPicker
              onChange={changeVenue}
              value={venue}
              searchable={false}
              cleanable={false}
              data={venues}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <SelectPicker
              onSelect={changeSort}
              value={sort.label}
              valueKey="label"
              searchable={false}
              cleanable={false}
              data={sorts}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Table venue={venue} sort={sort} />
      </Content>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      initialVenue: context.query.venue ?? null
    }
  };
};
