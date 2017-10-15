import React, { Component } from 'react';
import LoginButtonModal from './LoginButtonModal.js';
import ProfilePopup from './ProfilePopup.js';
import { Image, Label, Menu, Input, Button, Dropdown, Search } from 'semantic-ui-react';
import { NavLink, Link, Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';


class MainNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      value: '',
      results: {},
    };

    this.debouncedSearch = _.debounce((term, cb) => {
      var options = {
        method: 'GET',
        credentials: 'include',
      }
      return fetch('/search?term='+term, options)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        });
    }, 500, {'leading': true, 'trailing': false});

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
  }

  resetComponent () {
    this.setState({ 
      isLoading: false, 
      results: [], 
      value: '' 
    });
  }

  handleResultSelect (e, {result}) {
    if (result.cat === 'user') {
      this.props.handleUserSearch(result);
    } else {
      this.props.handleEventSearch(result);
      this.props.history.push('/listings');
    }
  };


  handleSearchChange (e, { value }) {
    this.setState({ 
      isLoading: true, 
      value 
    });

    this.debouncedSearch(value)
      .then(data => {

        var results = [];
        if (data[0].length !== 0) {
          results.push({
            name: 'Users', 
            results: []
          });
          data[0].forEach(val => {
            results[0].results.push({
              title: val.name, 
              description: val.email, 
              image: val.photo,
              cat: 'user',
            });
          });
        }
        if (data[1].length !== 0) {
          results.push({
            name: 'Postings', 
            results: []
          });
          data[1].forEach(val => {
            var temp = {
              title: val.title, 
              description: val.details,
              cat: 'event',
            };
            if (val.photo) {
              temp.image = val.photo;
            }
            results[results.length - 1].results.push(temp);
          });
        }

        this.setState({
          isLoading: false,
          results: results,
        });
      });
  }


  render() {
    const resultRenderer = ({ title, description, image, cat }) => {
      var $result = [];
      $result.push( (cat==='event' || title === this.props.user.name) ? 
        (image && <div key='image' className='image'><Image src={image} /></div>) : 
        (image && <div key='image' className='image'><ProfilePopup user={{photo:image, name:title}}/></div>));
      $result.push(
        (<div key='content' className='content'>
          {title && <div className='title'>{title}</div>}
          {description && <div className='description'>{description}</div>}
        </div>));
      return $result;
    }

    return (
      <Menu secondary size='huge' style={{marginBottom: 0}}>
        <Menu.Item exact name='home' as={NavLink} to='/' />
        <Menu.Item name='listings' as={NavLink} to='/listings' />
        <Menu.Item name='about' as={NavLink} to='/about' />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Search
              category
              loading={this.state.isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={this.state.results}
              value={this.state.value}
              resultRenderer={resultRenderer}
              {...this.props}
            />
          </Menu.Item>

          {!this.props.isAuthed && ([
            <Menu.Item style={{paddingLeft: '0px'}}>
              {/*<Button content='Log In' onClick={this.handleLoginClick} /> */}
              {/*<LoginButtonModal authenticate={this.props.authenticate}/> */}
              <Button as={Link} to='/login' content='Log In' />
            </Menu.Item>,
            <Menu.Item style={{paddingLeft: '0px'}}>
              <Button as={Link} to='/signup' color='teal' primary content='Sign Up' />
            </Menu.Item>
          ])}

          {this.props.isAuthed && ([
            <Menu.Item style={{paddingLeft: '0px'}}>
              <Button as={Link} to='/create' color='teal' color='teal' content='Create Listing' />
            </Menu.Item>,
            <Dropdown text={this.props.user.name} className='link item' pointing>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/dashboard'>Dashboard</Dropdown.Item>
                <Dropdown.Item>Referral</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.props.signoff} as={Link} to='/'>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ])}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(MainNav);
