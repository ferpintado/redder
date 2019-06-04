import configureStore from 'redux-mock-store'
import * as subActions from '../../actions/index.js';
import { redditResponse as response} from '../../mocks';
import { INITIAL_STATE } from '../../reducers'
import api from '../../api/subreddit';
import thunk from 'redux-thunk'

const middlewares = [thunk] 
const mockStore = configureStore(middlewares)

jest.mock('../../api/subreddit', () => {
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

describe('Actions Subreddit spec', () => {

  const store = mockStore(INITIAL_STATE)

  beforeEach(() => { 
    store.clearActions();
  })

  it('should dispatch subExists', () => {
    store.dispatch(subActions.subExists(true))
    const actions = store.getActions()
    const expectedPayload = {
      type: subActions.VALID_SUB,
      payload: {
        subExists: true
      }
    }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch isFetchingPosts', () => {
    store.dispatch(subActions.isFetchingPosts(true))
    const actions = store.getActions()
    const expectedPayload = {
      type: subActions.FETCHING_POSTS,
      payload: {
        fetching: true
      }
    }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch init loadPosts', () => {
    store.dispatch(subActions.loadPosts(response, {}))
    const actions = store.getActions()
    const expectedPayload = {
      type: subActions.LOAD_POSTS,
      payload: {
        posts: response.data.data.children,
        after: 'test',
        position: 'init'
      }
    }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch after loadPosts', () => {
    store.dispatch(subActions.loadPosts(response, {after: 'test'}))
    const actions = store.getActions()
    const expectedPayload = {
      type: subActions.LOAD_POSTS,
      payload: {
        posts: response.data.data.children,
        after: 'test',
        position: 'after'
      }
    }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch storeBeforePosts', () => {
    store.dispatch(subActions.storeBeforePosts(response, {after: 'test'}))
    const actions = store.getActions()
    const expectedPayload = {
      type: subActions.STORE_BEFORE_POSTS,
      payload: {
        posts: response.data.data.children
      }
    }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch getPosts', async () => {
    await store.dispatch(subActions.getPosts('vancouver', {}))
    const getPostsSpy = jest.spyOn(api, 'getPosts');
    const actions = store.getActions()
    const expectedPayload = [
      {
        type: subActions.FETCHING_POSTS,
        payload: {
          fetching: true
        }
      },
      {
        type: subActions.LOAD_POSTS,
        payload: {
          posts: response.data.data.children,
          after: 'test',
          position: 'init'
        }
      },
      {
        type: subActions.VALID_SUB,
        payload: {
          subExists: true
        }
      },
      {
        type: subActions.FETCHING_POSTS,
        payload: {
          fetching: false
        }
      }
    ]
    expect(getPostsSpy).toHaveBeenCalled();
    expect(actions).toEqual(expectedPayload)
  })

  it('should dispatch getBeforePosts', async () => {
    await store.dispatch(subActions.getBeforePosts('vancouver', {}))
    const actions = store.getActions()
    const expectedPayload = {
      type: subActions.STORE_BEFORE_POSTS,
      payload: {
        posts: response.data.data.children
      }
    }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch appendBeforePosts', () => {
    store.dispatch(subActions.appendBeforePosts());
    const actions = store.getActions()
    const expectedPayload = {
      type: subActions.LOAD_BEFORE_POSTS
    }
    expect(actions).toEqual([expectedPayload])
  })
});