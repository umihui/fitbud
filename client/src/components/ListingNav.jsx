import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class ListingNav extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }
  handleItemClick(event, {name}) {
    this.props.updateActive(name);
  }
  handleSortChange(event, {name}) {
    this.props.updateSorting(name);
  }

  render() {
    return (
      <Menu text>
        <Menu.Item header>Show: </Menu.Item>
        <Menu.Item name='all' active={this.props.active === 'all'} onClick={this.handleItemClick} />
        <Menu.Item name='subscribed' active={this.props.active === 'subscribed'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item header>Sort by: </Menu.Item>
          <Menu.Item name='date' active={this.props.sorting === 'date'} onClick={this.handleSortChange} />

        </Menu.Menu>
      </Menu>
    );
  }

}

export default ListingNav;

          // <Menu.Item name='location' active={this.props.sorting === 'location'} onClick={this.handleSortChange} />