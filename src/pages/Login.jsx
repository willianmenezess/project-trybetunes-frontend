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
      <div data-testid="page-login">
        { isLoading ? <Loading />
          : (
            <form>
              <label htmlFor="inputName">
                Login:
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="inputName"
                  name="inputName"
                  placeholder="qual é o seu nome?"
                  minLength="3"
                  value={ inputName }
                  onChange={ this.handleChange }
                />
              </label>
              <br />
              <label htmlFor="btnLogin">
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ onDisabled }
                  onClick={ this.submitForm }
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
