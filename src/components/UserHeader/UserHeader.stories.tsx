import type { Meta, StoryObj } from '@storybook/react';
import { UserHeader } from './UserHeader';
import type { UserInfo } from '../../features/github/types';

const meta: Meta<typeof UserHeader> = {
  title: 'Components/UserHeader',
  component: UserHeader,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof UserHeader>;

const user: UserInfo = {
  id: 'u1',
  login: 'octocat',
  avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
  url: 'https://github.com/octocat',
};

export const Default: Story = {
  args: {
    user,
    repositoryCount: 195,
  },
};
