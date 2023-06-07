import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "../../components/List";

class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.IntersectionObserver = MockIntersectionObserver;

describe("List", () => {
  const item = {
    id: 1,
    name: "GitHub Repo List",
    author: "Hao Han Chen",
    description: "Awesome GitHub Repo List With Infinite Scroll",
  };

  test("renders correctly", () => {
    const scrollCallback = jest.fn();

    const { getByTestId, getByText } = render(
      <List list={[item]} isLoading={true} scrollCallback={scrollCallback} />
    );

    const listElement = getByTestId("infinite-scroll-list");
    const observerTargetElement = getByTestId(
      "infinite-scroll-observer-target"
    );
    expect(listElement).toBeInTheDocument();
    expect(observerTargetElement).toBeInTheDocument();

    const itemNameElement = getByText(item.name);
    const itemAuthorElement = getByText(item.author);
    const itemDescriptionElement = getByText(item.description);
    expect(itemNameElement).toBeInTheDocument();
    expect(itemAuthorElement).toBeInTheDocument();
    expect(itemDescriptionElement).toBeInTheDocument();
  });
});
