import type { UserInfo } from '../../features/github/types';

interface UserHeaderProps {
  user: UserInfo;
  repositoryCount: number;
}

/**
 * Displays user profile information with avatar, username, and repository count
 */
export function UserHeader({ user, repositoryCount }: UserHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white border-b border-gray-200">
      <img
        src={user.avatarUrl}
        alt={`${user.login}'s avatar`}
        className="w-16 h-16 rounded-full border border-gray-200"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900">{user.login}</h2>
        <p className="text-gray-600">
          {repositoryCount} {repositoryCount === 1 ? 'repository' : 'repositories'}
        </p>
        <a
          href={user.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
