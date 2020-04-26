import { fork, takeLatest } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../actions/types';

export function* loginUserAsync(action) {
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

function* watchUserAuthentication() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserAsync);
}

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
  yield takeLatest(LOGIN_USER_REQUEST, loginUserAsync);
}
