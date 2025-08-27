import '@testing-library/jest-dom';
import { server } from './msw/server';

// Setup MSW for API mocking
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
