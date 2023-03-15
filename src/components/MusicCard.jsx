import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    if ((favoriteSongs.some((item) => item === music)) === false) {
      this.setState({
        addMusic: true,
      });
      await addSong(music);
      this.setState((prevState) => ({
        addMusic: false,
        favoriteSongs: [...prevState.favoriteSongs, music],
      }));
    }
  };

  render() {
    const { musics } = this.props;
    const { addMusic, favoriteSongs } = this.state;
    return (
      <div>
        { addMusic ? <Loading />
          : (

            <div>
              {
                musics.map((music) => (
                  <div key={ music.trackName }>
                    <p>{ music.trackName }</p>
                    <audio
                      data-testid="audio-component"
                      src={ music.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      {' '}
                      <code>audio</code>
                    </audio>
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
};

export default MusicCard;
