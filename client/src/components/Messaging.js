import React, { Component } from 'react';
import { Input, Form, Button, Card, Feed, Sticky, Transition } from 'semantic-ui-react';

class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      messages: [],
      sendDisabled: true,
      input: ''
    }

    this.firebase = window.firebase;
    this.database = window.firebase.database();
  }

  componentDidMount() {
    this.setState({sendDisabled: false});
    this.setState({visible: true});
  }

  componentWillReceiveProps(nextProps) {
    var user = this.props.user;
    var current = this.props.friend;
    var next = nextProps.friend;
    if (!next) return;
    if (!current) this.updateMessages(user, next);
    else if (current.id !== next.id) {
      this.database.ref(`chats/${user.id}/${current.id}`).off();
      this.updateMessages(user, next)
      this.setState({messages: []});
    }
  }

  writeMessage = (message) => {
    var userId = (this.props.user && this.props.user.id) || null;
    var friendId = (this.props.friend && this.props.friend.id) || null;
    var payload = {
      userId: userId,
      userName: this.props.user.name,
      message: message,
      createdAt: Date.now()
    }
    console.log(payload);
    this.database.ref(`chats/${userId}/${friendId}`).push().set(payload);
    this.database.ref(`chats/${friendId}/${userId}`).push().set(payload);
  }

  updateMessages = (user, friend) => {
    var userId = (user && user.id) || null;
    var friendId = (friend && friend.id) || null;
    this.database.ref(`chats/${userId}/${friendId}`).on('child_added', (data) => {
      this.setState((prevState) => {
        let newMessages = prevState.messages;
        newMessages.push(data.val());
        return {message: newMessages};
      });
    });
  }

  handleChange = (e, data) => {
    this.setState({input: data.value});
  }

  handleSubmit = (e) => {
    this.setState({input: ''});
    this.writeMessage(this.state.input);
  }

  render() {
    var { sendDisabled, messages } = this.state;
    // console.log('messsages', messages);

    const messagingStyle = {
      height: '400px',
      overflowY: 'auto'
    }

    return (
      [<Card raised={true}>
        <Card.Content>
          <Card.Header>
            {(this.props.friend && this.props.friend.name) || ''}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed style={messagingStyle}>
            {messages.map(message =>
              <Feed.Event>
                <Feed.Label image='elliot.jpg' />
                <Feed.Content>
                  <Feed.Date content='1 day ago' />
                  <Feed.Summary>
                    {message.message}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            )}
          </Feed>
        </Card.Content>
        <Form onSubmit={this.handleSubmit}>
          <Input disabled={sendDisabled} action={{icon: 'send'}} fluid={true}
            placeholder='Message...' onChange={this.handleChange}
            value={this.state.input} />
        </Form>
      </Card>]
    );
  }
}

export default Messaging;
