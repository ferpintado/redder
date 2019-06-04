import { FETCHING_POSTS, LOAD_POSTS, VALID_SUB, STORE_BEFORE_POSTS, LOAD_BEFORE_POSTS } from '../actions';

export const INITIAL_STATE = {
  after: null,
  before: null,
  beforePosts: [],
  posts: [],
  subExists: null,
  isFetching: false
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case LOAD_POSTS:
      let posts = action.payload.posts;
      if (action.payload.position === 'after'){
        posts = state.posts.concat(action.payload.posts)
      }

      return { 
        ...state,
        posts,
        after: action.payload.after,
        before: state.beforePosts.length === 0 && posts.length > 0 ? posts[0].data.name : state.before,
        beforePosts: action.payload.position === 'init'? [] : state.beforePosts,
        subExists: true
      };

    case STORE_BEFORE_POSTS:
      const beforePosts = action.payload.posts.concat(state.beforePosts);
      return { 
        ...state,
        beforePosts,
        before: beforePosts.length > 0 ? beforePosts[0].data.name : state.before
      };

    case LOAD_BEFORE_POSTS:
      const new_posts = state.beforePosts.concat(state.posts);
      return {
        ...state,
        posts: new_posts,
        beforePosts: [],
      }

    case FETCHING_POSTS:
      return { ...state,
        isFetching: action.payload.fetching 
      };

    case VALID_SUB:
      return { 
        ...state,
        subExists: action.payload.subExists
      };

    default:
      return state; 
  }
}
