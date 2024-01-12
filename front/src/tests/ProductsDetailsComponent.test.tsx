import { act, fireEvent, render, screen } from "../utils/testCustomRender";
import ProductsDetailsComponent from "../components/ProductsDetailsComponent";

// Mock the ResizeObserver interface to observe the changes 
// of the modal size containing the calendar reservation
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

describe("Products details", () => {
    window.ResizeObserver = ResizeObserver;

    it("renders product details component", () => {
        render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"test"} available={true} isAdmin={false} />);
    });

    it("renders elements of the component for an available product", async () => {
        render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={"Description de la brouette"} price={10} stock={5} picture={"image.jpg"} available={true} isAdmin={false} />);
        expect(screen.getByRole("heading", { name: "brouette" })).toBeInTheDocument();
        expect(screen.getByTestId("description")).not.toBeEmptyDOMElement();
        expect(screen.getByText(/10 €/i)).toBeInTheDocument();
        expect(screen.getByText(/5 pieces/i)).toBeInTheDocument();
        expect(screen.getByText(/Reservation/i)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "image.jpg");
    });

    describe("When the product is not available = stock is empty", () => {
        it("should display the status as unavailable", () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"image.jpg"} available={false} isAdmin={false} />);
            expect(screen.getByText(/Non disponible/i)).toBeInTheDocument();
        });

        it("should disable the reservation button and set the text button as 'Rupture de stock'", () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={0} picture={"test"} available={false} isAdmin={false} />);
            const buttonElement = screen.getByRole("button", {
                name: "Rupture de stock"
            });
            expect(buttonElement).toBeDisabled();
        });
    }); 

    describe("When user clicks on the reservation button", () => {
        it("should open a modal showing a calendar", async () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"test"} available={true} isAdmin={false} />);
            
            const buttonElement = screen.getByRole("button", { 
                name: "Reservation" 
            });
            expect(buttonElement).toBeInTheDocument();

            expect(screen.queryByText(/Le produit brouette a été ajouté au panier/i)).not.toBeInTheDocument();
            
            fireEvent.click(buttonElement);
            await act(() => {
                expect(screen.getByText(/Veuillez choisir la durée de location./i)).toBeInTheDocument();;
            });
        });
    });
});