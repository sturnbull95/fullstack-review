import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    }
  }

  componentDidMount() {
    console.log('got here');
    $.get("/repos", function(reposArray) {
    })
    .done(reposArray => {
      this.setState({
        repos: reposArray,
      });
    });

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: "POST",
      url: "/repos",
      data: {data: term}
    })
  .done(function(res) {
    console.log( "Data Saved: " + res );
  });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search repos = {this.state.repos} onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
