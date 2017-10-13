import React, { Component } from 'react';
import { Menu,Icon, Button } from 'semantic-ui-react';

class DashNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Menu tabular>
        <Menu.Item name='my workouts' active={this.props.view === 'my workouts'} onClick={this.props.handleClick} />
        <Menu.Item name='my requests' active={this.props.view === 'my requests'} onClick={this.props.handleClick} />
        <Menu.Item name='upcoming workouts' active={this.props.view === 'upcoming workouts'} onClick={this.props.handleClick} />
        <Menu.Item name='setting' position='right'><Icon name='setting' size='large' color='teal'  bordered /></Menu.Item>
      </Menu>
    )
  }

}

export default DashNav;
