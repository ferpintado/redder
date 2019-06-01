import React from 'react';
import { connect } from 'react-redux'
import { getPosts, appendBeforePosts } from '../actions/index';
import Post from './Post';

const mapStateToProps = state => {
  return {
    isFetching: state.subreddit.isFetching,
    posts: state.subreddit.posts,
    after: state.subreddit.after,
    before_posts: state.subreddit.before_posts
  };
}

const mapDispatchToProps = {
  getPosts: getPosts,
  appendBeforePosts: appendBeforePosts
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

  appendBefore(){
    const lastScrollHeight = document.body.scrollHeight;
    // const offset = window.pageYOffset;
    this.props.appendBeforePosts();
    setTimeout(() => {
      document.documentElement.scrollTop += document.body.scrollHeight-lastScrollHeight;
    }, 1);
  }

  render(){
    return (
      // TODO: add no posts case

      <React.Fragment>
        {this.props.before_posts.length > 0 &&
        <div className="d-flex justify-content-center sticky-top mt-2 mb-2" style={{top: 10}}>
          <button type="button" className=" btn btn-primary" onClick={this.appendBefore.bind(this)}>{this.props.before_posts.length} new posts. Click to load.</button>
        </div>
        }
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