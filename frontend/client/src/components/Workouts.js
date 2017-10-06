import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Workouts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card.Group itemsPerRow={3}>
        {this.props.data.map(listing => (
          <Card>
            <Card.Content>
              <Image src={this.props.user} size='mini' floated='left'/>
              <Card.Header>Username</Card.Header>
              <Card.Meta>{listing.title}</Card.Meta>
              <Card.Description>{`Schedule on ${listing.date} for ${listing.duration} hours`}</Card.Description>
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

//once endpoint is created, data can be passed from dashboard to workouts
  //create accept button function inside workouts or dashboard
    //updateRequest route
    //passing postingId
  //pass specific workout data from workouts to new buddies component
    //render buddies, unaccepted with accept button
    //accepted buddies with green text

export default Workouts;
