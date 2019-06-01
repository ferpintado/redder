import React from 'react';
import { connect } from 'react-redux'
import { getPosts } from '../actions/index';
import Post from './Post';

const mapStateToProps = state => {
  return {
    isFetching: state.subreddit.isFetching,
    posts: state.subreddit.posts,
    after: state.subreddit.after
  };
}

const mapDispatchToProps = {
  getPosts: getPosts
};

const Loading = () => {
  return (
    <div className="mt-3 d-flex justify-content-center">
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

  loadMore(){
    this.props.getPosts(this.props.subreddit, { after: this.props.after })
  }

  render(){
    return (
      <React.Fragment>
        {this.renderList()}
        {this.props.isFetching &&
          <Loading/>
        }
        {this.props.after && !this.props.isFetching &&
          <div className="d-flex justify-content-center">
            <button type="button" className="mt-2 btn btn-outline-dark" onClick={this.loadMore.bind(this)}>Load more</button>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);