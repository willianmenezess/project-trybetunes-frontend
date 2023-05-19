import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      onDisabled: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange = ({ target }) => {
    const { name, email, description } = this.state;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
    const regex = /^[\w-]+@([\w-]+\.)+[\w-]{3,4}$/i;

    if ((name !== '') && (email !== '') && (description !== '')
      && email.match(regex)) {
      this.setState({
        onDisabled: false,
      });
    } else {
      this.setState({
        onDisabled: true,
      });
    }
  };

  clickUpdateUser = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    const newUser = {
      name,
      email,
      image,
      description,
    };

    this.setState({
      isLoading: true,
    });

    await updateUser(newUser);
    this.setState({
      isLoading: false,
    });

    history.push('/profile');
  };

  getUserInfo = async () => {
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({
      name,
      email,
      image,
      description,
    });

    this.setState({
      isLoading: false,
    });

    // if ((name !== '') && (email !== '') && (description !== '')
    // && email.match(regex)) {
    //   this.setState({
    //     onDisabled: false,
    //   });
    // } else {
    //   this.setState({
    //     onDisabled: true,
    //   });
    // }
  };

  render() {
    const { name, email, image, description, isLoading, onDisabled } = this.state;
    return (
      <div
        data-testid="page-profile-edit"
        className="flex bg-neutral-900 text-white font-bold"
      >
        <Header />
        {isLoading ? <Loading />
          : (
            <div className="flex w-full items-center justify-center">
              <form
                className="bg-neutral-800 flex flex-col
                items-center justify-center pt-5 rounded-lg pb-5 gap-2"
              >
                <img src={ image } alt="" data-testid="edit-input-image" />
                <img className="w-1/4 justify-center rounded-full" src="https://willianmenezess.github.io/src/imgs/foto-willian.png" alt="profileImage" data-testid="edit-input-image" />

                <label htmlFor="name-edit">
                  Nome
                  <br />
                  <input
                    type="text"
                    id="name-edit"
                    data-testid="edit-input-name"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                    className="bg-black rounded-md border border-green-600 p-1"
                  />
                </label>

                <label htmlFor="email-edit">
                  Email
                  <br />
                  <input
                    type="email"
                    id="email-edit"
                    data-testid="edit-input-email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                    className="bg-black rounded-md border border-green-600 p-1"
                  />
                </label>

                <label htmlFor="description-edit">
                  Descrição
                  <br />
                  <textarea
                    id="description-edit"
                    data-testid="edit-input-description"
                    name="description"
                    value={ description }
                    onChange={ this.handleChange }
                    className="bg-black border border-green-600 rounded-lg p-1"
                  />
                </label>
                <br />
                <label htmlFor="edit-button">
                  <button
                    id="edit-button"
                    data-testid="edit-button-save"
                    type="button"
                    disabled={ onDisabled }
                    onClick={ this.clickUpdateUser }
                    className="bg-green-400 p-2 ml-3 rounded-lg
                  shadow hover:bg-green-600 cursor-pointer text-black"
                  >
                    Salvar
                  </button>
                </label>
              </form>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
