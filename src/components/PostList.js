import React from 'react';
import { connect } from 'react-redux'
import { getPosts } from '../actions/index';

const mapStateToProps = state => {
  return {
    isFetching: state.subreddit.isFetching
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

  render(){
    return (
      <React.Fragment>
        {this.props.isFetching &&
          <Loading/>
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);