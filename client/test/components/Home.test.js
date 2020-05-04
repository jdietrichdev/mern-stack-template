import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../src/components/Home';
import { ROUTES } from '../../src/utility/constants';

const mockUser = {username: 'admin'};

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={[ROUTES.HOME]} >
      <Home user={mockUser} />
    </MemoryRouter>
  );
});

it('should render the Home page', () => {
  expect(screen.queryByTestId('home')).toBeInTheDocument();
});

it('should display "Hello World!"', () => {
  expect(screen.queryByText('Hello World!')).toBeInTheDocument();
})