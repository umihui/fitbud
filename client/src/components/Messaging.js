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

  componentWillMount() {


    // this.writeMessage(1, 'Victor', 'Hey, there');
    this.initMessages();
    this.updateMessages();
  }

  componentDidMount() {
    this.setState({visible: true})
  }

  initMessages = () => {
    // let userId = this.firebase.auth().currentUser.uid;
    this.database.ref('chats/').once('value').then(snapshot => {
      // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      this.setState({messages: snapshot.val()});
      this.setState({sendDisabled: false});
    });
  }

  writeMessage = (userId, name, message) => {
    this.database.ref('chats/' + userId).set({
      userId: userId,
      userName: name,
      message: message
    });
  }

  updateMessages = () => {
    this.database.ref('chats/').on('child_added', (data) => {
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

  handleSubmit = () => {
    this.writeMessage(10, 'Victor', this.state.input);
  }

  render() {
    var { sendDisabled } = this.state;

    return (
      <Transition visible={this.state.visible} duration={1000} animation='fade'>
        <Sticky bottomOffset={0} >
          <Card centered={true}>
            <Card.Content>
              <Card.Header>
                Recent Activity
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                {this.state.messages.map(message =>
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
              <Input disabled={sendDisabled} action={{icon: 'send'}}
                placeholder='Message...' onChange={this.handleChange} />
            </Form>
          </Card>
        </Sticky>
      </Transition>
    );
  }
}

export default Messaging;
