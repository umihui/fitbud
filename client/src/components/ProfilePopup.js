import React, { Component } from 'react';
import { Modal, Header, Button, Image, Icon, Grid, Segment, Popup } from 'semantic-ui-react';

class ProfilePopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
    <Popup
    trigger={<Image src={this.props.user.photo} size='mini' shape='circular'></Image>}
    flowing
    hoverable
    >
      <Grid centered columns={3} >
        <Grid.Column textAlign='center' width={4}>
        {console.log('props:',this.props)}
        <Image src={this.props.user.photo} size='tiny' shape='circular'></Image>
        </Grid.Column>
        <Grid.Column textAlign='center' width={6}>
          <Header as='h4'>Name:
            <p>
              {this.props.user.name}
            </p>
          </Header>
          <Button>Subscribe</Button>
        </Grid.Column>
        <Grid.Column textAlign='center' width={6}>
          <Header as='h4'>History</Header>
          <Button>Add Friend</Button>
        </Grid.Column>
      </Grid>
    </Popup>
    )
  }
}

export default ProfilePopup;