import React from 'react';

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
    const timestamp = new Date(data.created_utc).toString();
    const permalink = `https://www.reddit.com${data.permalink}`
    return (
      <div className="card">
        <div className="row no-gutters">
            {hasThumbnail &&
              <div className="col-md-3" style={{display:"flex", alignItems: "center"}}>
                <img src={data.thumbnail} className="card-img" alt={data.title}/>
              </div>
            }
            <div className={hasThumbnail ? "col-md-9" : "col-md-12"}>
              <div className="card-body">
                <h5 className="card-title"><a href={data.url} target="_blank" rel="noopener noreferrer">{data.title}</a></h5>
                <p className="card-text"><strong>Author:</strong> {data.author}</p>
                <p className="card-text"><a href={permalink} target="_blank" rel="noopener noreferrer">{data.num_comments} comments</a></p>
                <p className="card-text"><small className="text-muted">Posted on: {timestamp}</small></p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Post;