import React, { Component } from 'react';
import { Header, Segment, Input, Container, Image, List, Button, Form, TextArea } from 'semantic-ui-react';



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
    this.handleSubmit =this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('text submit');
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault()
      console.log('Button received click with keyboard')
    }
  }

  render() {

    // console.log('profile render', this.props.user);
    const { user } = this.props;

    const NoDescription = (props) => (
      <Container style={{width: '250px'}}>
        <Form onKeyPress={props.handleKeyPress}>
            <TextArea placeholder='Tell us more about yourself...' style={{ minHeight: 70 }}/>
        </Form>
      </Container>
    )

    const ShowDescription = (props) => (
      <Container style={{width: '400px'}} textAlign='center'>
        <p>{props.description}</p>
      </Container>
    )

    const NameHeader = () => (
      <div>
        <Header as='h2' textAlign='center' style={{margin: '10px'}}>
          <Header.Content>
            {user.name}
          </Header.Content>
        </Header>
        {user.description ?
          <ShowDescription description={user.description} handleSubmit={this.handleSubmit}/>
          : <NoDescription handleKeyPress={this.handleKeyPress} />
        }
      </div>
    )


    return (

      <Container style={{"textAlign": "center"}}>
        { user ?
          NameHeader()
        : <h2></h2>
        }
      </Container>

    );
  }
}

export default Profile;
{/* <Button onClick={props.handleSubmit} icon='write' color='white' floated='right'/> */}
