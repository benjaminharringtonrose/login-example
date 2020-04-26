import { fork, takeLatest } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from '../actions/types';

// LOGIN SAGA

export function* loginUserSaga(action) {
  try {
    const { email, password } = action.payload;
    const auth = firebase.auth();
    const data = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password
    );
    yield put(loginUserSuccess(data));
    Actions.main();
  } catch (error) {
    yield put(loginUserFail(error));
  }
}

function loginUserSuccess(data) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
}

function loginUserFail(error) {
  return {
    type: LOGIN_USER_FAIL,
    payload: error,
  };
}

// LOGOUT SAGA

export function* logoutUserSaga() {
  try {
    yield call(() => firebase.auth().signOut());
    yield put(logoutUserSuccess());
    Actions.auth();
  } catch (error) {
    yield put(logoutUserFail(error));
  }
}

function logoutUserSuccess() {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
}

function logoutUserFail(error) {
  return {
    type: LOGOUT_USER_FAIL,
    payload: error,
  };
}

// REGISTER SAGA

export function* registerUserSaga(action) {
  try {
    const { email, password } = action.payload;
    const auth = firebase.auth();
    const data = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password
    );
    yield put(registerUserSuccess(data));
    Actions.main();
  } catch (error) {
    yield put(registerUserFail(error));
  }
}

function registerUserSuccess(data) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
}

function registerUserFail(error) {
  return {
    type: REGISTER_USER_FAIL,
    payload: error,
  };
}

function* watchUserAuthentication() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(LOGOUT_USER_REQUEST, logoutUserSaga);
  yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
}

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
}
