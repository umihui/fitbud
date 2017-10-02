import React, { Component } from 'react';
import LoginButtonModal from './LoginButtonModal.js';
import { Menu, Input, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Menu secondary size='huge' style={{marginBottom: 0}}>
        <Menu.Item exact name='home' as={NavLink} to='/' />
        <Menu.Item name='listings' as={NavLink} to='/listings' />
        <Menu.Item name='about' as={NavLink} to='/testing' />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item style={{paddingLeft: '0px'}}> 
            {/*<Button content='Log In' onClick={this.handleLoginClick} /> */}
            <LoginButtonModal />
          </Menu.Item>
          <Menu.Item style={{paddingLeft: '0px'}}> 
            <Button primary content='Sign Up' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default App;