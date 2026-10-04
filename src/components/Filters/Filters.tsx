interface FiltersProps {
  nameQuery: string;
  onNameQueryChange: (value: string) => void;
  languages: string[]; // includes 'All'
  language: string;
  onLanguageChange: (value: string) => void;
}

/**
 * Filter controls for repository name and programming language
 */
export function Filters({ 
  nameQuery, 
  onNameQueryChange, 
  languages, 
  language, 
  onLanguageChange 
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex-1">
        <input
          type="text"
          value={nameQuery}
          onChange={(e) => onNameQueryChange(e.target.value)}
          placeholder="Find a repository..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="sm:w-48">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang === 'All' ? 'Language: All' : lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
