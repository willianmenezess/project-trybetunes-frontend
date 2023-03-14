import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //   };
  // }

  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
      </div>
    );
  }
}

export default Search;
