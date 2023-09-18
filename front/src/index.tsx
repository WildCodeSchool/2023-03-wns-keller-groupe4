import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    InMemoryCache,
    Observable,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import App from "./App";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken, refreshToken } from "./utils/accessToken";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});

const authLink = setContext((_, { headers }) => {
    const token = getAccessToken();
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
                    console.log("Access denied");

                    // You can return a new observable that retries the operation after refreshing the token
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

root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
            <ToastContainer position="bottom-center" />
        </ApolloProvider>
    </BrowserRouter>,
);
