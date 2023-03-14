import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import getAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      onDisabled: true,
      isLoading: true,
      albunsList: [],
      artistName: '',
      findAlbum: true,
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

  handleClick = async () => {
    const { inputSearch } = this.state;
    const inputSearch2 = inputSearch;
    this.setState({
      isLoading: false,
    });
    const contentAlbuns = await getAlbumsAPI(inputSearch); // api é assincrona
    if (contentAlbuns.length > 0) {
      this.setState({
        inputSearch: '',
        isLoading: true,
        albunsList: contentAlbuns,
        artistName: inputSearch2,
        findAlbum: true,
      });
    } else {
      this.setState({
        inputSearch: '',
        isLoading: true,
        findAlbum: false,
        albunsList: [],
        artistName: '',
      });
    }
  };

  render() {
    const { inputSearch, onDisabled, isLoading, artistName,
      albunsList, findAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { !isLoading ? <Loading />
          : (

            <section>
              <section>
                <input
                  type="text"
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
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </section>

              <section>
                <p>
                  {`Resultado de álbuns de: ${artistName}`}
                </p>
                <section>
                  {!findAlbum ? 'Nenhum álbum foi encontrado'
                    : albunsList.map((album) => (
                      <div key={ album.collectionName }>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                          <h4>{album.collectionName}</h4>
                          <p>{album.artistName}</p>
                        </Link>
                      </div>
                    ))}
                </section>

              </section>

            </section>)}

      </div>
    );
  }
}

export default Search;
