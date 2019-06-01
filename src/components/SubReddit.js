import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPosts, getBeforePosts } from '../actions/index';
import PostList from './PostList';

const mapStateToProps = state => {
  return {
    isFetching: state.subreddit.isFetching,
    subExists: state.subreddit.subExists,
    before: state.subreddit.before
  };
}

const mapDispatchToProps = {
  getPosts: getPosts,
  getBeforePosts: getBeforePosts
};

class SubReddit extends React.Component {

  fetchPosts(subreddit, params = {}){
    this.props.getPosts(this.props.match.params.subreddit, params)
  }

  initPollingNews(){
    const time = 60000;
    const interval = setInterval(() => {
      this.props.getBeforePosts(this.props.match.params.subreddit, { before: this.props.before })
    }, time);
    
    this.setState({
      interval
    });
  }

  clearPolling(){
    clearInterval(this.state.interval);
  }

  componentDidMount(){
    const subreddit = this.props.match.params.subreddit;
    this.fetchPosts(subreddit);
    this.initPollingNews();
  }

  componentWillUnmount(){
    this.clearPolling();
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.subreddit !== this.props.match.params.subreddit){
      this.clearPolling();
      this.fetchPosts(this.props.match.params.subreddit);
      this.initPollingNews();
    }
  }
  render(){
    const subreddit = this.props.match.params.subreddit;
    const notFound = this.props.subExists === false;
    return (
      <React.Fragment>
        <h1>r/{subreddit}</h1>
        {!notFound ?
          <PostList subreddit={subreddit}/>
        :
        <p>
          404 - subreddit not found <strong>:(</strong>
        </p>
        }
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubReddit));