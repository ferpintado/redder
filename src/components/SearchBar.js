import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onChange(event) {
    this.setState({
      value: event.target.value.replace(/\s/g, '')
    });
  }

  onKeyPress(event){
    if (event.key === 'Enter' && this.state.value !== '') {
      console.log('Fetch subreddit');
    }
  }

  clearInput(){
    this.setState({
      value: ''
    });
  }

  render(){
    return (
      <div className="form-row">
        <div className="col-sm-12">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">r/</div>
            </div>
            <input type="text" className="form-control" placeholder="subreddit" value={this.state.value} onChange={this.onChange.bind(this)} onKeyPress={this.onKeyPress.bind(this)}/>
            {this.state.value.length > 0 &&          
              <button className="btn bg-transparent" style={{marginLeft: -40, zIndex: 100}} onClick={this.clearInput.bind(this)}>
                <i className="fa fa-times"></i>
              </button>
            }
          </div>
          <p className="text-right"><small>Hit enter for search ↵</small></p>
        </div>
      </div>
    );
  }
}

export default SearchBar;