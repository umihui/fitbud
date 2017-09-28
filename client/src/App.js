import React, { Component } from 'react';
import LoginModal from './LoginModal.js';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Input
} from 'semantic-ui-react';

class App extends Component {
	state = { openModal: false }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	handleLoginClick = (e) => {
		console.log('hello');
		this.setState({ openModal: true 
	})};
	handleModalClose = () => this.setState({ openModal: false});



  render() {
  	const { activeItem } = this.state;

    return (
      <Menu secondary size='huge'>
        <Menu.Item name='home' as='a' onClick={this.handleItemClick} />
        <Menu.Item name='messages' as='a' onClick={this.handleItemClick} />
        <Menu.Item name='friends' as='a' onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item> 
          	<Button content='Log In' onClick={this.handleLoginClick} />
          </Menu.Item>
          <Menu.Item> 
          	<Button primary content='Sign Up' onClick={this.handleLoginClick} />
          </Menu.Item>
        </Menu.Menu>
        <LoginModal openModal={this.state.openModal} handleModalClose={this.handleModalClose} /> 
      </Menu>
    );
  }
}

export default App;
