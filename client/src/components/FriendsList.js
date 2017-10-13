import React, { Component } from 'react';
import { Input, Form, Button, Grid, Card, Feed, Transition } from 'semantic-ui-react';
import Messaging from './Messaging';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentWillMount() {
    // this.dataPull();
    this.setState({selected: this.props.friends[0]});
  }

  componentDidMount() {
    this.setState({visible: true});
  }

  componentWillReceiveProps() {
    this.dataPull();
  }

  dataPull = () => {
    fetch('/friends', { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        console.log('friends', response);
        if (Array.isArray(response)) {
          this.setState({friends: response})
          this.setState({selected: response[0]});
        }
      })

    console.log('getting data...');
  }

  handleClick = (index) => {
    this.setState({selected: this.state.friends[index]});
  }

  render() {
    var { sendDisabled, selected } = this.state;
    const friendsListStyle = {
      position: 'fixed',
      float: 'right',
      right: '3%',
      bottom: 0,
      marginBottom: 0,
    }

    return (
      <Grid divided='vertically' style={friendsListStyle}>
        <Grid.Row>
          <Grid.Column width={7}>
            <Messaging user={this.props.user} friend={selected} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Card >
              <Card.Content>
                <Card.Header>
                  Friends
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  {this.props.friends.map((friend, index) =>
                    <Feed.Event onClick={() => this.handleClick(index)}>
                      <Feed.Label image='elliot.jpg' />
                      <Feed.Content>
                        <Feed.Summary>
                          {friend.name}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  )}
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FriendsList;
