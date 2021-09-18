import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import List from "./list";
import { GET_BEERS } from "utilities/queries/getBeers";

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: GET_BEERS,
      variables: {
        venue: "chucks"
      }
    },
    result: {
      data: {
        beers: []
      }
    }
  }
];

describe("list component", () => {
  afterEach(cleanup);
  it("renders", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List venue="chucks" sort={{ dir: "asc", field: "beer" }} />
      </MockedProvider>
    );
  });
});
