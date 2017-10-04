import React, { Component } from 'react';
import Cookies from 'universal-cookie';                                                                                                                                      
import MainNav from './MainNav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Listings from './Listings';
import NoMatch from './NoMatch';
import Dashboard from './Dashboard';
import data from '../sampleData';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    }

    this.cookies = new Cookies();
    this.checkAuth();
  }
  
  checkAuth = () => {
    fetch('/login', {
      credentials: 'include'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.authorized) {
          this.setState({authenticated: true});
        }
      })
  }

  handleAuthenticated = () => {
    this.setState({authenticated: true});
    console.log('User authenticated...');
  }

  handleSignOff = () => {
    this.setState({authenticated: false});
    this.cookies.remove('test');
    console.log('User signed off...');
  }

  render() {
    return (
      <Router>
        <div>
          <MainNav authenticate={this.handleAuthenticated} isAuthed={this.state.authenticated} 
                   signoff={this.handleSignOff} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/listings' render={props => (
              <Listings listings={data} />
            )} />
            <Route exact path='/login' render={props => (
              <Login authenticate={this.handleAuthenticated} {...props} />
            )} />
            <Route exact path='/signup' component={Signup} />

            <Route exact path='/dashboard' render={props => (
              <Dashboard listings={data} />
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
