import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: 'user test',
      email: 'email@test.com',
      image: 'profile-image',
      description: 'Lorem ipsum',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({
      isLoading: true,
    });
    const getUserinfo = await getUser();
    const { name, email, image, description } = getUserinfo;
    this.setState({
      name,
      email,
      description,
      image,
      isLoading: false,
    });
  };

  render() {
    const { name, email, image, description, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading />
          : (
            <section>
              <Link to="/profile/edit">Editar perfil</Link>
              <br />
              <img src={ image } alt="profileImage" data-testid="profile-image" />
              <p>
                Nome:
                <span>{ name }</span>
              </p>
              <p>
                Email:
                <span>{ email }</span>
              </p>
              <p>
                Descrição:
                <span>{ description }</span>
              </p>

            </section>)}
      </div>
    );
  }
}

export default Profile;
