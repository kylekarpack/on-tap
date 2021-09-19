import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, render } from "@testing-library/react";
import { GraphQLError } from "graphql";
import React from "react";
import { GET_BEERS } from "utilities/queries";
import { Beer } from "utilities/types";
import List from "./list";

const emptyMock: MockedResponse<Record<string, Beer[]>> = {
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
};

describe("list component", () => {
  it("renders", () => {
    const mocks = [emptyMock];

    const cmp = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List venue="chucks" sort={{ dir: "asc", field: "beer" }} />
      </MockedProvider>
    );

    expect(cmp.container).toBeVisible();
  });

  it("renders error", async () => {
    const mocks = [
      {
        ...emptyMock,
        error: new GraphQLError("Bad")
      }
    ];

    const cmp = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List venue="chucks" sort={{ dir: "asc", field: "beer" }} />
      </MockedProvider>
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(cmp.getByTestId("error")).toHaveTextContent("Error");
  });

  it("renders list", async () => {
    const mocks = [
      {
        ...emptyMock,
        ...{
          result: {
            data: {
              beers: [new Beer()]
            }
          }
        }
      }
    ];

    const cmp = render(
      <MockedProvider mocks={mocks} addTypename={false} cache={null}>
        <List venue="chucks" sort={{ dir: "asc", field: "beer" }} />
      </MockedProvider>
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(cmp.getByTestId("list")).toBeVisible();
    expect(cmp.getByTestId("list").childElementCount).toEqual(1);
  });
});
