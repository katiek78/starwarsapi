import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import App from './App';

const server = setupServer(
  rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {

    return res(ctx.json({
        "results": [
          {
            name: 'Luke Skywalker'
          }
        ]
    }));
  }));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Luke Skywalker', async () => {
  render(<App />);
  expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
});

test('returns error message if status 500 received', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
    return res.once(
      ctx.status(500),
      ctx.json({ message: "Internal server error"})
    );
  }));
  render(<App />);
  expect(await screen.findByText(/Oops... something went wrong, try again 🤕/i)).toBeInTheDocument();
});

test('returns error message if status 418 received', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
    return res.once(
      ctx.status(418),
      ctx.json({ message: "I'm a tea pot"})
    );
  }));
  render(<App />);
  expect(await screen.findByText(/418 I'm a tea pot, silly/i)).toBeInTheDocument();
});