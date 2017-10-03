import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class LoginButtonModal extends Component {
	constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: '',
      password: '',
      fireRedirect: false
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

    console.log(payload);

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

	};

  handleModalClose = () => this.setState({open: false});
  handleModalOpen = () => this.setState({open: true});
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

	render(props) {
    var { fireRedirect } = this.state;

		return (
			<Modal open={this.state.open} dimmer='blurring' trigger={<Button onClick={this.handleModalOpen}>Login</Button>} 
       onClose={this.handleModalClose} size='tiny' closeIcon>
       <Modal.Header>Log In</Modal.Header>

        <Modal.Content>
          <Form loading={this.state.submit} onSubmit={this.handleSubmit.bind(this)}>
              <Form.Input icon='user' iconPosition='left' 
                placeholder='Username or email address' 
                label='Username' type='text' name='username' onChange={this.handleInputChange} />
              <Form.Input icon='lock' iconPosition='left' 
                placeholder='Password' label='Password' 
                type='password' name='password' onChange={this.handleInputChange} />
              <Form.Button style={{display: 'none'}}>Log In</Form.Button>
              {fireRedirect && (
                <Redirect to={'/'}/>
              )}
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color='black' onClick={this.handleModalClose}>
            Nope
          </Button>
          <Button positive content="Log In" />
        </Modal.Actions>
      </Modal>    
		)
	}
}

export default LoginButtonModal;