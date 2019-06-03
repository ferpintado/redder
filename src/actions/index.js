import subreddit from '../api/subreddit'

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const LOAD_POSTS = 'LOAD_POSTS';
export const VALID_SUB = 'VALID_SUB';
export const STORE_BEFORE_POSTS = 'STORE_BEFORE_POSTS';
export const LOAD_BEFORE_POSTS = 'LOAD_BEFORE_POSTS';

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

export function loadPosts(response, params){
  const { data } = response.data;
  const position = Object.keys(params).toString().length ? Object.keys(params).toString() : 'init';
  return {
    type: LOAD_POSTS,
    payload: {
      posts: data.children,
      after: data.after,
      position
    }
  };
}

export function storeBeforePosts(response, params){
  const { data } = response.data;
  return {
    type: STORE_BEFORE_POSTS,
    payload: {
      posts: data.children
    }
  };
}

export const getPosts = (sub, params) => async dispatch => {
  try{
    dispatch(isFetchingPosts(true));
    const response = await subreddit.getPosts(sub, params);
    dispatch(loadPosts(response, params));
    dispatch(subExists(true));
    dispatch(isFetchingPosts(false));    
  }catch(e){
    dispatch(subExists(false));
  }
}

export const getBeforePosts = (sub, params) => async dispatch => {
  try{
    const response = await subreddit.getPosts(sub, params);
    dispatch(storeBeforePosts(response));    
  }catch(e){
    dispatch(subExists(false));
  }
}

export const appendBeforePosts= () => {
  return {
    type: LOAD_BEFORE_POSTS
  }
}