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
      count: 0,
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
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading />
          : (
            <section>
              <h4>Favorites Songs</h4>
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
