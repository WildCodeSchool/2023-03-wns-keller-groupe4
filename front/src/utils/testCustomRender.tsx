import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthService from './authService';

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = AuthService.getClientData()?.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

const allProviders = ({ children }: {children: React.ReactNode}) => {
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        </BrowserRouter>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
  ) => render(ui, {wrapper: allProviders, ...options})

export * from '@testing-library/react'
export { customRender as render } // use this render instead of "render" from @testing-library/react for testing components