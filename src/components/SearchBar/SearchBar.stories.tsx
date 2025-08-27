import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Empty: Story = {
  args: {
    value: '',
    placeholder: 'Enter GitHub username...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'octocat',
    placeholder: 'Enter GitHub username...',
  },
};

export const WithSearchButton: Story = {
  args: {
    value: 'octocat',
    onSearch: () => alert('Search clicked'),
  },
};
