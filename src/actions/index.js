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

export function loadPosts(response){
  const { data } = response.data;
  console.log(data);
  return {
    type: LOAD_POSTS,
    payload: {
      posts: data.children,
      after: data.after,
      before: data.children[0].data.name
    }
  };

}

export const getPosts = (sub, params) => async dispatch => {
  try{
    dispatch(isFetchingPosts(true));
    const response = await subreddit.getPosts(sub, params);
    dispatch(loadPosts(response));
    dispatch(subExists(true));
    dispatch(isFetchingPosts(false));
  }catch(e){
    dispatch(subExists(false));
  }
}