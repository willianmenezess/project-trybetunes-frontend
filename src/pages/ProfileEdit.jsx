import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

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
    const { name, email, image, description, isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading />
          : (
            <section>
              <img src={ image } alt="profileImage" data-testid="profile-image" />
              <button>Editar perfil</button>
              <p>Nome</p>
              <p>{ name }</p>
              <p>Email</p>
              <p>{ email }</p>
              <p>Descrição</p>
              <p>{ description }</p>
            </section>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
