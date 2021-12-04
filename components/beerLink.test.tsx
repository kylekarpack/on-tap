import { fireEvent, render } from "@testing-library/react";
import BeerLink from "./beerLink";

const beer = { id: 1, beer: "Test Beer Name" };

const renderAndClick = () => {
  const { getByText } = render(<BeerLink beer={beer} />);
  const link = getByText(beer.beer);
  fireEvent.click(link);
};

describe("beer link componenent tests", () => {
  let userAgent: jest.SpyInstance<string>;
  const assignMock = jest.fn();

  beforeEach(() => {
    userAgent = jest.spyOn(window.navigator, "userAgent", "get");
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = { assign: assignMock };
  });

  afterEach(() => {
    userAgent.mockReturnValue("");
    assignMock.mockClear();
  });

  it("renders empty", () => {
    const { container } = render(<BeerLink beer={{}} />);
    expect(container).toBeInTheDocument();
  });

  it("renders with id", () => {
    const { getByText } = render(<BeerLink beer={beer} />);
    expect(getByText(beer.beer)).toHaveAttribute("target", "_blank");
  });

  it("handles ios click events", () => {
    userAgent.mockReturnValue("iPhone");
    renderAndClick();
    expect(window.location.href).toBe(`untappd://beer/${beer.id}`);
  });

  it("handles android click events", () => {
    userAgent.mockReturnValue("Android");
    renderAndClick();
    expect(window.location.href.startsWith(`intent://beer/${beer.id}`)).toBeTruthy();
  });

  it("handles non-mobile click events", () => {
    renderAndClick();
    expect(window.location.href).not.toBeDefined();
  });
});
