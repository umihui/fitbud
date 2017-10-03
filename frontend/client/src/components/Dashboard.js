import React, { Component } from 'react';
import { Card, Container, Icon, Image, List } from 'semantic-ui-react';

class Dashboard extends Component {
  images = ['daniel.jpg', 'elliot.jpg', 'matthew.png', 'rachel.png'];

  render() {
    var { listings } = this.props;
    console.log(listings);

    return (
      <Container style={{marginTop: '20px'}}>

        <Container style={{margin: '30px'}}>
          <Image src={'/' + this.images[Math.floor(Math.random() * this.images.length)]} size='small' shape='circular' centered style={{margin: 'auto'}} />
          <Container style={{"text-align": "center"}}>
            <List style={{margin: '10px'}}>
              <List.Item>
                <List.Header>Username</List.Header>
              </List.Item>
              <List.Item>
                Citytown, USA
              </List.Item>
            </List>
          </Container>
        </Container>

        <Card.Group itemsPerRow={3}>
          {listings.map(listing => (
            <Card>
              <Card.Content>
                <Image src={'/' + this.images[Math.floor(Math.random() * this.images.length)]} size='mini' floated='left'/>
                <Card.Header>{listing.posted_by}</Card.Header>
                <Card.Meta>{listing.activity}</Card.Meta>
                <Card.Description>{`Schedule on ${listing.scheduled} for ${listing.duration} hours`}</Card.Description>
                <Card.Content extra>
                  {(<a><Icon name='user' /> {listing.buddies} {listing.buddies === 1 ? 'buddy' : 'buddies'} </a>)}
                </Card.Content>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    )
  }
}

export default Dashboard;

//profile pic
  //username
//
