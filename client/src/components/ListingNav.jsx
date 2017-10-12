import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class ListingNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'all'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    console.log(this.props.user);
  }
  handleItemClick(event, {name}) {
    this.setState({
      active: name,
    });
  }

  render() {
    return (
      <Menu text>
        <Menu.Item header>Show: </Menu.Item>
        <Menu.Item name='all' active={this.state.active === 'all'} onClick={this.handleItemClick} />
        <Menu.Item name='subscribed' active={this.state.active === 'subscribed'} onClick={this.handleItemClick} />
      </Menu>
    );
  }

}

export default ListingNav;

        