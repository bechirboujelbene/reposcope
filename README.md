# RepoScope

Get a quick overview of anyone's open-source work: search a GitHub user, then browse and filter their repositories by language and name. Built with React, TypeScript, Apollo Client (GitHub GraphQL API) and Tailwind CSS, with component tests in Vitest.

## Features

- **Search GitHub users** by username with debounced input
- **Browse repositories** with pagination and filtering
- **Filter by language** and repository name
- **Error handling** for API limits and invalid users
- **Loading states** and empty state management

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Apollo Client** for GraphQL API integration
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vitest** for testing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation



1. Install dependencies:
```bash
npm install
```

2. Add GitHub token for dealing with API limits:
```bash
cp .env.example .env.local
# Edit .env.local and add your GitHub token
```

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build


```

The app will be available at `http://localhost:5173`

## Development Tools


### Testing
```bash
# Run tests once
npm test


```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Filters/        # Repository filtering controls
│   ├── RepoList/       # Repository list and items
│   ├── SearchBar/      # Username search input
│   └── UserHeader/     # User profile display
├── features/           # Feature-specific code
│   └── github/         # GitHub API integration
├── hooks/              # Custom React hooks
├── pages/              # Page components
└── tests/              # Test setup and mocks
```

## Future Improvements or Features

- **Authentication**: Full GitHub OAuth integration for private repos
- **Advanced Filtering**: Date ranges, repository size, topics
- **Repository Details**: Individual repository pages with README, issues, PRs
- **Favorites**: Save and organize favorite repositories
- **Dark Mode**: Theme switching capability
- **Export**: Export repository lists to various formats
