import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoriteSongs: [],
      count: 1,
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  componentDidUpdate() {
    this.refreshPageGetSongs();
  }

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  refreshPageGetSongs = async () => {
    const getFavSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: getFavSongs,
    });
  };

  favoriteSongs = async () => {
    const getFavSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs: getFavSongs,
    });
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div
        data-testid="page-favorites"
        className="flex font-bold text-white bg-neutral-900"
      >
        <Header className="min-h-screen" />
        {isLoading ? <Loading className="text-center" />
          : (
            <section className="w-full">
              <h4 className="text-center text-2xl">Favorites Songs</h4>
              <MusicCard
                handleClick={ this.handleClick }
                musics={ favoriteSongs }
              />
            </section>
          )}
      </div>
    );
  }
}

export default Favorites;

// teste
