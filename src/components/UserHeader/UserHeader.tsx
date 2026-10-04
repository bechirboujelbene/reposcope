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
    <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <img
        src={user.avatarUrl}
        alt={`${user.login}'s avatar`}
        className="w-16 h-16 rounded-full border border-gray-200 dark:border-gray-800"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{user.login}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {repositoryCount} {repositoryCount === 1 ? 'repository' : 'repositories'}
        </p>
        <a
          href={user.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
