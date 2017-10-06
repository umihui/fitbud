import React, { Component } from 'react';
import { Container, Grid, Header, Image, Segment, Button, Transition, Label, Message } from 'semantic-ui-react';
import { Form, Input } from 'formsy-semantic-ui-react';

// import { Card, Container, Icon, Image, List } from 'semantic-ui-react';

class CreateListing extends Component {
  state = {visible: false}

  componentDidMount() {
    this.setState({visible: true})
  }

  render() {
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

    const errorLabel = <Label color="red" pointing/>;

    const titleInput = (
      <Input
        name="title"
        placeholder="Title"
        type='text'
        icon="sticky note"
        iconPosition="left"
        required
        validations={{
          minLength: 8,
          isWords: true
        }}
        validationErrors={{
          minLength: 'Minimum of 8 characters',
          isDefaultRequiredValue: 'Title is required',
          isWords: 'Only letters allowed for title'
        }}
        errorLabel={ <div style={ styles.customErrorLabel }/> }
        rootStyle={ styles.formElement }
      />
    );

    const locationInput = (
      <Input
        name="location"
        placeholder="Workout location"
        type='text'
        icon="map"
        iconPosition="left"
        required
        validations={{
          isWords: true
        }}
        validationErrors={{
          isDefaultRequiredValue: 'Location is required',
          isWords: 'Only letters allowed for location'
        }}
        errorLabel={ <div style={ styles.customErrorLabel }/> }
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
                Find your next buddy
                </Header>
              <Segment>
              <Form size='large'
                    error={this.state.formError}
                    noValidate
                    onValidSubmit={this.onValidSubmit}
              >
                { titleInput }
                { locationInput }
                <Button loading={this.state.submit} color='teal' size='large' fluid>CREATE AN ACCOUNT</Button>                                                                                                                                                          
                <Message error 
                         header={this.state.errorHeader}
                         content={this.state.errorContent}
                />
              </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </Transition>   
    )
  }
}

export default CreateListing
