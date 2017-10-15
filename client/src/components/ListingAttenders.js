import React, { Component } from 'react';
import { Modal, Header, Button, Image, Icon, Grid, Segment, Popup } from 'semantic-ui-react';
import ProfilePopup from './ProfilePopup.js'

class ListingAttenders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attenders:[],
      attendersList:[]
    }
    this.getRequestUsers = this.getRequestUsers.bind(this)
  }

  componentDidMount() {
    this.getRequestUsers();
  }

  getRequestUsers() {
      fetch(`/postings/requests/${this.props.postId}`, { credentials: "include" })
      .then( response => response.json())
      .then( attenders => {
        console.log('attenders:',attenders)
        this.setState({ attenders: attenders})
        this.getRequestUsersData(attenders);
      })
      // .then( () => console.log('state:',this.state))
  }

  getRequestUsersData() {
    var attenders = this.state.attenders.map(ele => ele.userId);
    if(attenders.length !== 0) {
      attenders = JSON.stringify(attenders)
      fetch(`/postings/multiplyId/${attenders}`,{ credentials: "include" })
      .then(response => response.json())
      .then(response => {
        this.setState({ attendersList: response})
      })
      .catch( err => console.log('err from get request users data:', err))
    }
  }

  render() {
    return (
      <Grid>
        { this.state.attendersList.map((ele, index) => {
          return (
                <ProfilePopup currentUser={this.props.currentUser} user={ele} key={index}/>
            )
          }) 
        }
      </Grid>
    )
  }
}

export default ListingAttenders;