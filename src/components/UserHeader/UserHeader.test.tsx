import { render, screen } from '@testing-library/react';
import { UserHeader } from './UserHeader';

const mockUser = {
  id: '1',
  login: 'octocat',
  avatarUrl: 'https://github.com/images/error/octocat_happy.gif',
  url: 'https://github.com/octocat',
};

describe('UserHeader', () => {
  test('renders user information', () => {
    render(<UserHeader user={mockUser} repositoryCount={8} />);
    
    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.getByText('8 repositories')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /octocat/i })).toBeInTheDocument();
  });
});
