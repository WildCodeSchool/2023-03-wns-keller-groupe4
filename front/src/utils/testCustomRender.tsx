import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getIDToken, refreshToken } from "./jwtHandler";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_GRAPHQL_URL!,
    credentials: "include",
});

const authLink = setContext((_, { headers }) => {
    const token = getIDToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            for (const error of graphQLErrors) {
                if (error.message.includes("Access denied")) {
                    return new Observable((observer) => {
                        (async () => {
                            try {
                                await refreshToken();
                                const subscriber = {
                                    next: observer.next.bind(observer),
                                    error: observer.error.bind(observer),
                                    complete: observer.complete.bind(observer),
                                };
                                // Retry the operation with the updated token
                                forward(operation).subscribe(subscriber);
                            } catch (error) {
                                observer.error(error);
                            }
                        })();
                    });
                } else {
                    console.error(
                        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
                    );
                }
            }
        }
        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }
    },
);

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});

const allProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </BrowserRouter>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: allProviders, ...options });

export * from "@testing-library/react";
export { customRender as render }; // use this render instead of "render" from @testing-library/react for testing components
