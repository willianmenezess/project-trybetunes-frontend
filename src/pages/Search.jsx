import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      onDisabled: true,
    };
  }

  handleSearch = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    if (target.value.length >= '2') {
      this.setState({
        onDisabled: false,
      });
    } else {
      this.setState({
        onDisabled: true,
      });
    }
  };

  render() {
    const { inputSearch, onDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <input
          data-testid="search-artist-input"
          name="inputSearch"
          value={ inputSearch }
          onChange={ this.handleSearch }
          placeholder="Nome do Artista"
        />

        <button
          data-testid="search-artist-button"
          name="btnSearch"
          type="button"
          disabled={ onDisabled }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
