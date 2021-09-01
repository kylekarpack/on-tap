import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Ratings from "react-ratings-declarative";
import { FlexboxGrid, Icon, List, Table } from "rsuite";
import { GET_BEERS } from "util/queries/getBeers";
import { Beer } from "util/types/beer";
import { sortTable } from "util/utils";
import Image from "next/image";

const { Column, HeaderCell, Cell } = Table;

const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px"
};

const slimText = {
  fontSize: "0.666em",
  color: "#97969B",
  fontWeight: "lighter",
  paddingBottom: 5
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: "nowrap",
  fontWeight: 500
};

const dataStyle = {
  fontSize: "1.2em",
  fontWeight: 500
};

export default function BeerTable({ venue }) {
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

  const listData: Beer[] = sortTable(state, data?.beers);

  return (
    <List hover>
      {listData.map((beer, i) => (
        <List.Item key={i} index={i}>
          <FlexboxGrid>
            <FlexboxGrid.Item>
              <img src={beer.labelImageUrl} alt={beer.beer} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={titleStyle}>{beer.beer}</div>
              <div style={slimText}>
                <div>{beer.style}</div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid>
            {/*base info*/}

            {/*peak data*/}
            <FlexboxGrid.Item colspan={6} style={styleCenter}>
              <div style={{ textAlign: "right" }}>
                <div style={slimText}>Top Value</div>
                <div style={dataStyle}>{beer.rating}</div>
              </div>
            </FlexboxGrid.Item>
            {/*uv data*/}
            <FlexboxGrid.Item colspan={6} style={styleCenter}>
              <div style={{ textAlign: "right" }}>
                <div style={slimText}>UV</div>
                <div style={dataStyle}>{beer.abv}</div>
              </div>
            </FlexboxGrid.Item>
            {/*uv data*/}
            <FlexboxGrid.Item
              colspan={4}
              style={{
                ...styleCenter
              }}
            >
              <a href="#">View</a>
              <span style={{ padding: 5 }}>|</span>
              <a href="#">Edit</a>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );

  return error ? (
    <div>Error: {error.message}</div>
  ) : (
    <Table
      height={550}
      loading={loading}
      data={sortTable(state, data?.beers)}
      sortColumn={state.sortColumn}
      sortType={state.sortType}
      onSortColumn={handleSort}
      affixHeader
      affixHorizontalScrollbar
    >
      <Column flexGrow={1} minWidth={75} fixed sortable>
        <HeaderCell>Rating</HeaderCell>
        <Cell dataKey="rating" f>
          {(rowData: Beer) => (
            <>
              {rowData.rating ? (
                <div style={{ textAlign: "center" }}>
                  <small style={{ display: "block" }}>{rowData.rating}</small>
                  <div style={{ marginTop: "-8px" }}>
                    <Ratings rating={rowData.rating}>
                      <Ratings.Widget widgetDimension="10px" widgetSpacing="0" />
                      <Ratings.Widget widgetDimension="10px" widgetSpacing="0" />
                      <Ratings.Widget widgetDimension="10px" widgetSpacing="0" />
                      <Ratings.Widget widgetDimension="10px" widgetSpacing="0" />
                      <Ratings.Widget widgetDimension="10px" widgetSpacing="0" />
                    </Ratings>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </Cell>
      </Column>
      <Column flexGrow={2} minWidth={100} fixed sortable>
        <HeaderCell>Beer</HeaderCell>
        <Cell dataKey="beer">
          {(rowData: Beer) =>
            rowData.id ? (
              <a href={`https://untappd.com/beer/${rowData.id}`} target="_blank" rel="nofollow noreferrer">
                {rowData.beer}
              </a>
            ) : (
              rowData.beer
            )
          }
        </Cell>
      </Column>

      <Column flexGrow={2} minWidth={200} sortable>
        <HeaderCell>Brewery</HeaderCell>
        <Cell dataKey="brewery" />
      </Column>

      <Column flexGrow={1} minWidth={100} sortable>
        <HeaderCell>Location</HeaderCell>
        <Cell dataKey="location" />
      </Column>

      <Column flexGrow={1} minWidth={100} sortable>
        <HeaderCell>Style</HeaderCell>
        <Cell dataKey="style" />
      </Column>

      <Column flexGrow={1} minWidth={75} sortable>
        <HeaderCell>ABV</HeaderCell>
        <Cell dataKey="abv">{(rowData: Beer) => rowData.abv && `${rowData.abv}%`}</Cell>
      </Column>

      <Column flexGrow={1} minWidth={75} sortable>
        <HeaderCell>IBU</HeaderCell>
        <Cell dataKey="ibu" />
      </Column>

      <Column flexGrow={1} minWidth={75} sortable>
        <HeaderCell>Remaining</HeaderCell>
        <Cell dataKey="amount">{(rowData: Beer) => rowData.amount && `${rowData.amount}%`}</Cell>
      </Column>
    </Table>
  );
}
