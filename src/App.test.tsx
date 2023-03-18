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