import React from 'react';
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Link } from 'react-router-dom';
import Login from '../../src/components/Login';
import mockAxios from 'axios';

jest.mock('axios');
const mockSetUser = jest.fn();

beforeEach(() => {
  mockAxios.post = jest.fn();
  mockAxios.post.mockResolvedValueOnce({ 
    data: { value: 'value' }
  });
  render(
    <MemoryRouter>
      <Login setUser={mockSetUser}/>
    </MemoryRouter>
  );
});

it('should render login', () => {
  expect(screen.queryByTestId('login')).toBeInTheDocument();
})

it('should update values on login', async () => {
  updateInput('Username', 'admin');
  updateInput('Password', 'admin');
  fireEvent.click(screen.getByText('Sign in'));

  await waitFor(() => {
    expect(mockAxios.post).toHaveBeenCalledWith(
      '/api/auth/authenticate', 
      { username: 'admin', password: 'admin' });
  });
});

it('should show user error when login fails', async () => {
  mockAxios.post = jest.fn();
  mockAxios.post.mockResolvedValueOnce('failed');
  fireEvent.click(screen.getByText('Sign in'));

  await waitFor(() => {
    expect(screen.queryByText('No user found or incorrect password')).toBeInTheDocument();
  });
});

it('should set user when login is successful', async () => {
  fireEvent.click(screen.getByText('Sign in'));

  await waitFor(() => {
    expect(mockSetUser).toHaveBeenCalledWith({ value: 'value' });
  });
});

it('should route to register page when "Create an account" is clicked', async () => {
  expect(screen.getByText('Create an account')).toHaveAttribute('href', '/register');
});

function updateInput(label, value) {
  fireEvent.change(screen.getByLabelText(label), {
    target: { value }
  });
}