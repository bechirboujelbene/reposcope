import type { Meta, StoryObj } from '@storybook/react';
import { RepoList } from './RepoList';
import type { RepoNode } from '../../features/github/types';

const meta: Meta<typeof RepoList> = {
  title: 'Components/RepoList/RepoList',
  component: RepoList,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof RepoList>;

const repos: RepoNode[] = [
  {
    id: '1',
    name: 'octocat.github.io',
    description: 'Personal website',
    url: 'https://github.com/octocat/octocat.github.io',
    stargazerCount: 888,
    updatedAt: new Date().toISOString(),
    primaryLanguage: { name: 'CSS' },
  },
  {
    id: '2',
    name: 'Spoon-Knife',
    description: 'This repo is for demonstration purposes only.',
    url: 'https://github.com/octocat/Spoon-Knife',
    stargazerCount: 13199,
    updatedAt: new Date().toISOString(),
    primaryLanguage: { name: 'HTML' },
  },
];

export const Default: Story = {
  args: { repos },
};

export const Loading: Story = {
  args: { repos: [], loading: true },
};

export const Empty: Story = {
  args: { repos: [] },
};
