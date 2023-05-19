import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      addMusic: false,
    };
  }

  componentDidMount() {
    this.getFavSongsLocalStorage();
  }

  getFavSongsLocalStorage = async () => {
    this.setState({
      addMusic: true,
    });
    const favSongs = await getFavoriteSongs();
    this.setState({
      addMusic: false,
      favoriteSongs: favSongs,
    });
  };

  handleMusic = async (music) => {
    // console.log(music);
    const { favoriteSongs } = this.state;
    if ((favoriteSongs.some((item) => item.trackId === music.trackId)) === false) {
      this.setState({
        addMusic: true,
      });
      await addSong(music);
      this.setState((prevState) => ({
        addMusic: false,
        favoriteSongs: [...prevState.favoriteSongs, music],
      }));
    } else {
      this.setState({
        addMusic: true,
      });
      await removeSong(music);
      const newFavSongs = favoriteSongs.filter((track) => (
        track.trackId !== music.trackId
      ));
      this.setState({
        addMusic: false,
        favoriteSongs: newFavSongs,
      });
    }
  };

  render() {
    const { musics, handleClick } = this.props;
    const { addMusic, favoriteSongs } = this.state;
    return (
      <div>
        { addMusic ? <Loading />
          : (

            <div className="flex flex-wrap justify-center w-full">
              {
                musics.map((music) => (
                  <div
                    key={ music.trackName }
                    className="flex items-center content-center w-full"
                  >
                    <div className="w-4/5 p-2">
                      <p>{ music.trackName }</p>
                      <audio
                        data-testid="audio-component"
                        src={ music.previewUrl }
                        controls
                        className="w-full"
                      >
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        {' '}
                        {' '}
                        <code>audio</code>
                      </audio>
                    </div>
                    <label htmlFor="favorite">
                      Favorita
                      <input
                        data-testid={ `checkbox-music-${music.trackId}` }
                        id="favorite"
                        type="checkbox"
                        name="favorite"
                        checked={ favoriteSongs.some((item) => (
                          item.trackId === music.trackId
                        )) }
                        onChange={ () => this.handleMusic(music) }
                        onClick={ handleClick }
                        className="accent-green-600"
                      />
                    </label>
                  </div>
                ))
              }
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default MusicCard;
