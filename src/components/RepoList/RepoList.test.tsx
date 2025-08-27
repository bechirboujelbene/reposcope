import { render, screen } from '@testing-library/react';
import { RepoList } from './RepoList';

const mockRepos = [
  {
    id: '1',
    name: 'test-repo',
    description: 'A test repository',
    url: 'https://github.com/octocat/test-repo',
    stargazerCount: 123,
    updatedAt: '2023-01-01T00:00:00Z',
    primaryLanguage: { name: 'TypeScript' },
  },
];

describe('RepoList', () => {
  test('renders empty state when no repositories', () => {
    render(<RepoList repos={[]} />);
    expect(screen.getByText('No repositories found')).toBeInTheDocument();
  });

  test('renders repository list when repositories provided', () => {
    render(<RepoList repos={mockRepos} />);
    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
  });
});
