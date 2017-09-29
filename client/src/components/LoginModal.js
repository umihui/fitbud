import React, { Component } from 'react';
import { Modal, Image, Button, Form } from 'semantic-ui-react';

class LoginModal extends Component {
	state = {submit: false};

	handleSubmit = () => {
		console.log('submitting...');
		this.setState({submit: true});
	};

	render(props) {
		const {openModal, handleModalClose} = this.props;
		return (
			<div>
			<Modal dimmer='blurring' size='tiny' open={openModal} onClose={handleModalClose} closeIcon>
        <Modal.Header>Log In</Modal.Header>
          <Modal.Content>
            <Form error onSubmit={this.handleSubmit.bind(this)}>
                <Form.Input icon='user' iconPosition='left' 
                	placeholder='Username or email address' 
                	label='Username' type='text' />
                <Form.Input icon='lock' iconPosition='left' 
                	placeholder='Password' label='Password' 
                	type='password' />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={handleModalClose}>
              Nope
            </Button>
            <Button loading={this.state.submit} positive content="Log In" onClick={handleModalClose} />
          </Modal.Actions>
        </Modal>
      </div>
		)
	}
}

export default LoginModal;