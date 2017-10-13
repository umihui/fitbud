import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

class ListingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    event: [1,2,3,4,5,9,'a'],
    }
  }

  render() {
    var { listing, showListingModal } = this.props;

    return (
      <Card onClick={() => showListingModal(listing)} link>
      
        <Card.Content>
          <Image src={`${this.state.event[listing.currentEvent]}_on.svg`} size='mini' floated='right'/>
          <Card.Header>{listing.title}</Card.Header>
          <Card.Meta>{listing.name}</Card.Meta>
          <Card.Description>{`Schedule on ${new Date(listing.date).toDateString()} for ${listing.duration} hours`}</Card.Description>
          <Card.Content extra>
            <Icon name='user' /> {listing.buddies} more {listing.buddies === 1 ? 'buddy' : 'buddies'} needed
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }

}

export default ListingCard;
