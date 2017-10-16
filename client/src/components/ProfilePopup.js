import React, { Component } from 'react';
import { Modal, Card, Header, Button, Image, Icon, Grid, Segment, Popup } from 'semantic-ui-react';

class ProfilePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRequestSent: false,
      subscribed: false
    }
  }

  handleSubscribe = () => {
    var payload = {
      subscriberId: this.props.currentUser.id,
      publisherId: this.props.user.id
    };

    fetch(`/subscription`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
        this.setState({subscribed: true});
        console.log('subscribed!');
      }
    })
  }

  handleFriendRequest = () => {
    var payload = {
      originator: this.props.currentUser.id,
      receiver: this.props.user.id
    };

    fetch(`/friends`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
        this.setState({friendRequestSent: true});
        console.log('friends request made!');
      }
    })
  }

  render() {
    var { friendRequestSent, subscribed } = this.state;
    var { user } = this.props;
    var popupStyle = {
      // background: 'none',
    }
    var cardStyle = {
      border: 'none',
      margin: 0
    }

    return (
    <Popup trigger={<Image src={(user && user.photo) ? user.photo : ''}
                          style={{'height':'35px','padding':'0px','margin-left':'15px','margin-top':'10px'}} size='mini' shape='circular'></Image>}
           style={popupStyle} flowing hoverable >
      <Card style={cardStyle}>
        <Image src={(user && user.photo) ? user.photo : ''} />
        <Card.Content>
          <Card.Header>
            {(user && user.name) ? user.name : ''}
          </Card.Header>
          <Card.Meta>
              <span className='date'>
                History
              </span>
           </Card.Meta>
          <Card.Description>
            {(user && user.description) ? user.description : ''}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <Icon name='user' />
            {(user && (user.friendsNum !== undefined)) ? user.friendsNum : ''} Friends
          </div>
          <Grid divided='vertically' style={{marginTop: '10px'}}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Button disabled={subscribed}
                        onClick={this.handleSubscribe}>Subscribe</Button>
              </Grid.Column>
              <Grid.Column>
                <Button disabled={friendRequestSent}
                        onClick={this.handleFriendRequest}>Add Friend</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Popup>
    )
  }
}

export default ProfilePopup;
