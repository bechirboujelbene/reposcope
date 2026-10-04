import { useMemo, useState } from 'react';
import { Github, Search, BookOpen } from 'lucide-react';
import { Filters } from '../../components/Filters/Filters';
import { RepoList } from '../../components/RepoList/RepoList';
import { UserHeader } from '../../components/UserHeader/UserHeader';
import { useUserRepos } from '../../features/github/hooks/useUserRepos';
import { deriveLanguages, filterRepos } from '../../features/github/utils/filter';
import { useDebounce } from '../../hooks/useDebounce';

/**
 * Main page for exploring GitHub repositories
 */
export default function HomePage() {
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [language, setLanguage] = useState('All');

  // Debounce search (timer = 500 ms) to avoid excessive API calls when typing username
  const debouncedUsername = useDebounce(searchTerm, 500);

  const { data, loading, error, loadMore, hasNextPage, isLoadingMore } = useUserRepos({ login: debouncedUsername });
  const user = data?.user;
  const repos = user?.repositories?.nodes ?? [];
  const totalCount = user?.repositories?.totalCount ?? 0;

  const languages = useMemo(() => deriveLanguages(repos), [repos]);
  const filtered = useMemo(() => filterRepos(repos, nameQuery, language), [repos, nameQuery, language]);

  const handleSearch = () => {
    setSearchTerm(username);
  };

  const hasSearched = !!debouncedUsername;
  const hasResults = user && repos.length > 0;

  // error handling
  const getErrorMessage = (error: any) => {
    if (error?.message?.includes('403')) {
      return 'API rate limit exceeded. Please add a GitHub token to continue.';
    }
    if (error?.message?.includes('Could not resolve to a User')) {
      return `User "${debouncedUsername}" not found. Please check the username and try again.`;
    }
    return error?.message || 'Something went wrong. Please try again.';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-300">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center h-14">
            <Github className="w-6 h-6 text-gray-900 mr-2" />
            <h1 className="text-lg font-semibold text-gray-900">RepoScope</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4">
        {/* Search Section */}
        <section className="py-8 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Explore anyone's GitHub repositories</h1>
            <p className="text-sm text-gray-600 mb-5">Enter a GitHub username to explore their repositories</p>
            
            <div className="space-y-3">
              <div className="text-left">
                <label htmlFor="github-username" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Username
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      id="github-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="e.g. octocat"
                      className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    <Search className="w-4 h-4 mr-1.5 inline" />
                    Search Repositories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {hasSearched && (
          <section className="pb-6">
            {/* User Header */}
            {hasResults && (
              <UserHeader user={user} repositoryCount={totalCount} />
            )}

            {/* Filters */}
            {hasResults && (
              <Filters
                nameQuery={nameQuery}
                onNameQueryChange={setNameQuery}
                languages={languages}
                language={language}
                onLanguageChange={setLanguage}
              />
            )}

            {/* Content */}
            <div className="mt-4">
              {/* Loading State */}
              {loading && <RepoList repos={[]} loading={true} />}
              
              {/* Error State */}
              {error && (
                <div className="bg-white border border-red-200 rounded-lg p-5 text-center">
                  <div className="w-8 h-8 mx-auto text-red-500 mb-2">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Error</h3>
                  <p className="text-red-600 text-sm mb-3">{getErrorMessage(error)}</p>
                  {error?.message?.includes('403') && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-left max-w-lg mx-auto">
                      <h4 className="text-sm font-medium text-yellow-800 mb-2">How to add a GitHub token:</h4>
                      <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                        <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">GitHub Settings → Tokens</a></li>
                        <li>Create a new token with 'public_repo' scope</li>
                        <li>Create a file called <code className="bg-yellow-100 px-1 rounded">.env.local</code> in the project root</li>
                        <li>Add: <code className="bg-yellow-100 px-1 rounded">VITE_GITHUB_TOKEN=your_token_here</code></li>
                        <li>Restart the development server</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}
              
              {/* Success State */}
              {!loading && !error && hasResults && (
                <>
                  <RepoList repos={filtered} />
                  
                  {/* Load More Button */}
                  {hasNextPage && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          loadMore();
                        }}
                        disabled={isLoadingMore}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoadingMore ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                            Loading more repositories...
                          </div>
                        ) : (
                          'Load more repositories'
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
              
              {/* User has zero repositories */}
              {!loading && !error && hasSearched && user && repos.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
                    <BookOpen className="w-16 h-16" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No repositories found</h3>
                  <p className="text-gray-600">This user doesn't have any repositories.</p>
                </div>
              )}
              
              {/* No User Found */}
              {!loading && !error && hasSearched && !user && (
                <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
                  
                  <h3 className="text-sm font-medium text-gray-900 mb-1">User not found</h3>
                  <p className="text-gray-500 text-sm">
                    No user found with username "{debouncedUsername}". Please check the spelling and try again.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
