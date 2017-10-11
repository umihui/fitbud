import React, { Component } from 'react';


class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
    }
  }

  uploadFile (inf = this.props.inf, path= this.props.path) {
    console.log('initiate upload',this.state.file);

    let data = new FormData();

    for (let key in this.props.inf) {
      data.append(key, this.props.inf[key]);
    }

    data.append('file', this.state.file, this.state.file.name);

    // Axios.post(path, data)
    //   .then(res => {
    //     console.log('file upload complete');
    //     // reload file list
    //     return Axios.get('/file', {params: {roomname: this.props.room.roomname}})
    //   }).catch(err => {
    //     console.log('failed to upload', err);
    //   }).then(res => {
    //     console.log(res.data, this.props.room.roomname);
    //     this.props.updateFiles(res.data);
    //   });

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
    // console.log('setFile', event.target.files);
    this.setState({
      file: event.target.files[0],
    });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.setFile.bind(this)}/> <button onClick={this.uploadFile.bind(this)}>upload</button>
      </div>
    );
  }

}

export default Upload;



