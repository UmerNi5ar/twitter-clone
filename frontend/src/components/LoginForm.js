import React, { useState } from 'react';
import { login } from '../actions';
import { connect } from 'react-redux';
// import createBrowserHistory from '../history';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    await props.login({
      email: email,
      password: password,
    });
    // createBrowserHistory.push(props.dom.history.location.pathname);
  };

  return (
    <div>
      <form className="sign-form ">
        <p className="sign-form-text">{`Sign In :`}</p>
        <div className="sign-fields">
          <label>Email</label>
          <input
            className="sign-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></input>

          <label>Password</label>
          <input
            className="sign-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div style={{ fontSize: '0.7rem' }}>
            Dont have an account?{' '}
            <Link to="/signup">
              <u style={{ color: '#343a40' }}>Register Now</u>
            </Link>
          </div>
        </div>

        <button onClick={(e) => handleSubmit(e)} className="sign-form-submit">
          Login
        </button>
      </form>
    </div>
  );
};
// const mapStateToProps = (state) => {
//   return { state };
// };
export default connect(null, { login })(LoginForm);
