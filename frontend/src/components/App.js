import React from 'react';
import LoginPage from './LoginPage';
import createBrowserHistory from '../history';
import { Router, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import JSCookie from 'js-cookie';

import Loading from './Loading';
// import MyAccount from './MyAccount';
// import OtherAccount from './OtherAccount';
// import jwtDecode from 'jwt-decode';
// import axios from 'axios';
import { fetchUser } from '../actions';
import { connect } from 'react-redux';
class App extends React.Component {
  async componentDidMount() {
    const accessToken = JSCookie.get('AccessToken');
    if (!accessToken) {
      return createBrowserHistory.push('/signup');
    }
    createBrowserHistory.push('/loading');
    await this.props.fetchUser();
    createBrowserHistory.push('/');
  }
  render() {
    return (
      <div>
        <Router history={createBrowserHistory}>
          <Header />
          <Route path="/loading" exact component={Loading} />
          <Route
            path={['/login', '/signup']}
            exact
            component={LoginPage}
          ></Route>
          <Route
            path="/"
            exact
            component={Main} // When want to pass addtional props into
          ></Route>
          {/* 
          <Route path="/user/:id" component={OtherAccount} />
          <Route path="/:id" component={MyAccount} /> */}
        </Router>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return { state };
// };
export default connect(null, { fetchUser })(App);
