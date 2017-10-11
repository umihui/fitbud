import React, { Component } from 'react';
import { Form, Container, Grid, Header, Image, Segment, Button, Message, Transition } from 'semantic-ui-react';
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

    console.log(this.props);
  }

  componentDidMount() {
    this.setState({
      visible: true
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

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
        if (user && user[0].email) {
          this.props.authenticate(user[0]);
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
