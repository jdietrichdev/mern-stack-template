import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Header';
import { ROUTES } from '../../src/utility/constants';
import mockAxios from 'axios';

jest.mock('axios');
const mockUser = { username: 'admin', email: 'admin@gmail.com' };
const mockSetUser = jest.fn();

beforeEach(() => {
  render(
    <MemoryRouter>
      <Header user={''} setUser={mockSetUser} />
    </MemoryRouter>
  )
});

it('should render site title with link to Home page', () => {
  expect(screen.queryByText('Website Title')).toBeInTheDocument();
  expect(screen.getByText('Website Title')).toHaveAttribute('href', ROUTES.HOME);
});

it('should render Register with link to Register page', () => {
  expect(screen.queryByText('Register')).toBeInTheDocument();
  expect(screen.getByText('Register')).toHaveAttribute('href', ROUTES.REGISTER);
});

it('should render Login with link to Login page', () => {
  expect(screen.queryByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Login')).toHaveAttribute('href', ROUTES.LOGIN);
});

it('should display username in header when user exists', () => {
  cleanup();
  render(
    <MemoryRouter>
      <Header user={mockUser} setUser={mockSetUser} />
    </MemoryRouter>
  );

  expect(screen.queryByText('admin')).toBeInTheDocument();
});

it('should remove user when logout is cleared', async () => {
  mockAxios.get = jest.fn();
  mockAxios.get.mockResolvedValueOnce('logout');
  cleanup();
  render(
    <MemoryRouter>
      <Header user={mockUser} setUser={mockSetUser} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('admin'));
  fireEvent.click(screen.getByText('Logout'));

  await waitFor(() => {
    expect(mockSetUser).toHaveBeenCalledWith();
    expect(mockAxios.get).toHaveBeenCalledWith('/api/auth/logout');
  })
})