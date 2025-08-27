import type { Meta, StoryObj } from '@storybook/react';
import { RepoListItem } from './RepoListItem';
import type { RepoNode } from '../../features/github/types';

const meta: Meta<typeof RepoListItem> = {
  title: 'Components/RepoList/RepoListItem',
  component: RepoListItem,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof RepoListItem>;

const repoBase: RepoNode = {
  id: '1',
  name: 'octocat.github.io',
  description: 'Personal website',
  url: 'https://github.com/octocat/octocat.github.io',
  stargazerCount: 888,
  updatedAt: new Date().toISOString(),
  primaryLanguage: { name: 'CSS' },
};

export const Default: Story = {
  args: {
    repo: repoBase,
  },
};

export const NoDescription: Story = {
  args: {
    repo: { ...repoBase, description: null },
  },
};

export const DifferentLanguage: Story = {
  args: {
    repo: { ...repoBase, primaryLanguage: { name: 'TypeScript' } },
  },
};
