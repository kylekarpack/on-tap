import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import React from "react";
import Index from "./index";

describe("index page", () => {
  it("renders", () => {
    const cmp = render(
      <MockedProvider>
        <Index initialVenue="chucks" />
      </MockedProvider>
    );

    expect(cmp.container).toBeVisible();
  });
});
