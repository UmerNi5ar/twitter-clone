import React from 'react';
import { connect } from 'react-redux';

class UserAccount extends React.Component {
  render() {
    return (
      <div>
        <div></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(UserAccount);
