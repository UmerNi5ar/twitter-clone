import server from '../api/axiosServer';
import createBrowserHistory from './../history';
// import JSCookie from 'js-cookie';
import axios from 'axios';

export let accessToken = null;
export let refreshToken = null;

export const signUp = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/users/signup', body, {
        withCredentials: true, //dont remove this brother🤦‍♂️
      });
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      response.data.refreshToken = undefined;

      dispatch({ type: 'SIGN_UP', payload: response.data });
      createBrowserHistory.push('/');
    } catch (error) {
      console.log(error);
    }
  };
};
export const login = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/users/login', body, {
        withCredentials: true, //dont remove this brother🤦‍♂️
      });
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      response.data.refreshToken = undefined;

      dispatch({ type: 'LOG_IN', payload: response.data });
      createBrowserHistory.push('/');
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });

      console.log(error);
    }
  };
};
export const fetchUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await server.post('/api/v1/users/fetchUser', { token });
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      response.data.refreshToken = undefined;

      dispatch({ type: 'FETCH_USER', payload: response.data.userData });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      createBrowserHistory.push('/handleError');
    }
  };
};
export const fetchPerson = (id) => {
  return async (dispatch) => {
    try {
      const response = await server.post('/api/v1/users/fetchPerson', {
        id,
      });
      dispatch({ type: 'FETCH_PERSON', payload: response.data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };
};
export const logOut = (body) => {
  return async (dispatch) => {
    let response;
    try {
      response = await server.delete('/api/v1/users/logout');
      accessToken = null;
      refreshToken = null;

      dispatch({ type: 'SIGN_OUT', payload: response.data });
      createBrowserHistory.push('/signup');
    } catch (error) {
      // dispatch({ type: 'ERROR', payload: response.message });
      console.log(error);
    }
  };
};
