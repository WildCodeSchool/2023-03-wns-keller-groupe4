import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getIDToken, refreshToken } from "./jwtHandler";

const httpLink = createHttpLink({
  uri: `https://staging.keller4.wns.wilders.dev/graphql/graphql`,
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
            `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
          );
        }
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
);

export default new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
