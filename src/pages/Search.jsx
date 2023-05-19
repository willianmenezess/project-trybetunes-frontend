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
      <div
        data-testid="page-search"
        className="flex font-bold bg-neutral-900"
      >
        <Header />
        {!isLoading ? <Loading />
          : (

            <section className="w-full bg-neutral-900 text-white">
              <section className="flex justify-center mb-5 mt-10">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  name="inputSearch"
                  value={ inputSearch }
                  onChange={ this.handleSearch }
                  placeholder="Nome do Artista"
                  className="block bg-black rounded p-2 text-white w-1/2"
                />
                <button
                  data-testid="search-artist-button"
                  name="btnSearch"
                  type="button"
                  disabled={ onDisabled }
                  onClick={ this.handleClick }
                  className="bg-green-400 p-2 ml-3 rounded-lg
                  shadow hover:bg-green-600 cursor-pointer text-black"
                >
                  Pesquisar
                </button>
              </section>

              <section className="pl-5">
                <p>
                  {`Resultado de álbuns de: ${artistName}`}
                </p>
                <section className="flex flex-wrap justify-between gap-2">
                  {!findAlbum ? 'Nenhum álbum foi encontrado'
                    : albunsList.map((album) => (
                      <div
                        key={ album.collectionName }
                        className="min-w-1/5 w-1/5 bg-neutral-800 rounded-2xl
                        shadow-lg flex-col items-center justify-center mt-4
                        hover:bg-neutral-700"
                      >
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                          className="text-center flex flex-col
                          items-center justify-center pt-1"
                        >

                          <img
                            src={ album.artworkUrl100 }
                            alt={ album.collectionName }
                            className="block rounded-xl"
                          />
                          <div>
                            <h4>{album.collectionName}</h4>
                            <p className="font-normal">{album.artistName}</p>
                          </div>

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
