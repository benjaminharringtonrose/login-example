// ACTION CREATORS

import firebase from 'firebase';

import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const firstNameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text,
  };
};

export const lastNameChanged = (text) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text,
  };
};

export const registerUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => registerUserSuccess(dispatch, user))
      .catch(() => registerUserFail(dispatch));
  };
};

const registerUserSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user,
  });
  Actions.main();
};

const registerUserFail = (dispatch) => {
  dispatch({
    type: REGISTER_USER_FAIL,
  });
};
