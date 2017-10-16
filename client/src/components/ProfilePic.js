import React, { Component } from 'react';
import { Button, Container, Image, List, Popup } from 'semantic-ui-react';

class ProfilePic extends Component {
  constructor (props) {
    super(props);

    this.state = {
      file: '',
      imgSrc: true,
    }

    this.clickImg = this.clickImg.bind(this);
    this.setFile = this.setFile.bind(this);
    this.noPic = this.noPic.bind(this);
  }

  clickImg() {
    this.inputElement.click();
  }

  setFile(e) {
    this.setState({
      file: e.target.files[0],
    });
    //console.log('file set -> start upload image');
    var data = new FormData();
    // data.append('username', '');

    data.append('file', e.target.files[0], e.target.files[0].name);

    fetch ('/profile/pic', {
      method: 'POST',
      credentials: 'include',
      body: data,
    }).then(res => {
      if(res.ok) {
        console.log('img sent to server');
      }
    });
  }

  noPic() {
    console.log('page load error');
    this.setState({
      imgSrc: false,
    });
  }

  render() {

    return (
      <Container style={{margin: '30px'}}>

        <Popup trigger={<Image onError={this.noPic} onClick={this.clickImg} src={this.props.user} size='small' shape='circular' centered style={{margin: 'auto'}} />}
        content='click picture to upload'
        position='right center' >
        </Popup>
        <input ref={input => this.inputElement = input} id="fileInput" style={{visibility: 'hidden'}} type="file" onChange={this.setFile} accept="image/png, image/jpeg"/>


      </Container>
    );
  }
}



export default ProfilePic;
