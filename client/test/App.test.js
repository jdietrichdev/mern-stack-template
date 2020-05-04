import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import mockAxios from 'axios';

jest.mock('axios');

beforeEach(() => {
  mockAxios.get.mockResolvedValueOnce({ username: 'admin' });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

it('should call checkToken', async () => {
  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalled();
  });
});

it('should render the header', () => {
  expect(screen.queryByTestId('header')).toBeInTheDocument();
});