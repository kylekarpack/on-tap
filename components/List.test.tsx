import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, render } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { GET_BEERS } from "lib/queries";
import { Beer, Venue } from "lib/types";
import List from "./List";

const testSelectValue: Venue = {
  label: "Chucks",
  value: "chucks-greenwood"
};

const emptyMock: MockedResponse<Record<string, Beer[]>> = {
  request: {
    query: GET_BEERS,
    variables: {
      venue: testSelectValue.value
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
        <List venue={testSelectValue} sort={{ dir: "asc", field: "beer" }} />
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
        <List venue={testSelectValue} sort={{ dir: "asc", field: "beer" }} />
      </MockedProvider>
    );

    await act(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 0);
        })
    );
    expect(cmp.getByTestId("error")).toHaveTextContent("Error");
  });

  it("renders list", async () => {
    const mocks = [
      {
        ...emptyMock,
        ...{
          result: {
            data: {
              beers: [
                new Beer({ id: 1, rating: 4.1, ratings: 10, beer: "Test", brewery: "Test Brewery", abv: 4, ibu: 15 }),
                new Beer({ beer: "Test Partial" })
              ]
            }
          }
        }
      }
    ];

    const cmp = render(
      <MockedProvider mocks={mocks} addTypename={false} cache={null}>
        <List venue={testSelectValue} sort={{ dir: "asc", field: "beer" }} />
      </MockedProvider>
    );

    expect(await cmp.findByTestId("list")).toBeVisible();
    expect((await cmp.findByTestId("list")).childElementCount).toEqual(2);
  });
});
