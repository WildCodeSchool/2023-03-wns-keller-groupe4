import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import LoginForm from "../components/LoginForm";
import { LOGIN_GUERY } from "../utils/queries";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const mocks = [
    {
        request: {
            query: LOGIN_GUERY,
            variables: {
                email: "test@example.com",
                password: "testpassword",
            },
        },
        result: {
            data: {
                login: {
                    tokens: {
                        IDToken: "mockedToken",
                        accessToken: "mockedToken",
                    },
                },
            },
        },
    },
    {
        request: {
            query: LOGIN_GUERY,
            variables: {
                email: "error@example.com",
                password: "wrongPassword",
            },
        },
        error: new Error("Could not find any entity of type"),
    },
    {
        request: {
            query: LOGIN_GUERY,
            variables: {
                email: "otherError@example.com",
                password: "incorrectPassword",
            },
        },
        error: new Error("Some other error message"),
    },
];

jest.mock("../utils/jwtHandler", () => ({
    setIDToken: jest.fn(),
    setAccessToken: jest.fn(),
}));

describe("LoginForm", () => {
    it("should render the login form", () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        expect(
            screen.getByRole("heading", { name: /se connecter/i }),
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: /se connecter/i,
            }),
        ).toBeInTheDocument();
    });

    it("should handle form submission and redirect on successful login", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "testpassword" },
        });

        // Submit the form
        fireEvent.click(
            screen.getByRole("button", {
                name: /se connecter/i,
            }),
        );

        // Wait for the login query to be completed
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await waitFor(() => {
                expect(
                    require("../utils/jwtHandler").setIDToken,
                ).toHaveBeenCalledWith("mockedToken");
            });

            await waitFor(() => {
                expect(
                    require("../utils/jwtHandler").setAccessToken,
                ).toHaveBeenCalledWith("mockedToken");
            });

            await waitFor(() => {
                expect(
                    screen.getByRole("button", {
                        name: /se connecter/i,
                    }),
                ).toBeDisabled();
            });

            await waitFor(() => {
                expect(
                    screen.queryByText(/email ou mot de passe incorrect/i),
                ).toBeNull();
            });

            await waitFor(() => {
                expect(
                    screen.queryByText(/une erreur est survenue/i),
                ).toBeNull();
            });
        });
    });

    it("should display an error message for incorrect email or password", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form with incorrect email and password
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "error@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "wrongPassword" },
        });

        // Submit the form
        fireEvent.click(
            screen.getByRole("button", {
                name: /se connecter/i,
            }),
        );

        // Wait for error message
        await waitFor(() => {
            expect(
                screen.getByText("Email ou mot de passe incorrect"),
            ).toBeInTheDocument();
        });
    });

    it("should display a generic error message for other errors", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/login"]}>
                    <ToastContainer position="bottom-center" />
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form with email and password that triggers another error
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "otherError@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "incorrectPassword" },
        });

        // Submit the form
        fireEvent.click(
            screen.getByRole("button", {
                name: /se connecter/i,
            }),
        );

        // Wait for generic error message
        await waitFor(() => {
            expect(
                screen.getByText("Une erreur est survenue"),
            ).toBeInTheDocument();
        });
    });

    it("should display empty email error message", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form with empty email
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "testpassword" },
        });

        // Submit the form
        fireEvent.click(
            screen.getByRole("button", {
                name: /se connecter/i,
            }),
        );

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText("Ce champ est requis")).toBeInTheDocument();
        });
    });

    it("should display empty password error message", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form with empty password
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "" },
        });

        // Submit the form
        fireEvent.click(
            screen.getByRole("button", {
                name: /se connecter/i,
            }),
        );

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText("Ce champ est requis")).toBeInTheDocument();
        });
    });
});
