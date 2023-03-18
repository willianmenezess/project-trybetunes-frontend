import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      musics: [],
      albumInfo: {},
    };
  }

  componentDidMount() {
    this.getMusicsApi();
  }

  getMusicsApi = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params; // define o que a API vai retornar
    const albumMusics = await (getMusics(id));
    const tracks = albumMusics.slice(1, albumMusics.length);
    // console.log(albumMusics);
    // console.log(tracks);
    this.setState({
      isLoading: false,
      albumInfo: albumMusics[0],
      musics: tracks,
    });
  };

  render() {
    const { albumInfo, musics, isLoading } = this.state;
    const { artistName, collectionName } = albumInfo;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading />
          : (
            <section>
              <h4 data-testid="artist-name">{artistName}</h4>
              <p data-testid="album-name">{`${collectionName} - ${artistName}`}</p>
              <MusicCard musics={ musics } />
            </section>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
