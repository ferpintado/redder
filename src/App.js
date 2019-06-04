import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SubSuggestions from './components/SubSuggestions.js'
import SubReddit from './components/SubReddit.js'
import SearchBar from './components/SearchBar.js'
import './App.scss';

function App() {
  return (
    <div className="container redder-main">
      <Router>
        <SearchBar />
        <Route path="/" exact component={SubSuggestions} />
        <Route path="/r/:subreddit" exact component={SubReddit} />
      </Router>
    </div>
  );
}

export default App;