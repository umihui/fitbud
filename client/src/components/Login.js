import React, { Component } from 'react';
import { Form, Container, Grid, Header, Image, Segment, Button, Divider, Icon, Message, Transition } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import FacebookLoginButton from './facebook-login-button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      submit: false,
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    // window.firebase.auth().getRedirectResult().then((result) => {
    //   if (result.credential) {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     var token = result.credential.accessToken;
    //     console.log(token);
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    //   console.log(user.email);
    //   console.log(user.uid);
    //   this.state.email = user.email;
    //   this.state.password = user.uid;
    //
    //   this.handleSubmit();
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  }

  componentDidMount() {
    this.setState({
      visible: true
    });
  }

  // fbRedirect = (e) => {
  //   e.preventDefault();
  //   var firebase = window.firebase;
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithRedirect(provider);
  // }

  handleSubmit = (event) => {
    if (event) event.preventDefault();

    this.setState({submit: true});

    var payload = {
      username: this.state.email,
      password: this.state.password
    }

    var options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload)
    }

    // console.log(this.props);

    fetch('/login', options)
      .then(response => {
        if (response.ok) {
          this.setState({
            submit: false
          });
          return response.json();
        } else {
          this.setState({
            errorHeader: 'Incorrect credentials',
            errorContent: 'Please try again',
            formError: true,
            submit: false
          })
        }
      }).then(user => {
        if (user && user.email) {
          this.props.authenticate(user);
          this.props.getFriends();
          this.props.history.replace('/');
        }
      });
  }

  handleInputChange = (event) => {
    console.log(`${event.target.name} is changing to ${event.target.value}`);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Transition visible={this.state.visible} animation='fade' duration={1000}>
        <div className='login-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 90%;
            }
          `}</style>
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 500 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Log in to your account
              </Header>
              <Form size='large' onSubmit={this.handleSubmit} error={this.state.formError}>
                <Segment>
                  <Form.Input
                    autoFocus='true'
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    name='email'
                    onChange={this.handleInputChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    onChange={this.handleInputChange}
                  />

                  <Button loading={this.state.submit} color='teal' fluid size='large'>Log In</Button>
                  <Divider horizontal>Or</Divider>
                  <FacebookLoginButton />

                </Segment>
                <Message error
                         header={this.state.errorHeader}
                         content={this.state.errorContent}
                />
              </Form>
              <Message>
                New to us? <Link to='/signup'>Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Transition>
    )
  }
}

export default Login;
