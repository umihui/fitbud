import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  fetchFriends () {
    fetch('/friends', { credentials: "include" })
      .then(response => response.json()
        .then(
          response => {
            this.setState({ friends: response });
            console.log('FETCH FRIENDS',response);
          }
        )
      )
  }

  componentDidMount() {
    this.fetchFriends();
  }

  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  render() {
    console.log('Friends');
    return (
      <Card.Group itemsPerRow={3}>
        {this.state.friends.map(friend => (
          <Card>
            <Card.Content>
              <Card.Header>{friend.name}</Card.Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }

}

export default Friends;
