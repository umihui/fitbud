import React, { Component } from 'react';
import { Form, Input } from 'formsy-semantic-ui-react';
import { Container, Grid, Header, Image, Segment, Button, Divider, Icon, Transition, Label, Message } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

const styles = {
  root: {
    marginTop: 18,
    // padding: '0 24px 24px 24px',
  },

  customErrorLabel: {
    color: '#f00',
    textAlign: 'center',
  },
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      submit: false,
      formData: null
    }

    console.log(this.props);
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
    //   var formData = {
    //     name: user.displayName,
    //     password: user.uid,
    //     passwordConfirm: user.uid,
    //     username: user.email
    //   }
    //   // profilePicture: user.photoURL
    //
    //   this.onValidSubmit(formData);
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

  onValidSubmit = (formData) => {
    this.setState({submit: true});

    var options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(formData)
    }

    fetch('/register', options)
      .then(response => {
        if (response.ok) {
          this.props.history.replace('/login');
        } else {
          this.setState({
            errorHeader: 'User already exists',
            errorContent: 'Please login instead',
            formError: true,
            submit: false
          })
        }
      })
  };

  render() {
    const errorLabel = <Label color="red" pointing/>;

    const nameInput = (
      <Input
        name="name"
        placeholder="Full name"
        type='text'
        icon="id card outline"
        iconPosition="left"
        required
        validations={{
          isWords: true
        }}
        validationErrors={{
          isDefaultRequiredValue: 'Name is required',
          isWords: 'Only alphabetical characters allowed'
        }}
        errorLabel={ <Label basic color='red' pointing /> }
      />
    );

    const emailInput = (
      <Input
        ref={input => this.inputRef = input}
        autoFocus
        name="username"
        placeholder="E-mail"
        icon="mail"
        iconPosition="left"
        required
        validations="isEmail"
        validationErrors={{
          isEmail: 'Invalid email format',
          isDefaultRequiredValue: 'Email is Required',
        }}
        errorLabel={ <Label basic color='red' pointing /> }
        rootStyle={ styles.formElement }
      />
    );

    const passwordInput = (
      <Input
        name="password"
        placeholder="Password"
        type='password'
        icon="lock"
        iconPosition="left"
        required
        validations="minLength:8"
        validationErrors={{
          minLength: 'Minimum of 8 characters',
          isDefaultRequiredValue: 'Password is Required',
        }}
        errorLabel={ <Label basic color='red' pointing /> }
        rootStyle={ styles.formElement }
      />
    );

    const passwordConfirmInput = (
      <Input
        instantValidation
        name="passwordConfirm"
        placeholder="Confirm password"
        type='password'
        icon="lock"
        iconPosition="left"
        required
        validations={{
          minLength: 8,
          equalsField: 'password'
        }}
        validationErrors={{
          minLength: 'Minimum of 8 characters',
          isDefaultRequiredValue: 'Password is Required',
          equalsField: 'Passwords do not match'
        }}
        errorLabel={ <Label basic color='red' pointing /> }
        rootStyle={ styles.formElement }
      />
    );

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
                Signup today!
              </Header>
              <Form size='large'
                    error={this.state.formError}
                    noValidate
                    onValidSubmit={this.onValidSubmit}
              >
                { nameInput }
                { emailInput }
                <Form.Group widths='equal'>
                  { passwordInput }
                  { passwordConfirmInput }
                </Form.Group>
                <Button loading={this.state.submit} color='teal' size='large' fluid>Create Account</Button>
                {/* <Divider horizontal>Or</Divider>
                <Button onClick={this.fbRedirect} color='facebook' fluid size='large'>
                  <Icon name='facebook square' />Signup with Facebook
                </Button> */}
                <Message error
                         header={this.state.errorHeader}
                         content={this.state.errorContent}
                />
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </Transition>
    )
  }
}

export default Signup;
