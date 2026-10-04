import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider as Provider } from '@apollo/client/react';

// Locally a personal token from .env.local calls GitHub directly.
// Without one, requests go through the /api/github function, which holds the token on the server.
const token = import.meta.env.VITE_GITHUB_TOKEN

const client = new ApolloClient({
  link: new HttpLink(
    token
      ? { uri: 'https://api.github.com/graphql', headers: { Authorization: `Bearer ${token}` } }
      : { uri: '/api/github' }
  ),
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
