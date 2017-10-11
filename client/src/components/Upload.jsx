import React, { Component } from 'react';
import { Input, Icon } from 'semantic-ui-react';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      fname: 'Select File',
    }
    this.uploadFile = this.uploadFile.bind(this)
  }

  uploadFile (inf = this.props.inf, path= this.props.path) {
    // console.log('initiate upload',this.state.file);
    let data = new FormData();

    for (let key in this.props.inf) {
      data.append(key, this.props.inf[key]);
    }

    data.append('file', this.state.file, this.state.file.name);

    var options = {
      method: 'POST',
      credentials: 'include',
      body: data,
    }

    fetch(path, options)
      .then(response => {
        if (response.ok) {
          console.log('data sent to server');
        } 
      });
  }

  setFile(event) {
    var fname = event.target.files[0] ? event.target.files[0].name : 'Select File';

    this.setState({
      file: event.target.files[0],
      fname: fname,
    });
  }

  selectFile(event, data) {
    this.inputElement.click();
  }

  upload(event) {
    this.uploadFile();
  }

  render() {

    return (
      <div>
        <Input onClick={this.selectFile.bind(this)} readOnly placeholder={this.state.fname} action={{icon: 'upload', onClick:this.upload.bind(this)}}/>
        <input ref={input => this.inputElement = input} id="fileInput" onClick={this.testing} style={{visibility: 'hidden'}} type="file" onChange={this.setFile.bind(this)} />
      </div>
    );
  }

}

export default Upload;

// <input type="file" onChange={this.setFile.bind(this)}/> <button onClick={this.uploadFile.bind(this)}>upload</button>

// 