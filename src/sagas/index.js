import { fork, takeLatest } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import firebase from 'firebase';
import * as types from '../actions/types';

export function* loginUser(action) {
  try {
    console.log('1');
    // yield put({ type: LOGIN_USER });
    console.log('2');
    const auth = firebase.auth();
    const data = yield call(
      [auth, auth.signInAndRetrieveDataWithEmailAndPassword],
      action.email,
      action.password
    );
    console.log('3');
    yield put(loginUserSuccess(data));
  } catch (error) {
    console.log('4');
    yield put(loginUserFail(error));
  }
}

function loginUserSuccess(data) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: data,
  };
}

function loginUserFail(error) {
  return {
    type: types.LOGIN_USER_FAIL,
    payload: error,
  };
}

function* watchUserAuthentication() {
  yield takeLatest('LOGIN_USER', loginUser);
  // TODO
  // yield takeLatest(REGISTER_USER, registerUser);
}

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
}
