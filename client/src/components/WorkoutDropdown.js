import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class WorkoutDropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a><Icon name='user' /> {this.props.buddies} {this.props.buddies === 1 ? 'buddy' : 'buddies'} </a>
      </div>
    );
  }
}

export default WorkoutDropdown;

//each dropdown list pulls the users that are requesting
