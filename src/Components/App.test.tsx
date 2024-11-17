import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders editor and form side by side on desktop", () => {
  const { container } = render(<App />);
  console.log(container.innerHTML); // HTML content

  expect(screen.getByText("JSON Editor")).toBeInTheDocument();
  expect(screen.getByText("Dynamic Form Generator")).toBeInTheDocument();
});
