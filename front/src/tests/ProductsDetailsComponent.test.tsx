import { act, fireEvent, render, screen, waitFor } from "../utils/testCustomRender";
import ProductsDetailsComponent from "../components/ProductsDetailsComponent";
import verifyBase64Image from "../utils/verifyBase64Image";
import defaultImage from "./../assets/products/default.png";

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

    it("renders elements of the component for an available product", async () => {
        render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={"Description de la brouette"} price={10} stock={5} picture={"image.jpg"} available={true} />);
        expect(screen.getByRole("heading", { name: "brouette" })).toBeInTheDocument();
        expect(screen.getByText(/Description de la brouette/i)).toBeInTheDocument();
        expect(screen.getByText(/10 €/i)).toBeInTheDocument();
        expect(screen.getByText(/5 pieces/i)).toBeInTheDocument();
        expect(screen.getByText(/Reservation/i)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "image.jpg");
    });

    describe("When the product is not available or have no description, or image src is wrong", () => {
        it("should display the status as unavailable", () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"image.jpg"} available={false} />);
            expect(screen.getByText(/Unavailable/i)).toBeInTheDocument();
        });

        it("should display the description as unavailable", () => {
            render(<ProductsDetailsComponent id={"1"} name={"brouette"} description={""} price={10} stock={5} picture={"image.jpg"} available={false} />);
            expect(screen.getByText(/No description available/i)).toBeInTheDocument();
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