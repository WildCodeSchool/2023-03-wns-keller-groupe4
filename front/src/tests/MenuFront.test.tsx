import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import MenuFront from "../components/MenuFront";
import { GET_CATEGORIES } from "../utils/queries";

const mocks = [
    {
        request: {
            query: GET_CATEGORIES,
        },
        result: {
            data: {
                getCategories: [
                    {
                        id: "2900312e-0c93-4eeb-8101-eb8ca0ad71aa",
                        name: "Camion",
                    },
                ],
            },
        },
    },
];

const errorMocks = [
    {
        request: {
            query: GET_CATEGORIES,
        },
        error: new Error("An error occurred"),
    },
];

describe("MenuFront", () => {
    it("renders MenuFront component", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/"]}>
                    <MenuFront setOpenNav={() => {}} />
                </MemoryRouter>
            </MockedProvider>,
        );
    });

    it("renders loading state initially", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/"]}>
                    <MenuFront setOpenNav={() => {}} />
                </MemoryRouter>
            </MockedProvider>,
        );
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders categories", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/"]}>
                    <MenuFront setOpenNav={() => {}} />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Wait for the component to render and the queries to complete
        await waitFor(() => {
            expect(screen.getAllByRole("link")).toHaveLength(2); // Including the "Tous" link
        });

        expect(screen.getByRole("link", { name: /Tous/i })).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: /Camion/i }),
        ).toBeInTheDocument();
    });

    it("renders error state", async () => {
        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <MemoryRouter initialEntries={["/"]}>
                    <MenuFront setOpenNav={() => {}} />
                </MemoryRouter>
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(
                screen.getByText(/Erreur : Une erreur est survenue/i),
            ).toBeInTheDocument();
        });
    });

    it("updates state when clicking on a category", async () => {
        const setOpenNav = jest.fn();
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/"]}>
                    <MenuFront setOpenNav={setOpenNav} />
                </MemoryRouter>
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getAllByRole("link")).toHaveLength(2); // Including the "Tous" link
        });

        await act(async () => {
            screen.getByRole("link", { name: /Camion/i }).click();
        });
        expect(setOpenNav).toHaveBeenCalledTimes(1);
        expect(setOpenNav).toHaveBeenCalledWith(false);
    });
});
