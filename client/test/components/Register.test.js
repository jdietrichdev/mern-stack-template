import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../src/components/Register';
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
      <Register setUser={mockSetUser}/>
    </MemoryRouter>
  );
});

it('should render register', () => {
  expect(screen.queryByTestId('register')).toBeInTheDocument();
});

it('should update values on register', async () => {
  updateInput('Username', 'admin');
  updateInput('Email', 'admin@gmail.com');
  updateInput('Password', 'admin');
  updateInput('Repeat Password', 'admin');
  fireEvent.click(screen.getByText('Create Account'));

  await waitFor(() => {
    expect(mockAxios.post).toHaveBeenCalledWith(
      '/api/auth/createUser',
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin'
      }
    );
  });
});

it('should show password error when passwords are not the same', async () => {
  updateInput('Username', 'admin');
  updateInput('Email', 'admin@gmail.com');
  updateInput('Password', 'admin');
  updateInput('Repeat Password', 'admin1');
  fireEvent.click(screen.getByText('Create Account'));

  await waitFor(() => {
    expect(screen.queryByText('Passwords do not match')).toBeInTheDocument();
  });
});

it('should show user error when username already exists', async () => {
  mockAxios.post = jest.fn();
  mockAxios.post.mockResolvedValueOnce('failed');

  updateInput('Username', 'admin');
  updateInput('Email', 'admin@gmail.com');
  updateInput('Password', 'admin');
  updateInput('Repeat Password', 'admin');
  fireEvent.click(screen.getByText('Create Account'));

  await waitFor(() => {
    expect(screen.queryByText('User already exists with that username')).toBeInTheDocument();
  })
})

function updateInput(label, value) {
  fireEvent.change(screen.getByLabelText(label), {
    target: { value }
  });
}