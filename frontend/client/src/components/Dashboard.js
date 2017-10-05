import React, { Component } from 'react';
import { Card, Container, Icon, Image, List } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import ProfilePic from './ProfilePic';
import DashNav from './DashNav';
import Workouts from './Workouts';

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

  render() {
    var { listings } = this.props;

    return (
      <Container style={{marginTop: '20px'}}>

        <ProfilePic />

        <DashNav handleClick={this.handleTabClick}/>


        <Workouts listings={listings} />
        
      </Container>
    )
  }
}

export default Dashboard;

//profile pic
  //username
//
