import { put, call } from 'redux-saga/effects';
import firebase from 'firebase';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../actions/types';

export function* loginUser(action) {
  try {
    const auth = firebase.auth();
    const data = yield call(
      [auth, auth.signInAndRetrieveDataWithEmailAndPassword],
      action.email,
      action.password
    );
    yield put({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: LOGIN_USER_FAIL });
  }
}
