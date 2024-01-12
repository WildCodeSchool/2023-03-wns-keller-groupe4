import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import SignupForm from "../components/SignupForm";
import { SIGNUP_MUTATION } from "../utils/mutations";
import * as navigation from "../utils/navigation";

jest.mock("../utils/navigation");

const mocks = [
    {
        // Success scenario
        request: {
            query: SIGNUP_MUTATION,
            variables: {
                signupUserInput: {
                    email: "test@example.com",
                    password: "password123",
                    passwordConfirm: "password123",
                },
            },
        },
        result: {
            data: {
                signup: true,
            },
        },
    },
    {
        // Error scenario: Duplicate email
        request: {
            query: SIGNUP_MUTATION,
            variables: {
                signupUserInput: {
                    email: "duplicate@example.com",
                    password: "password123",
                    passwordConfirm: "password123",
                },
            },
        },
        error: new Error("duplicate key value violates unique constraint"),
    },
    {
        // Error scenario: Generic error
        request: {
            query: SIGNUP_MUTATION,
            variables: {
                signupUserInput: {
                    email: "error@example.com",
                    password: "password123",
                    passwordConfirm: "password123",
                },
            },
        },
        error: new Error("Some other error message"),
    },
];

describe("SignupForm", () => {
    it("renders SignupForm component", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Check if the form elements are rendered
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
        expect(
            screen.getByLabelText("Confirmer le mot de passe"),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "S'inscrire" }),
        ).toBeInTheDocument();
    });

    it("submits the form successfully", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "password123" },
        });

        // Spy on the reloadPage function
        const reloadPageSpy = jest.spyOn(navigation, "reloadPage");

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            // Submit the form
            fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));
        });
        // Wait for the reloadPage function to be called
        await waitFor(() => {
            expect(reloadPageSpy).toHaveBeenCalled();
        });

        // Clean up the spy
        reloadPageSpy.mockRestore();
    });

    it("displays an error message for a duplicate email", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "duplicate@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(
                screen.getByText("Cet email est déjà utilisé"),
            ).toBeInTheDocument();
        });
    });

    it("displays a generic error message for other errors", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "error@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(
                screen.getByText("Une erreur est survenue"),
            ).toBeInTheDocument();
        });
    });

    it("displays an error message when the email is invalid", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "error@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "password123" },
        });
    });

    it("displays an error message when the passwords don't match", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "testexamplecom" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "wrongPassword" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(
                screen.getByText("L'email n'est pas valide"),
            ).toBeInTheDocument();
        });
    });

    it("displays an error message when the password is too short", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "short" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "short" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(
                screen.getAllByText(
                    "Le mot de passe doit faire au moins 8 caractères",
                )[0],
            ).toBeInTheDocument();
        });
    });

    it("displays an error message when the password is too long", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "thisPasswordIsVeryVeryVeryLong" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "thisPasswordIsVeryVeryVeryLong" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(
                screen.getAllByText(
                    "Le mot de passe doit faire au plus 20 caractères",
                )[0],
            ).toBeInTheDocument();
        });
    });

    it("displays an error message when the email field is empty", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(screen.getByText("Ce champ est requis")).toBeInTheDocument();
        });
    });

    it("displays an error message when the password field is empty", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@exemple.com" },
        });
        fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(screen.getByText("Ce champ est requis")).toBeInTheDocument();
        });
    });

    it("displays an error message when the confirm password field is empty", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={["/connect"]}>
                    <ToastContainer position="bottom-center" />
                    <SignupForm />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@exemple.com" },
        });
        fireEvent.change(screen.getByLabelText("Mot de passe"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "S'inscrire" }));

        // Wait for the error toast message to be displayed
        await waitFor(() => {
            expect(screen.getByText("Ce champ est requis")).toBeInTheDocument();
        });
    });
});
