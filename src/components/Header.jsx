import React, { Component } from 'react';
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
        <p>Nome do usuário:</p>
        { isLoading ? <Loading />
          : (<p data-testid="header-user-name">{user.name}</p>
          )}
      </header>
    );
  }
}

export default Header;
