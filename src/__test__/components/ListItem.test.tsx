import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem, { ListItemProps } from "../../components/ListItem";

describe("ListItem", () => {
  const props: ListItemProps = {
    id: 1,
    name: "GitHub Repo List",
    author: "Hao Han Chen",
    description: "Awesome GitHub Repo List With Infinite Scroll",
  };

  test("renders correctly", () => {
    const { getByText } = render(<ListItem {...props} />);

    const nameElement = getByText(props.name);
    const authorElement = getByText(props.author);
    const descriptionElement = getByText(props.description);

    expect(nameElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(nameElement).toHaveClass("item__name");
    expect(authorElement).toHaveClass("item__author");
    expect(descriptionElement).toHaveClass("item__description");
  });
});
