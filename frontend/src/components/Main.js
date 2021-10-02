import React from 'react';
import { connect } from 'react-redux';
class Main extends React.Component {
  render() {
    const { userData } = this.props.auth;
    return (
      <div className="container-main">
        <div className="posts">
          {this.props.auth.isSignedIn
            ? `Signed In as ${userData.name}🤞`
            : `Sign Up Now fella`}
        </div>
        <div className="friend-req">Friend Requests</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Main);
