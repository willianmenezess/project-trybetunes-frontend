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
      name: '',
      email: 'email@test.com',
      image: 'profile-image',
      description: 'Lorem ipsum',
      onDisabled: true,
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
    if ((name !== '') && (email !== '') && (description !== '')) {
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
      name: '',
      email: '',
      description: '',
      image: '',
    });

    await updateUser(newUser);
    history.push('/profile');
  };

  getUserInfo = async () => {
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({
      isLoading: false,
      name,
      email,
      image,
      description,
    });
  };

  render() {
    const { name, email, image, description, isLoading, onDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading />
          : (
            <form>
              <img src={ image } alt="profileImage" data-testid="edit-input-image" />
              <br />

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
                />
              </label>
              <br />

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
                />
              </label>
              <br />

              <label htmlFor="description-edit">
                Descrição
                <br />
                <textarea
                  id="description-edit"
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
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
                >
                  Salvar
                </button>
              </label>

            </form>
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
