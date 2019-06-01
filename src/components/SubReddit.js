import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPosts } from '../actions/index';
import PostList from './PostList';

const mapStateToProps = state => {
  return {
    isFetching: state.subreddit.isFetching,
    subExists: state.subreddit.subExists
  };
}

const mapDispatchToProps = {
  getPosts: getPosts
};

class SubReddit extends React.Component {

  fetchPosts(subreddit, params = {}){
    this.props.getPosts(this.props.match.params.subreddit, params)
  }

  componentDidMount(){
    this.fetchPosts(this.props.match.params.subreddit);
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.subreddit !== this.props.match.params.subreddit){
      this.fetchPosts(this.props.match.params.subreddit);
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