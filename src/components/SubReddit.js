import React from 'react';

class SubReddit extends React.Component {
  render(){
    return (
      <h1>r/{this.props.match.params.subreddit}</h1>
    )
  }
}

export default SubReddit;