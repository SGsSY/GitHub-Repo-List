import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import QueryInput from "../../components/QueryInput";

describe("QueryInput", () => {
  const handleChange = jest.fn();

  test("debounce fire event", async () => {
    const { getByRole } = render(<QueryInput handleChange={handleChange} />);

    const inputElement = getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "react" } });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("react");
    });
  });
});
