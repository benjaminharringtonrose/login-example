import { loginUser } from './authSaga';
import { fork, takeLatest, all } from 'redux-saga/effects';
import watchUserAuthentication from './watchers';

export default function* rootSaga() {
  yield [fork(watchUserAuthentication)];
}
