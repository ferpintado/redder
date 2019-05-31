import { FETCHING_POSTS, LOAD_POSTS, VALID_SUB } from '../actions';

const INITIAL_STATE = {
  after: null,
  before: null,
  posts: [],
  subExists: null,
  isFetching: false
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case LOAD_POSTS:
      return { 
        ...state,
        posts: action.payload.posts,
        after: action.payload.after,
        before: action.payload.before,
        subExists: true
      };

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
