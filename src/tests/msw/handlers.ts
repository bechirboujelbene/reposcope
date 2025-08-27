import { graphql, HttpResponse } from 'msw';

const mockUserData = {
  user: {
    id: 'user-1',
    login: 'octocat',
    avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
    url: 'https://github.com/octocat',
    repositories: {
      totalCount: 3,
      pageInfo: { hasNextPage: false, endCursor: null },
      nodes: [
        {
          id: 'repo-1',
          name: 'Hello-World',
          description: 'My first repository on GitHub!',
          url: 'https://github.com/octocat/Hello-World',
          stargazerCount: 1234,
          updatedAt: '2023-01-15T12:00:00Z',
          primaryLanguage: { name: 'JavaScript' },
        },
        {
          id: 'repo-2',
          name: 'test-repo',
          description: null,
          url: 'https://github.com/octocat/test-repo',
          stargazerCount: 5,
          updatedAt: '2023-02-10T08:30:00Z',
          primaryLanguage: { name: 'TypeScript' },
        },
        {
          id: 'repo-3',
          name: 'awesome-project',
          description: 'An awesome project built with React',
          url: 'https://github.com/octocat/awesome-project',
          stargazerCount: 456,
          updatedAt: '2023-03-01T16:45:00Z',
          primaryLanguage: { name: 'TypeScript' },
        },
      ],
    },
  },
  rateLimit: { remaining: 4999, resetAt: '2023-12-31T23:59:59Z' },
};

export const handlers = [
  // Mock successful user repositories query
  graphql.query('UserRepositories', ({ variables }) => {
    const { login } = variables as { login: string };
    
    if (login === 'octocat') {
      return HttpResponse.json({ data: mockUserData });
    }
    
    if (login === 'nonexistentuser') {
      return HttpResponse.json({
        data: { user: null },
        errors: [{ message: 'Could not resolve to a User with the login of "nonexistentuser".' }],
      });
    }
    
    // Default mock for any other username
    return HttpResponse.json({
      data: {
        ...mockUserData,
        user: { ...mockUserData.user, login },
      },
    });
  }),
];
