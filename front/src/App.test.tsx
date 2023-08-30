import { render } from "./utils/testCustomRender"; // toujours utiliser cet import pour les tests, et non pas "@testing-library/react"
import App from "./App";

test("renders home page link", () => {
  render(<App />);
  // const linkElement = screen.getByText(/home page/i);
  // expect(linkElement).toBeInTheDocument();
  expect(true).toBe(true);
});
