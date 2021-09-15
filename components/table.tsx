import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { Col, Grid, Loader, Panel, PanelGroup, Row, Message } from "rsuite";
import { GET_BEERS } from "util/queries/getBeers";
import { Beer } from "util/types/beer";
import { Sort } from "util/types/sort";
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

export default function BeerTable({ venue, sort }: { venue: string; sort: Sort }) {
  const { loading, error, data } = useQuery(GET_BEERS, {
    variables: {
      venue
    }
  }) as { data: { beers: Beer[] }; loading: boolean; error: Error };

  const listData: Beer[] = sortTable(sort, data?.beers) ?? [];

  if (loading) {
    return (
      <div>
        <Loader center size="md" />
      </div>
    );
  }

  if (error) {
    console.log({ e: error });
    return (
      <Message style={{ marginTop: "1em" }} type="error">
        <h5 className="rs-message-header">Error</h5>
        {error.message}
      </Message>
    );
  }

  return (
    <PanelGroup>
      {listData.map((beer, i) => (
        <Panel key={i}>
          <Grid fluid>
            <Row gutter={16}>
              <Col xs={6} sm={4} md={2} style={{ marginLeft: "-8px" }}>
                <Image width={75} height={75} src={beer.labelImageUrl || "/badge-beer-default.png"} alt={beer.beer} />
              </Col>
              <Col xs={18} sm={14} md={10} style={{ lineHeight: 1.1 }}>
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
                  <div style={dataStyle}>
                    {beer.rating?.toFixed(2)}
                    {beer.ratings && (
                      <small style={{ opacity: 0.5 }}>
                        &nbsp;({new Intl.NumberFormat("en-US").format(beer.ratings)})
                      </small>
                    )}
                  </div>
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
