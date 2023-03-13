import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <main>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ Edit } />
          <Route component={ NotFound } />
        </Switch>
      </main>

    );
  }
}

export default App;
// primeiro commit
