import React, { Component } from 'react';
import { Form, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      submit: false,
      username: '',
      password: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({submit: true});

    var payload = {
      username: this.state.username,
      password: this.state.password
    }

    var options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    }

    console.log(this.props);

    fetch('/login', options)
      .then(response => response.json())
      .then(function (data) {
        console.log('response', data);
        console.log(this.props);
        this.props.authenticate();
        this.setState({
          submit: false,
          fireRedirect: true
          // open: false
        });
      }.bind(this))
      .catch(err => console.log(err));
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    var { fireRedirect } = this.state;

    return (
      <Container>
        <Form loading={this.state.submit} onSubmit={this.handleSubmit.bind(this)}>
          <Form.Input icon='user' iconPosition='left' width={5}
            placeholder='Username or email address' 
            label='Username' type='text' name='username' onChange={this.handleInputChange} />
          <Form.Input icon='lock' iconPosition='left' width={5}
            placeholder='Password' label='Password' 
            type='password' name='password' onChange={this.handleInputChange} />
          <Form.Button>Log In</Form.Button>
          {fireRedirect && (
            <Redirect to={'/'}/>
          )}
        </Form>
      </Container>
    )
  }
}

export default Login;