import React, { Component } from 'react';
import MainNav from './MainNav';
import Home from './Home';
import Listings from './Listings';
import data from '../sampleData';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <Router>
        <div>
          <MainNav />
          <Route exact path='/' component={Home} />
          <Route exact path='/listings' render={props => (
            <Listings listings={data} />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
