import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

class loginPage extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="container-login">
        <div className="left-side">
          {this.props.location.pathname === '/signup' ? (
            <div className="left-side-content">
              <h2>'Sign up Now!'</h2>
              <p>Though its just a insta clone😁</p>
            </div>
          ) : (
            <div className="left-side-content">
              <h2>Hola Mundo!</h2>
            </div>
          )}
        </div>
        {this.props.location.pathname === '/signup' ? (
          <div className="right-side">
            <SignupForm dom={this.props} />
          </div>
        ) : (
          <div className="right-side">
            <LoginForm dom={this.props} />
          </div>
        )}
      </div>
    );
  }
}
export default loginPage;
