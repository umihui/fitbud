import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Invites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invites: []
    }
  }

  componentDidMount() {
    fetch('/dashboard/accepted', { credentials: "include" })
      .then(response => response.json()
        .then(
          response => {
            this.setState({ requests: response });
            console.log(response);
          }
        )
      )

    console.log('getting invites...')
  }

  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  render() {
    var { listings } = this.props;

    return (
      <Card.Group itemsPerRow={3}>
        {listings.map(listing => (
          <Card>
            <Card.Content>
              <Image src={'/' + this.images[Math.floor(Math.random() * this.images.length)]} size='mini' floated='left'/>
              <Card.Header>{listing.posted_by}</Card.Header>
              <Card.Meta>{listing.activity}</Card.Meta>
              <Card.Description>{`Schedule on ${listing.scheduled} for ${listing.duration} hours`}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }

}

export default Invites;
