import subreddit from '../api/subreddit.js'

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const LOAD_POSTS = 'LOAD_POSTS';
export const VALID_SUB = 'VALID_SUB';

export function isFetchingPosts(flag){
  return {
    type: FETCHING_POSTS,
    payload: {
      fetching: flag
    }
  };
}

export function subExists(flag){
  return {
    type: VALID_SUB,
    payload: {
      subExists: flag
    }
  };
}

export const getPosts = (sub, params) => async dispatch => {
  try{
    dispatch(subExists(null));
    dispatch(isFetchingPosts(true));
    const response = await subreddit.getPosts(sub, params);
    dispatch(isFetchingPosts(false));
    console.log(response);
  }catch(e){
    dispatch(subExists(false));
  }
}