import React from 'react';
import logo from './../imgs/735145cfe0a4.png';
import { Link } from 'react-router-dom';
import profile from './../imgs/default.jpg';
import { connect } from 'react-redux';
import { logOut } from '../actions';
const Header = (props) => {
  const { userData } = props.auth;
  if (!props.auth.isSignedIn) {
    return <div></div>;
  }
  const handleLogout = async (e) => {
    e.preventDefault();
    await props.logOut();
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header-img" src={logo} alt="InstantGram logo" />
      </Link>
      <div className="header-search">
        <label className="header-search-label">
          🔎
          <input type="text" className="header-search-input" />
        </label>
      </div>

      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <Link to={`/user/${userData.userId}`} className="btn">
        <img className="profile-img" src={profile} alt="Profileimg"></img>
      </Link>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, { logOut })(Header);
