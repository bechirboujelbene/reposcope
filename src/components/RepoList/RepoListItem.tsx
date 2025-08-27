import type { RepoNode } from '../../features/github/types';
import { BookOpen, Star } from 'lucide-react';

interface RepoListItemProps {
  repo: RepoNode;
}

/**
 * Individual repository item displaying name, description, language, stars, and last update
 */
export function RepoListItem({ repo }: RepoListItemProps) {
  const languageColors: Record<string, string> = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-500',
    Python: 'bg-blue-600',
    Java: 'bg-orange-500',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-600',
    HTML: 'bg-orange-400',
    CSS: 'bg-purple-500',
    PHP: 'bg-indigo-500',
    Ruby: 'bg-red-500',
    'C++': 'bg-blue-700',
    C: 'bg-gray-600',
    Swift: 'bg-orange-500',
    Kotlin: 'bg-purple-600',
    Dart: 'bg-blue-400',
  };

  const getLanguageColor = (language: string) => 
    languageColors[language] || 'bg-gray-400';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="border-b border-gray-200 py-6 px-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {/* Repository icon */}
            <BookOpen className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <a 
              href={repo.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg hover:underline transition-colors duration-150"
            >
              {repo.name}
            </a>
          </div>
          
          {repo.description && (
            <p className="text-gray-700 mt-3 text-sm leading-relaxed ml-7">{repo.description}</p>
          )}
          
          <div className="flex items-center gap-6 mt-4 ml-7">
            {repo.primaryLanguage?.name && (
              <div className="inline-flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${getLanguageColor(repo.primaryLanguage.name)}`} />
                <span className="text-sm text-gray-700">{repo.primaryLanguage.name}</span>
              </div>
            )}
            <div className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{repo.stargazerCount}</span>
            </div>
            <span className="text-sm text-gray-500">Updated {formatDate(repo.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
