import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import rootReducer from '../reducers'
import { INITIAL_STATE } from '../reducers/subreddit';
import SubReddit from './SubReddit';
import api from '../api/subreddit';



jest.mock('../api/subreddit', () => {
  return {
    getPosts: jest.fn((subreddit, params) =>
      Promise.resolve({
        data: {
          data: {
            after: "test",
            before: "test2",
            children: [{
              data: {
                title: `This is the title`,
                name: 'test_post',
                author: `Author`,
                num_comments: "5",
                permalink: '/r/permalink',
                created_utc: 1559529564,
                thumbnail: '/test.jpg'
              }
            }]
          }
        }
      }),
    ),
  }
})

const SUBREDDIT_URL = 'vancouver';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

function renderComponent(
  ui,
  currentState = {},
  {route = `/r/${SUBREDDIT_URL}`, history = createMemoryHistory({initialEntries: [route]})} = {}
) {

  return {
    ...render(
        <Provider store={store}>
          <Router history={history}>
              {ui}
          </Router>
        </Provider>
    ),
    history,
  }
}

describe('<SubReddit /> spec', () => {
  const { getByTestId } = renderComponent(<SubReddit/>);

  test('it should get posts', async () => {
    const getPostsSpy = jest.spyOn(api, 'getPosts');
    expect(getPostsSpy).toHaveBeenCalled();
    await waitForElement(() => getByTestId("load-more"));
    expect(getByTestId("test_post")).toBeTruthy();
  });

  test('it should get new posts', () => {
    const getPostsSpy = jest.spyOn(api, 'getPosts');
    const loadMore = getByTestId("load-more");
    expect(loadMore).toBeTruthy();
    fireEvent.click(loadMore);
    expect(getPostsSpy).toHaveBeenCalledTimes(2);
  });
});