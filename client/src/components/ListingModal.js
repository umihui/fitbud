import React, { Component } from 'react';
import { Modal, Header, Button, Image, Icon, Grid, Segment, Popup } from 'semantic-ui-react';
import ProfilePopup from './ProfilePopup.js'

class ListingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestSent: false,
      event: [1,2,3,4,5,9,'a'],
    }
  }

  sendRequest = () => {
    this.setState({
      requestSent: true
    })

    fetch(`/postings/${this.props.listing.id}`, {
      credentials: 'include',
      method: 'POST'
    }).then(response => {
      if (response.ok) console.log('request made!');
    })
  }

  render() {
    var { listing, open, hideListingModal, userImage, user } = this.props;

    return (
      <Modal open={open} onClose={hideListingModal} closeIcon dimmer={false}>
        <Modal.Content image scrolling>
          <Image
            size='small'
            src={`${this.state.event[listing.currentEvent]}_on.svg`}
            wrapped
          />
          <Modal.Description>
            <Header>{listing.title}</Header>
            <Header>{listing.name}</Header>
            <p>Location: <span>{listing.location}</span></p>
            <p>Meetup point: <span>{listing.meetup_spot}</span></p>
            <p>Date: <span>{new Date(listing.date).toDateString()}</span></p>
            <p>Duration: <span>{listing.duration} hours</span></p>
            <p>Details: <span>{listing.details}</span></p>
            <p>Hoster:</p>
            <ProfilePopup user={this.props.user}/>
            <p>Attenders:</p>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button secondary onClick={hideListingModal}>
            Close <Icon name='close' />
          </Button>
          {user && <Button disabled={this.state.requestSent || listing.status !== null || user.id === listing.ownerId} primary onClick={this.sendRequest}>
            { this.state.requestSent || listing.status ? 'Pending' : 'Request to join' } <Icon name='right chevron' />
          </Button>}
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ListingModal;
       
