import React, { Component } from 'react';
import { Card, Container, Icon, Transition } from 'semantic-ui-react';

class Listings extends Component {
  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];
  state = {visible: false}

  componentDidMount() {
    this.setState({visible: true})
  }

  render() {
    var { listings } = this.props;
    console.log(listings);
    console.log(this.images);

    return (
      <Transition visible={this.state.visible} duration={1000}>
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
      </Transition>
    )
  }
}

export default Listings;