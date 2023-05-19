import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { VscPerson } from 'react-icons/vsc';
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
      <header
        data-testid="header-component"
        className="flex-col items-center
       bg-black min-h-screen p-5  text-white font-bold"
      >
        <img className="w-40 pt-4" src="https://live.staticflickr.com/65535/52770186481_6a5cd0f7cb_n.jpg" alt="trybetunes-logo" />
        <section className="flex-col pl-2">
          <div
            className="pb-6 pt-20 flex justify-beetween
          gap-1 items-center hover:text-xl"
          >
            <AiOutlineSearch />
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </div>

          <div className="pb-6 flex justify-beetween gap-1 items-center hover:text-xl">
            <MdFavoriteBorder />
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </div>

          <div className="pb-20 flex justify-beetween gap-1 items-center hover:text-xl">
            <CgProfile />
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </div>
        </section>
        <section className="pt-4 pl-2">
          {isLoading ? <Loading />
            : (
              <div className="flex justify-beetween gap-1 items-center hover:text-xl">
                <VscPerson />
                <p data-testid="header-user-name">{user.name}</p>
              </div>
            )}
        </section>
      </header>
    );
  }
}

export default Header;
