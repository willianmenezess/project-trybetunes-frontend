import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      onDisabled: true,
      isLoading: false,
    };
  }

  submitForm = async () => {
    const { history } = this.props;
    const { inputName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: inputName }); // api é assincrona
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    if (target.value.length >= '3') {
      this.setState({
        onDisabled: false,
      });
    } else {
      this.setState({
        onDisabled: true,
      });
    }
  };

  render() {
    const { inputName, onDisabled, isLoading } = this.state;
    return (
      <div
        data-testid="page-login"
        className="bg-neutral-900 min-h-screen
        flex justify-center items-center font-bold text-white"
      >
        { isLoading ? <Loading />
          : (
            <form
              className="bg-black p-12 rounded-2xl shadow-lg text-center
              flex-column items-center"
            >
              <img className="w-32 ml-16" src="https://live.staticflickr.com/65535/52770186481_6a5cd0f7cb_n.jpg" alt="trybetunes-logo" />
              <h1 className="text-4xl mb-8 pt-8">Login</h1>
              <label htmlFor="inputName">
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="inputName"
                  name="inputName"
                  placeholder="qual é o seu nome?"
                  minLength="3"
                  value={ inputName }
                  onChange={ this.handleChange }
                  className="w-full block bg-neutral-900 rounded p-2 text-white"
                />
              </label>

              <label htmlFor="btnLogin">
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ onDisabled }
                  onClick={ this.submitForm }
                  className="bg-green-400 p-3 w-full mt-4 rounded-lg
                  shadow hover:bg-green-600 cursor-pointer text-black"
                >
                  Entrar
                </button>
              </label>
            </form>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
