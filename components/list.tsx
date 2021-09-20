import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { Col, Grid, Loader, Message, Panel, PanelGroup, Row } from "rsuite";
import { GET_BEERS } from "utilities/queries";
import { Beer, Sort } from "utilities/types";
import { sortTable } from "utilities/utils";
import styles from "./list.module.css";

export default function List({ venue, sort }: { venue: string; sort: Sort }) {
  const { loading, error, data } = useQuery(GET_BEERS, {
    variables: {
      venue
    }
  }) as { data: { beers: Beer[] }; loading: boolean; error: Error };

  if (loading) {
    return (
      <div>
        <Loader center size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <Message data-testid="error" style={{ marginTop: "1em" }} type="error">
        <h5 className="rs-message-header">Error</h5>
        {error.message}
      </Message>
    );
  }

  const listData: Beer[] = sortTable(sort, data?.beers) ?? [];

  return (
    <PanelGroup data-testid="list">
      {listData.map((beer, i) => (
        <Panel key={i}>
          <Grid fluid>
            <Row gutter={16}>
              <Col xs={6} sm={4} md={2} style={{ marginLeft: "-8px" }}>
                <Image width={75} height={75} src={beer.labelImageUrl || "/badge-beer-default.png"} alt={beer.beer} />
              </Col>
              <Col xs={18} sm={14} md={10} style={{ lineHeight: 1.1 }}>
                <div className={styles.title} style={{ fontSize: "1.5em", fontWeight: 500 }}>
                  {beer.id ? (
                    <a href={`https://untappd.com/qr/${beer.id}`} target="_blank" rel="nofollow noreferrer">
                      {beer.beer}
                    </a>
                  ) : (
                    beer.beer
                  )}
                </div>
                <div className={styles.title} style={{ fontSize: "1.3em" }}>
                  {beer.brewery}
                </div>
                <div className={styles.slim} style={{ fontSize: "0.9em" }}>
                  <div>{beer.style}</div>
                </div>
              </Col>
              {beer.rating && (
                <Col xs={8} md={4} className={styles.card}>
                  <div className={styles.slim}>Rating</div>
                  <div className={styles.data}>
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
                <Col xs={8} md={4} className={styles.card}>
                  <div className={styles.slim}>ABV</div>
                  <div className={styles.data}>{beer.abv}%</div>
                </Col>
              )}
              {beer.ibu && (
                <Col xs={8} md={4} className={styles.card}>
                  <div className={styles.slim}>IBU</div>
                  <div className={styles.data}>{beer.ibu}</div>
                </Col>
              )}
            </Row>
          </Grid>
        </Panel>
      ))}
    </PanelGroup>
  );
}
