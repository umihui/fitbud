import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class ListingNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'all',
      sorting: 'date',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }
  handleItemClick(event, {name}) {
    this.setState({
      active: name,
    });
  }
  handleSortChange(event, {name}) {
    this.setState({
      sorting: name,
    })
  }

  render() {
    return (
      <Menu text>
        <Menu.Item header>Show: </Menu.Item>
        <Menu.Item name='all' active={this.state.active === 'all'} onClick={this.handleItemClick} />
        <Menu.Item name='subscribed' active={this.state.active === 'subscribed'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item header>Sort by: </Menu.Item>
          <Menu.Item name='date' active={this.state.sorting === 'date'} onClick={this.handleSortChange} />
          <Menu.Item name='location' active={this.state.sorting === 'location'} onClick={this.handleSortChange} />
        </Menu.Menu>
      </Menu>
    );
  }

}

export default ListingNav;

        