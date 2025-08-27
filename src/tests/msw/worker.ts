import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Export a single worker instance for browser tests (Vitest browser project, Storybook tests)
export const worker = setupWorker(...handlers);
