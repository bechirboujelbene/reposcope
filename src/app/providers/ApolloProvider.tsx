import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider as Provider } from '@apollo/client/react';

// Reads token from Vite env or localStorage for convenience
const token = import.meta.env.VITE_GITHUB_TOKEN 

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }),
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
