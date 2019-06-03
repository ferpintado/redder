import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import rootReducer from '../reducers'
import { INITIAL_STATE } from '../reducers/subreddit';
import PostList from './PostList';

const SUBREDDIT = 'vancouver';

const createPosts = (num) => {
  let children = [];
  for (let i=0; i < num; i++){
    const fakeId = Math.floor(Math.random() * Math.floor(1000))
    children.push(
      {
        data: {
          title: `This is the title ${fakeId}`,
          author: `Author${fakeId}`,
          num_comments: "5",
          permalink: '/r/permalink',
          created_utc: 1559529564,
          thumbnail: '/test.jpg'
        }
      }
    )
  }
  return children;
};

const store = (overrideInitial) => {
  return createStore(
    rootReducer,
    { 
      subreddit: {
        ...INITIAL_STATE, ...overrideInitial
      }
    },
    applyMiddleware(thunk)
  );
};

function renderComponent(
  ui,
  currentState = {},
  {route = `/r/${SUBREDDIT}`, history = createMemoryHistory({initialEntries: [route]})} = {}
) {

  return {
    ...render(
        <Provider store={store(currentState)}>
          <Router history={history}>
              {ui}
          </Router>
        </Provider>
    ),
    history,
  }
}

describe('<PostList /> spec', () => {

  test('it should render loading animation', () => {
    const { getByTestId } = renderComponent(<PostList/>,
      {
        isFetching: true
      });
    expect(getByTestId('loading-posts')).toBeTruthy();
  });

  test('it should render children posts', () => {  
    const { container, getByTestId } = renderComponent(<PostList/> ,
      { 
        posts: createPosts(5),
        after: 'test'
      }
    );
    expect(container.firstChild.classList.contains('card')).toBe(true);
    expect(container.getElementsByClassName('card').length).toBe(5);    
    expect(getByTestId('load-more')).toBeTruthy();
  });

  test('it should render no posts', () => {
    const { getByTestId } = renderComponent(<PostList/>);
    expect(getByTestId('no-posts')).toBeTruthy();
  });

  test('it should load before posts', () => {  
    const { getByTestId, container } = renderComponent(<PostList/> ,
      { 
        posts: createPosts(5),
        before_posts: createPosts(5),
      }
    );
    const loadBefore = getByTestId('load-before');
    expect(loadBefore).toBeTruthy();
    expect(loadBefore.textContent).toBe("5 new posts. Click to load.")
    fireEvent.click(loadBefore)
    expect(container.getElementsByClassName('card').length).toBe(10);   
  });
});