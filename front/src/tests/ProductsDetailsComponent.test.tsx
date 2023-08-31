import { act, fireEvent, render, screen, waitFor } from "../utils/testCustomRender";
import ProductsDetailsComponent from "../components/ProductsDetailsComponent";

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

describe("Products details", () => {
    window.ResizeObserver = ResizeObserver;

    it("renders product details component", () => {
        render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"test"} available={true} />);
    });

    it("renders elements of the component for an available product", () => {
        render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={"Description de la brouette"} price={10} stock={5} picture={"test"} available={true} />);
        expect(screen.getByRole("heading", { name: "brouette" })).toBeInTheDocument();
        expect(screen.getByText(/Description de la brouette/i)).toBeInTheDocument();
        expect(screen.getByText(/10 €/i)).toBeInTheDocument();
        expect(screen.getByText(/5 pieces/i)).toBeInTheDocument();
        expect(screen.getByText(/Reservation/i)).toBeInTheDocument();
    });

    describe("When the product is not available and there has not a description", () => {
        it("should display the status as unavailable", () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"test"} available={false} />);
            expect(screen.getByText(/No description available/i)).toBeInTheDocument();
            expect(screen.getByText(/Unavailable/i)).toBeInTheDocument();
        });

        it("should disable the reservation button", () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"test"} available={false} />);
            const buttonElement = screen.getByRole("button", {
                name: "Reservation"
            });
            expect(buttonElement).toBeDisabled();
        });
    }); 

    describe("When user clicks on the reservation button", () => {
        it("should open a modal showing a preview of the cart", async () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"test"} available={true} />);
            
            const buttonElement = screen.getByRole("button", { 
                name: "Reservation" 
            });
            expect(buttonElement).toBeInTheDocument();

            expect(screen.queryByText(/Le produit brouette a été ajouté au panier/i)).not.toBeInTheDocument();
            
            fireEvent.click(buttonElement);
            await act(() => {
                expect(screen.getByText(/Le produit brouette a été ajouté au panier/i)).toBeInTheDocument();
            });
        });
    });
});