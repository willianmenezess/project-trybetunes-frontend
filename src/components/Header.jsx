import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const getSavedUser = await getUser();
    this.setState({
      user: getSavedUser,
      isLoading: false,
    });
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h3>TrybeTunes</h3>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <span> </span>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <span> </span>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        { isLoading ? <Loading />
          : (<p data-testid="header-user-name">{user.name}</p>
          )}
      </header>
    );
  }
}

export default Header;
