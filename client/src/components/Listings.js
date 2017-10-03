import React, { Component } from 'react';
import { Card, Container, Icon } from 'semantic-ui-react';

class Listings extends Component {
  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  render() {
    var { listings } = this.props;
    console.log(listings);
    console.log(this.images);

    return (
      <Container style={{marginTop: '20px'}}>
        <Card.Group itemsPerRow={3}>
          {listings.map(listing => (
            <Card 
              image={'/' + this.images[Math.floor(Math.random() * this.images.length)]}
              header={listing.posted_by}
              meta={listing.activity}
              description={`Schedule on ${listing.scheduled} for ${listing.duration} hours`}
              extra={(<a><Icon name='user' /> {listing.buddies} {listing.buddies === 1 ? 'buddy' : 'buddies'} </a>)}
            />
          ))}
        </Card.Group>
      </Container>
    )
  }
}

export default Listings;