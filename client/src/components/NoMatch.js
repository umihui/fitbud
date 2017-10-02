import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

var NoMatch = () => (
  <div>
    <Segment size='huge' textAlign='center' style={{minHeight: 700, padding: '1em 0em'}} vertical>
      <Container text>
        <Header
          as='h1'
          content='404'
          color='red'
          style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
        />
        <Header
          as='h2'
          content='Where are you going?'
          color='red'
          style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
      </Container>
    </Segment>

  </div>
)

export default NoMatch;