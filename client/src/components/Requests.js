import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  componentDidMount() {
    fetch('/dashboard/requests', { credentials: "include" })
      .then(response => response.json()
        .then(
          response => {
            this.setState({ requests: response });
            console.log(response);
          }
        )
      )

    console.log('getting requests...')
  }

  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  render() {
    return (
      <Card.Group itemsPerRow={3}>
        {this.state.requests.map(listing => (
          <Card>
            <Card.Content>
              <Image src={'/' + this.images[Math.floor(Math.random() * this.images.length)]} size='mini' floated='left'/>
              <Card.Header>{listing.title}</Card.Header>
              <Card.Meta><Icon name='marker' />{listing.location}</Card.Meta>
              <Card.Description>
                {`Schedule on ${new Date(listing.date).toDateString()}`}
              </Card.Description>
              <Card.Description>
                {`for ${listing.duration} hours`}
              </Card.Description>

            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }

}

export default Requests;
