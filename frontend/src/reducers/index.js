import { combineReducers } from 'redux';
const auth = (state = { error: undefined, isSignedIn: false }, action) => {
  switch (action.type) {
    case 'SIGN_UP':
    case 'LOG_IN':
    case 'FETCH_USER':
      return {
        ...state,
        isSignedIn: true,
        userData: {
          accessToken: action.payload.accessToken,
          userId: action.payload._id,
          name: action.payload.name,
          photo: action.payload.photo,
          userName: action.payload.userName,
        },
      };

    case 'SIGN_OUT':
      return {
        ...state,
        userData: null,
        isSignedIn: false,
      };

    default:
      return { ...state };
  }
};
const personData = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PERSON':
      return {
        ...state,
        personData: {
          userId: action.payload._id,
          name: action.payload.name,
          photo: action.payload.photo,
          userName: action.payload.userName,
        },
      };
    default:
      return { ...state };
  }
};

const errorHandler = (state = { error: undefined }, action) => {
  switch (action.type) {
    case 'ERROR':
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};
export default combineReducers({
  personData,
  errorHandler,
  auth,
});
