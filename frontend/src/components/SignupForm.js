import React, { useState } from 'react';
import { signUp } from '../actions';
import { connect } from 'react-redux';
// import createBrowserHistory from '../history';
import { Link } from 'react-router-dom';

const SignupForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await props.signUp({
      name: name,
      password: password,
      userName: userName,
      email: email,
      passwordConfirm: passwordConfirm,
    });
    // createBrowserHistory.push(props.dom.history.location.pathname);
  };

  return (
    <div>
      <form className="sign-form ">
        <p className="sign-form-text">{`Signup now to get started`}</p>
        <div className="sign-fields">
          <label>Email</label>
          <input
            className="sign-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></input>

          <label>Name</label>
          <input
            className="sign-name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>

          <label>Username</label>
          <input
            className="sign-user-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>

          <label>Password</label>
          <input
            className="sign-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <label>Confirm Password</label>
          <input
            className="confirm-password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></input>
          <div style={{ fontSize: '0.7rem' }}>
            Already registered? Login{' '}
            <Link to="/login">
              <u style={{ color: '#343a40' }}>Here</u>
            </Link>
          </div>
        </div>

        <button onClick={(e) => handleSubmit(e)} className="sign-form-submit">
          Register
        </button>
      </form>
    </div>
  );
};
// const mapStateToProps = (state) => {
//   return { state };
// };
export default connect(null, { signUp })(SignupForm);
