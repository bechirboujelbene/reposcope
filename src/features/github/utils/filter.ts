import type { RepoNode } from '../types';

export function filterRepos(repos: RepoNode[], nameQuery: string, language: string) {
  const q = nameQuery.trim().toLowerCase();
  const lang = language.trim();
  return repos.filter((r) => {
    const byName = q ? r.name.toLowerCase().includes(q) : true;
    const byLang = lang && lang !== 'All' ? (r.primaryLanguage?.name === lang) : true;
    return byName && byLang;
  });
}

export function deriveLanguages(repos: RepoNode[]): string[] {
  const set = new Set<string>();
  repos.forEach((r) => {
    const n = r.primaryLanguage?.name;
    if (n) set.add(n);
  });
  return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}
