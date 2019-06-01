import axios from 'axios';

const getUrl = (subreddit) => `https://www.reddit.com/r/${subreddit}/new.json`;

export default{
  getPosts(subreddit, params){
    return axios.get(getUrl(subreddit), { params });   
  }
}