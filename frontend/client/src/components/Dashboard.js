import React, { Component } from 'react';
import { Card, Container, Icon, Image, List } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import ProfilePic from './ProfilePic';
import DashNav from './DashNav';
import Workouts from './Workouts';
import Requests from './Requests';
import Invites from './Invites';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'my workouts'
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(e, { name }) {
    // console.log('I\'ve been clicked, and my name is: ' + name);
    this.setState({ view: name }, () => {
      console.log(this.state);
    });
  };

  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  user = '/' + this.images[Math.floor(Math.random() * this.images.length)];

  render() {
    var { listings } = this.props;

    return (
      <Container style={{marginTop: '20px'}}>

        <ProfilePic user={this.user}/>

        <DashNav handleClick={this.handleTabClick} view={this.state.view}/>

        {this.state.view === 'my workouts' && ([<Workouts listings={listings} user={this.user}/>])}
        {this.state.view === 'my requests' && ([<Requests listings={listings} />])}
        {this.state.view === 'my invites' && ([<Invites listings={listings} />])}
        
      </Container>
    )
  }
}

export default Dashboard;

//profile pic
  //username
//
