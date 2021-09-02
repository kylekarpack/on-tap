import { useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Grid, Loader, Panel, PanelGroup, Row } from "rsuite";
import { GET_BEERS } from "util/queries/getBeers";
import { Beer } from "util/types/beer";
import { sortTable } from "util/utils";

const cardStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1em"
};

const slimText = {
  fontSize: "0.9em",
  color: "#97969B",
  fontWeight: 300,
  paddingBottom: 5
};

const titleStyle = {
  paddingBottom: 5,
  fontWeight: 500,
  fontSize: "1.6em"
};

const dataStyle = {
  fontSize: "1.2em",
  fontWeight: 500
};

export default function BeerTable({ venue }: { venue: string }) {
  const [state, setState] = useState<any>({});

  const { loading, error, data } = useQuery(GET_BEERS, {
    variables: {
      venue
    }
  }) as { data: { beers: Beer[] }; loading: boolean; error: Error };

  const handleSort = (sortColumn: string, sortType: string): void => {
    setState({
      ...state,
      sortColumn,
      sortType
    });
  };

  const listData: Beer[] = sortTable(state, data?.beers) ?? [];

  if (loading) {
    return (
      <div>
        <Loader center size="md" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <PanelGroup>
      {listData.map((beer, i) => (
        <Panel key={i}>
          <Grid fluid>
            <Row gutter={16}>
              <Col xs={8} sm={4} md={2}>
                <Image
                  width={75}
                  height={75}
                  src={
                    beer.labelImageUrl || "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png"
                  }
                  alt={beer.beer}
                />
              </Col>
              <Col xs={16} sm={14} md={10}>
                <div style={titleStyle}>
                  {beer.id ? (
                    <a href={`https://untappd.com/beer/${beer.id}`} target="_blank" rel="nofollow noreferrer">
                      {beer.beer}
                    </a>
                  ) : (
                    beer.beer
                  )}
                </div>
                <div style={{ ...titleStyle, ...{ fontSize: "1.2em" } }}>{beer.brewery}</div>
                <div style={slimText}>
                  <div>{beer.style}</div>
                </div>
              </Col>
              {beer.rating && (
                <Col xs={8} md={4} style={cardStyle}>
                  <div style={slimText}>Rating</div>
                  <div style={dataStyle}>{beer.rating?.toFixed(2)}</div>
                </Col>
              )}
              {beer.abv && (
                <Col xs={8} md={4} style={cardStyle}>
                  <div style={slimText}>ABV</div>
                  <div style={dataStyle}>{beer.abv}%</div>
                </Col>
              )}
              {beer.ibu && (
                <Col xs={8} md={4} style={cardStyle}>
                  <div style={slimText}>IBU</div>
                  <div style={dataStyle}>{beer.ibu}</div>
                </Col>
              )}
            </Row>
          </Grid>
        </Panel>
      ))}
    </PanelGroup>
  );
}
