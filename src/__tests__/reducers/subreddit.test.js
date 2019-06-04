import subredditReducer, { INITIAL_STATE } from '../../reducers/subreddit';
import * as subActions from '../../actions/index';
import { redditResponse as response } from '../../mocks';

describe('Subreddit Reducer spec', () => {
  test('INITIAL STATE', () => {
    const action = { type: 'dummy_action' };
    expect(subredditReducer(undefined, action)).toEqual(INITIAL_STATE);
  });

  test('LOAD_POSTS', () => {
    const action = {
      type: subActions.LOAD_POSTS,
      payload: {
        posts: response.data.data.children,
        after: 'test',
        position: 'after'
      }
    };
    const expectedState = { 
      ...INITIAL_STATE,
      posts: response.data.data.children,
      after: 'test',
      before: 'test_post',
      beforePosts: [],
      subExists: true
    }
    expect(subredditReducer(undefined, action)).toEqual(expectedState);
  });

  test('STORE_BEFORE_POSTS', () => {
    const action = {
      type: subActions.STORE_BEFORE_POSTS,
      payload: {
        posts: response.data.data.children,
      }
    };
    const expectedState = { 
      ...INITIAL_STATE,
      beforePosts: response.data.data.children,
      before: response.data.data.children[0].data.name
    }
    expect(subredditReducer(undefined, action)).toEqual(expectedState);
  });

  test('LOAD_BEFORE_POSTS', () => {
    const beforeAction = {
      type: subActions.STORE_BEFORE_POSTS,
      payload: {
        posts: response.data.data.children,
      }
    };
    const beforeState = subredditReducer(undefined, beforeAction)

    const action = {
      type: subActions.LOAD_BEFORE_POSTS
    };
    const expectedState = { 
      ...beforeState,
      beforePosts: [],
      before: "test_post",
      posts: [response.data.data.children[0]]
    }
    expect(subredditReducer(beforeState, action)).toEqual(expectedState);
  });

  test('FETCHING_POSTS', () => {
    const action = {
      type: subActions.FETCHING_POSTS,
      payload: {
        fetching: true,
      }
    };
    const expectedState = { 
      ...INITIAL_STATE,
      isFetching: true,
    }
    expect(subredditReducer(undefined, action)).toEqual(expectedState);
  });

  test('VALID_SUB', () => {
    const action = {
      type: subActions.VALID_SUB,
      payload: {
        subExists: true,
      }
    };
    const expectedState = { 
      ...INITIAL_STATE,
      subExists: true,
    }
    expect(subredditReducer(undefined, action)).toEqual(expectedState);
  });
});