import React from 'react';
import { connect } from 'react-redux'
import { getPosts } from '../actions/index';
import Post from './Post';

const mapStateToProps = state => {
  return {
    isFetching: state.subreddit.isFetching,
    posts: state.subreddit.posts
  };
}

const mapDispatchToProps = {
  getPosts: getPosts
};

const Loading = () => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

class PostList extends React.Component {

  renderList(){
    return this.props.posts.map((post, index) => {
      return <Post data={post} key={index}/>
    });
  }

  render(){
    return (
      <React.Fragment>
        {this.props.isFetching ?
          <Loading/>
        :
          this.renderList()
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);