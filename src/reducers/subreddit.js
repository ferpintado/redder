import { FETCHING_POSTS, LOAD_POSTS, VALID_SUB } from '../actions';

const INITIAL_STATE = {
  incomingPosts: [],
  posts: [],
  subExists: null,
  isFetching: false
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case LOAD_POSTS:
      return { ...state, posts: action.payload.posts };
    case FETCHING_POSTS:
      return { ...state, isFetching: action.payload.fetching };
    case VALID_SUB:
      return { ...state, subExists: action.payload.subExists };
    default:
      return state;
  }
}
