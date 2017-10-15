import React, { Component } from 'react';
import { Modal, Header, Button, Image, Icon, Grid, Segment, Popup } from 'semantic-ui-react';
import ProfilePopup from './ProfilePopup.js'
import ListingAttenders from './ListingAttenders.js'

class ListingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestSent: false,
      event: [1,2,3,4,5,9,'a'],
    }
  }

  componentWillMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile = () => {
    fetch('/profile/' + this.props.listing.ownerId, {
      credentials: 'include'
    }).then(response => response.json())
      .then(response => this.setState({targetUser: response}));
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
    }).then( () => {
      console.log('postings got fetched!!!!!!!!')
    })
  }

  render() {
    var { listing, open, hideListingModal, userImage, user } = this.props;
    var { targetUser } = this.state;
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
            <ProfilePopup currentUser={user} user={targetUser}/>
            <p>Attenders:</p>
            <ListingAttenders currentUser={user} postId={listing.id} />
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
