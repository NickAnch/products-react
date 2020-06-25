import axios from '../../axios/axiosProduct';
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "./actionTypes";

const apiKey = 'AIzaSyCCej3NIySYwgRPnQ7LKHV-3i06FmnOmlo';

export function auth(email, password) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(url, authData);
    const data = response.data;
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('react-app-token', data.idToken);
    localStorage.setItem('react-app-token-expires', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));

  }
}

export function logout() {
  localStorage.removeItem('react-app-token');
  localStorage.removeItem('react-app-token-expires');
  return { type: AUTH_LOGOUT };
}


export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000);
  };
}


export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('react-app-token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('react-app-token-expires'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
