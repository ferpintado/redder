import axios from 'axios';

const getUrl = (subreddit) => `https://www.reddit.com/r/${subreddit}/new.json`;

export default{
  getPosts(subreddit, params){
    // const query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    // const url = `${getUrl(subreddit)}?${query}`;
    return axios.get(getUrl(subreddit), { params });
    
  }
}