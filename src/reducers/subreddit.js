import { FETCHING_POSTS, LOAD_POSTS, VALID_SUB, STORE_BEFORE_POSTS, LOAD_BEFORE_POSTS } from '../actions';

export const INITIAL_STATE = {
  after: null,
  before: null,
  before_posts: [],
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
        before: state.before_posts.length === 0 && posts.length > 0 ? posts[0].data.name : state.before,
        before_posts: action.payload.position === 'init'? [] : state.before_posts,
        subExists: true
      };

    case STORE_BEFORE_POSTS:
      const before_posts = action.payload.posts.concat(state.before_posts);
      return { 
        ...state,
        before_posts,
        before: before_posts.length > 0 ? before_posts[0].data.name : state.before
      };

    case LOAD_BEFORE_POSTS:
      const new_posts = state.before_posts.concat(state.posts);
      return {
        ...state,
        posts: new_posts,
        before_posts: [],
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
