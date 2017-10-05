import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Workouts extends Component {

  render() {
    var { listings } = this.props;

    return (
      <Card.Group itemsPerRow={3}>
        {listings.map(listing => (
          <Card>
            <Card.Content>
              <Image src={this.props.user} size='mini' floated='left'/>
              <Card.Header>Username</Card.Header>
              <Card.Meta>{listing.activity}</Card.Meta>
              <Card.Description>{`Schedule on ${listing.scheduled} for ${listing.duration} hours`}</Card.Description>
              <Card.Content extra>
                {(<a><Icon name='user' /> {listing.buddies} {listing.buddies === 1 ? 'buddy' : 'buddies'} </a>)}
              </Card.Content>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }

}

export default Workouts;
