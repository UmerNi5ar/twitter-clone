import axios from 'axios';
import jwtDecode from 'jwt-decode';
import JSCookie from 'js-cookie';
// import { accessToken } from '../actions';
import { refreshToken } from '../actions';

const server = axios.create();
server.interceptors.request.use(
  async (req) => {
    req.withCredentials = true;

    let accessToken = JSCookie.get('AccessToken');

    let currentDate = new Date();
    let decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const response = await axios.post(
        '/api/v1/users/getAccessToken',
        {
          refreshToken,
        },
        {
          withCredentials: true,
        }
      );

      accessToken = response.data.accessToken;
    }
    req.headers['Authorization'] = `Bearer ${accessToken}`;

    return req;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
// server.interceptors.response.use(
//   (res) => {},
//   (error) => {
//     console.log(error);

//     throw error;
//   }
// );

export default server;
