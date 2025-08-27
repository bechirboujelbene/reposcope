import type { Meta, StoryObj } from '@storybook/react';
import { Filters } from './Filters';

const meta: Meta<typeof Filters> = {
  title: 'Components/Filters',
  component: Filters,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Filters>;

const languages = ['All', 'HTML', 'CSS', 'JavaScript', 'TypeScript'];

export const Default: Story = {
  args: {
    nameQuery: '',
    onNameQueryChange: () => {},
    languages,
    language: 'All',
    onLanguageChange: () => {},
  },
};

export const WithQuery: Story = {
  args: {
    nameQuery: 'octo',
    onNameQueryChange: () => {},
    languages,
    language: 'TypeScript',
    onLanguageChange: () => {},
  },
};
