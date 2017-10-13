import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Invites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: [1,2,3,4,5,9,'a'],
      accepted: []
    }
  }

  componentDidMount() {
    fetch('/dashboard/accepted', { credentials: "include" })
      .then(response => response.json()
        .then(
          response => {
            this.setState({ accepted: response });
            console.log(response);
          }
        )
      )
  }

  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  render() {

    return (
      <Card.Group itemsPerRow={3}>
        {this.state.accepted.map(listing => (
          <Card>
            <Card.Content>
              <Image src={`${this.state.event[listing.currentEvent]}_on.svg`} size='mini' floated='right'/>
              <Card.Header>{listing.title.toUpperCase()}</Card.Header>
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

export default Invites;
