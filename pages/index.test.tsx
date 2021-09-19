import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import React from "react";
import Index from "./index";

describe("index page", () => {
  it("renders", () => {
    const cmp = render(
      <MockedProvider mocks={[]}>
        <Index initialVenue="chucks" />
      </MockedProvider>
    );

    expect(cmp.container).toBeVisible();
  });
});
