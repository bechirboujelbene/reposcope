import { useMemo } from 'react';
import { Github } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
}

/**
 * search input component for entering usernames
 */
export function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Enter GitHub username...', 
  onSearch 
}: SearchBarProps) {
  const id = useMemo(() => 'search-user-' + Math.random().toString(36).slice(2), []);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* GitHub Logo */}
          <Github className="h-4 w-4 text-gray-400" />
        </div>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        />
      </div>
      {/* Search repositories button */}
      {onSearch && (
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
        >
          Search Repositories
        </button>
      )}
    </div>
  );
}
