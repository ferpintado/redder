import React from 'react';
import PropTypes from 'prop-types';

class Post extends React.Component {
  isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

  render(){
    const { data } = this.props.data;
    const hasThumbnail = this.isValidUrl(data.thumbnail);
    const timestamp = new Date(data.created_utc * 1000).toString();
    const permalink = `https://www.reddit.com${data.permalink}`
    return (
      <div className="card" data-testid={data.name}>
        <div className="row no-gutters">
            {hasThumbnail &&
              <div className="col-md-3" style={{display:"flex", alignItems: "center"}}>
                <img data-testid="post-thumbnail" src={data.thumbnail} className="card-img" alt={data.title}/>
              </div>
            }
            <div className={hasThumbnail ? "col-md-9" : "col-md-12"}>
              <div className="card-body">
                <h5 className="card-title" data-testid="post-title"><a href={data.url}  target="_blank" rel="noopener noreferrer">{data.title}</a></h5>
                <p className="card-text" data-testid="post-author"><strong>Author:</strong> {data.author}</p>
                <p className="card-text" data-testid="post-comments"><a href={permalink} target="_blank" rel="noopener noreferrer">{data.num_comments} comments</a></p>
                <p className="card-text" data-testid="post-timestamp"><small className="text-muted">Posted on: {timestamp}</small></p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

Post.propTypes = {
  data: PropTypes.object
}

export default Post;