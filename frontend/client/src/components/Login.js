import React, { Component } from 'react';
import { Form, Container, Grid, Header, Image, Segment, Button, Message, Transition } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

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
      .then(response => response.json())
      .then(function (data) {
        console.log('response', data);
        this.props.authenticate();
        this.setState({
          submit: false
        });
        this.props.history.replace('/');
      }.bind(this))
      .catch(err => console.log(err));
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
                <Image src='logo.svg' />
                {' '}Log-in to your account
              </Header>
              <Form size='large' onSubmit={this.handleSubmit}>
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

                  <Button loading={this.state.submit} color='teal' fluid size='large'>Login</Button>
                </Segment>
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