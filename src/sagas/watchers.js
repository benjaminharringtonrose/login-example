import { takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, REGISTER_USER } from '../actions/types';
import { registerUser, loginUser } from './authSaga';

export default function* watchUserAuthentication() {
  yield takeLatest(LOGIN_USER, loginUser);
  // TODO
  // yield takeLatest(REGISTER_USER, registerUser);
}
