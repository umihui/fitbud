import React, { Component } from 'react';
import { Container, Image, List } from 'semantic-ui-react';

class ProfilePic extends Component {
  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  render() {
    return (
      <Container style={{margin: '30px'}}>

        <Image src={'/' + this.images[Math.floor(Math.random() * this.images.length)]} size='small' shape='circular' centered style={{margin: 'auto'}} />
      
        <Container style={{"text-align": "center"}}>
          <List style={{margin: '10px'}}>
            <List.Item>
              <List.Header>Username</List.Header>
            </List.Item>
            <List.Item>
              Citytown, USA
            </List.Item>
          </List>
        </Container>

      </Container>
    );
  }
}

export default ProfilePic;
