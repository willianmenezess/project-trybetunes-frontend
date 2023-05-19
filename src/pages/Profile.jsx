import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
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
      <div
        data-testid="page-profile"
        className="flex min-h-screen font-bold bg-neutral-900 text-white"
      >
        <Header />
        <section className="flex w-full justify-center items-center text-center">
          {isLoading ? <Loading />
            : (

              <section className="bg-black p-4 rounded-lg">
                <div className="text-xl mb-3 flex justify-center">
                  <Link to="/profile/edit">Editar perfil</Link>
                  <AiOutlineEdit />
                  <br />
                </div>
                <div className="flex flex-col items-center">
                  <img className="w-1/4 justify-center rounded-full" src="https://willianmenezess.github.io/src/imgs/foto-willian.png" alt="profileImage" data-testid="profile-image" />
                  <img src={ image } alt="" data-testid="profile-image" />
                  <p>
                    Nome:
                    <span>{name}</span>
                  </p>
                  <p>
                    Email:
                    <span>{email}</span>
                  </p>
                  <p>
                    Descrição:
                    <span>{description}</span>
                  </p>
                </div>
              </section>
            )}
        </section>
      </div>
    );
  }
}

export default Profile;
