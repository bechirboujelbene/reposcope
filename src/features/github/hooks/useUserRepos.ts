import { useQuery } from '@apollo/client/react';
import { USER_REPOSITORIES_QUERY } from '../api/queries';
import type { RepoNode, UserInfo } from '../types';

export interface UseUserReposParams {
  login: string;
  first?: number;
}

/**
 * GraphQL response type for user repositories query
 */
export interface UserRepositoriesData {
  user: (UserInfo & {
    repositories: {
      totalCount: number;
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: RepoNode[];
    };
  }) | null;
  rateLimit: { remaining: number; resetAt: string };
}

export interface UserRepositoriesVars {
  login: string;
  first?: number;
  after?: string | null;
}

/**
 * Custom hook to fetch GitHub user repositories using GraphQL with pagination support
 * @param params - Parameters including login and pagination options
 * @returns Apollo query result with typed data and fetchMore function
 */
export function useUserRepos({ login, first = 30 }: UseUserReposParams) {
  const skip = !login.trim();
  const query = useQuery<UserRepositoriesData, UserRepositoriesVars>(USER_REPOSITORIES_QUERY, {
    variables: { login, first },
    skip,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = async () => {
    const { data, fetchMore } = query;
    if (!data?.user?.repositories?.pageInfo?.hasNextPage || !fetchMore) {
      return;
    }

    
    const currentScrollY = window.scrollY;
    
    const endCursor = data.user.repositories.pageInfo.endCursor;
    
    const result = await fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.user?.repositories) {
          return prevResult;
        }

        return {
          ...prevResult,
          user: {
            ...prevResult.user!,
            repositories: {
              ...prevResult.user!.repositories,
              pageInfo: fetchMoreResult.user.repositories.pageInfo,
              nodes: [
                ...prevResult.user!.repositories.nodes,
                ...fetchMoreResult.user.repositories.nodes,
              ],
            },
          },
        };
      },
    });

    
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 100);

    return result;
  };

  const hasNextPage = query.data?.user?.repositories?.pageInfo?.hasNextPage ?? false;
  const isLoadingMore = query.networkStatus === 3; // NetworkStatus.fetchMore

  return {
    ...query,
    loadMore,
    hasNextPage,
    isLoadingMore,
  };
}
