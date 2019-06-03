import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import {withRouter} from 'react-router'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import SearchBar from './SearchBar'

const LocationDisplay = withRouter(({location}) => (
  <div data-testid="location-display">{location.pathname}</div>
))

function renderWithRouter(
  ui,
  {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
) {
  return {
    ...render(
      <Router history={history}>
        {ui}
        <LocationDisplay/>
      </Router>
    ),
    history,
  }
}

describe('<SearchBar /> spec', () => {
  const { getByTestId } = renderWithRouter(<SearchBar/>);

  test('it should render input', () => {
    expect(getByTestId('search-input')).toBeTruthy();
  });

  test('it should enter value and show clear button', () => {
    const input = getByTestId('search-input');
    const query = "vancouver";
    fireEvent.change(input, {target : {value : query}})
    expect(getByTestId('search-clear')).toBeTruthy();
    expect(getByTestId('search-input').value).toEqual(query);
  });

  test('it should clear input', () => {
    const input = getByTestId('search-input');
    const query = "vancouver";
    fireEvent.change(input, {target : {value : query}})
    fireEvent.click(getByTestId('search-clear'))
    expect(getByTestId('search-input').value).toEqual('');
  });

  test('it should navigate to subreddit route', async () => {
    const input = getByTestId('search-input');
    const query = "vancouver";
    fireEvent.change(input, {target : {value : query}})
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    expect(getByTestId('location-display').textContent).toMatch('/r/vancouver')  
  });
});