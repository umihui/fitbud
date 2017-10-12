import * as React from 'react';
import { Button,Icon} from 'semantic-ui-react';

class FacebookLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.loginFacebook = this.loginFacebook.bind(this);
  }

  loginFacebook(e) {
    e.preventDefault();
    console.log('FACEBOOK');
    fetch('/auth/facebook', { method: 'GET',
               mode: 'no-cors' });
  }

  render() {
    return (
      <Button href='http://localhost:3001/auth/facebook' fluid size='large'><i class="facebook icon"></i>Facebook Login</Button>
    );
  }
}

export default FacebookLoginButton;
