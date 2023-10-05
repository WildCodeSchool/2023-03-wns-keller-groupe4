import { render, screen} from "../utils/testCustomRender";
import ProductsListComponent from "../components/ProductsListComponent";

describe("Products list", () => {
    it("renders product list component", () => {
        render(<ProductsListComponent id={1} name={"brouette"} price={10} picture={"test"} />);
    });

    it("renders elements of the component", async () => {
        render(<ProductsListComponent id={1} name={"brouette"} price={10} picture={"test"} />);

        // Expect image alt to be present
        const imageElement = screen.getByRole("img", { 
            name: "brouette"
        });
        expect(imageElement).toBeInTheDocument();

        // Expect title to be present
        const titleElement = screen.getByText(/brouette/i);
        expect(titleElement).toBeInTheDocument();

        // Expect price to be present
        const priceElement = screen.getByText(/10 €\/day/i);
        expect(priceElement).toBeInTheDocument();

        // Expect link to be present
        const buttonElement = screen.getByRole("link", { 
            name: "Details"
        });
        expect(buttonElement).toHaveAttribute('href', '/product/1/brouette');
    });
});