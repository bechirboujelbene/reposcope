import type { RepoNode } from '../../features/github/types';
import { RepoListItem } from './RepoListItem';
import { BookOpen } from 'lucide-react';

interface RepoListProps {
  repos: RepoNode[];
  loading?: boolean;
}

/**
 * List of repositories with proper empty states
 */
export function RepoList({ repos, loading }: RepoListProps) {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b border-gray-200 py-6 last:border-b-0">
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="flex gap-4">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!repos.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
          <BookOpen className="w-16 h-16" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No repositories found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {repos.map((repo, index) => (
        <div key={repo.id} className={index === repos.length - 1 ? "" : ""}>
          <RepoListItem repo={repo} />
        </div>
      ))}
    </div>
  );
}
