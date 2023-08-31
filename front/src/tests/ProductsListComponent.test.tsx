import { render, screen } from "../utils/testCustomRender";
import ProductsListComponent from "../components/ProductsListComponent";

describe("Products list", () => {
    it("renders product list component", () => {
        render(<ProductsListComponent id={1} name={"brouette"} price={10} picture={"test"} />);
    });

    it("renders buttons to show product details", () => {
        render(<ProductsListComponent id={1} name={"brouette"} price={10} picture={"test"} />);
        const linkElement = screen.queryByText(/Details/i);
        expect(linkElement).toBeInTheDocument();
    });

    // Click on the button redirect to the product details page
    
    
});
