import React from 'react';
import { Link } from "react-router-dom";

class SubSuggestions extends React.Component {
  render(){
    return (
      <React.Fragment>
        <h2>Suggested subreddits:</h2>
        <ul>
          <li>
            <Link to="/r/javascript">Javascript</Link>
          </li>
          <li>
            <Link to="/r/reactjs">React JS</Link>
          </li>
          <li>
            <Link to="/r/frontend">Frontend</Link>
          </li>
          <li>
            <Link to="/r/web_development">Web Development</Link>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}

export default SubSuggestions;