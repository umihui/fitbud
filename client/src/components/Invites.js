import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

class Invites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: [1,2,3,4,5,9,'a'],
      invites: [],
      var:false
    }
  }

  fetchInvites () {
    fetch('/dashboard/invites', { credentials: "include" })
      .then(response => response.json()
        .then(
          response => {
            this.setState({ invites: response });
            console.log('FETCH INVITES',response);
          }
        )
      )
  }

  componentDidMount() {
    this.fetchInvites();
  }

  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  clickInvite() {
    this.props.update()
      .then(result => {
        this.fetchInvites();
      })
  }

  render() {
    console.log('INvite render', this.state.var);
    return (
      <Card.Group itemsPerRow={3}>
        {this.state.invites.map(listing => (
          <Card>
            <Card.Content>
              <Image src={`${this.state.event[listing.currentEvent]}_on.svg`} size='mini' floated='right'/>
              <Card.Header>{listing.title.toUpperCase()}</Card.Header>
              <Card.Meta><Icon name='user' />{listing.name}</Card.Meta>
              <Card.Meta><Icon name='marker' />{listing.location}</Card.Meta>
              <Card.Description style={{'padding':'10px 10px 10px 0px'}}>
                {`${listing.details}`}
              </Card.Description>
              <Card.Description>
                {`on ${new Date(listing.date).toDateString()}`}
              </Card.Description>
              <Card.Description>
                {listing.duration > 1 ? `for ${listing.duration} hours` :`for ${listing.duration} hour`}
              </Card.Description>
              <Card.Content extra>
                <Button name='accept'
                  floated='right' size='small'
                  color='teal'
                  onClick={() => {
                    this.props.update(listing.id, 'invite-accepted')
                    .then(result => this.fetchInvites())
                  }}>
                  Accept
                </Button>
              </Card.Content>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }

}

export default Invites;
