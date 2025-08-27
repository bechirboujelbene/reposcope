import { gql } from '@apollo/client';

export const USER_REPOSITORIES_QUERY = gql`
  query UserRepositories($login: String!, $first: Int = 50, $after: String) {
    user(login: $login) {
      id
      login
      avatarUrl
      url
      repositories(
        first: $first
        after: $after
        orderBy: { field: UPDATED_AT, direction: DESC }
        isFork: false
        isArchived: false
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          name
          description
          url
          stargazerCount
          updatedAt
          primaryLanguage { name }
        }
      }
    }
    rateLimit { remaining resetAt }
  }
`;
