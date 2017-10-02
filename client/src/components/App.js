import React, { Component } from 'react';
import MainNav from './MainNav';
import Home from './Home';
import Listings from './Listings';
import NoMatch from './NoMatch';
import data from '../sampleData';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <Router>
        <div>
          <MainNav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/listings' render={props => (
              <Listings listings={data} />
            )} />
            <Redirect from='/test' to='/listings' />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
