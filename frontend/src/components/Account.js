import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
class UserAccount extends React.Component {
  // componentDidMount() {
  //   if (this.props.match.params.id === this.props.auth.userData.userId) {

  //   } else {
  //   }
  // }

  render() {
    console.log(this.props);
    const { userData } = this.props.auth;

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
