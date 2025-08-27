export type RepoNode = {
  id: string;
  name: string;
  description?: string | null;
  url: string;
  stargazerCount: number;
  updatedAt: string;
  primaryLanguage?: { name: string } | null;
};

export type UserInfo = {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
};
