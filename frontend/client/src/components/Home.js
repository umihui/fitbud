import React from 'react';
import { Segment, Container, Header, Button, Icon } from 'semantic-ui-react';

const Home = () => (
  <Segment inverted textAlign='center' vertical style={{ minHeight: 700, padding: '1em 0em' }}> 
    <Container text>
      <Header
        as='h1'
        content='Fitbud'
        inverted
        style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
      />
      <Header
        as='h2'
        content='Life is better with a buddy.'
        inverted
        style={{ fontSize: '1.7em', fontWeight: 'normal' }}
      />
      <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Container>
  </Segment>
);

export default Home;