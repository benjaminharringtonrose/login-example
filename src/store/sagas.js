import { fork, takeLatest } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import firebase from 'firebase';
require('firebase/firestore');
import {
  getCollection,
  getDocById,
  addDoc,
  updateDoc,
  deleteDoc,
  saveFileOnStorage,
  deleteFileOnStorage,
  getPathReference,
} from './firebaseAPI';
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
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  SET_USER_SUCCESS,
} from './actions/types';

export function* fetchUserSaga(action) {
  try {
    const { uid } = action.payload;
    const doc = yield getDocById('users', uid);
    const user = {
      ...doc.data(),
      uid: doc.id,
    };
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFail({ error }));
  }
}

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
    const data = yield call(() => firebase.auth().signOut());
    yield Actions.auth();
    yield put(logoutUserSuccess());
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

// PHOTO UPLOAD ASYNC

uploadPhotoAsync = async (uri, filename) => {
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();
    let upload = firebase.storage().ref(filename).put(file);
    upload.on(
      'state_changed',
      (snapshot) => {},
      (err) => {
        rej(err);
      },
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        res(url);
      }
    );
  }).catch((error) => {
    console.error('upload photo async error: ', error);
  });
};

addAvatar = async ({ data }) => {
  try {
    const remoteUri = null;
    if ({ data }) {
      remoteUri = await this.uploadPhotoAsync(
        { data },
        `avatars/${firebase.auth().currentUser.uid}`
      );
      db.set({ avatar: remoteUri }, { merge: true });
    }
  } catch (error) {
    console.log('hereweare');
    alert('Error: ', error);
  }
};

// REGISTER SAGA

export function* registerUserSaga(action) {
  try {
    const { email, password, firstName, lastName, avatar } = action.payload;
    const auth = firebase.auth();
    const data = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password
    );
    const db = firebase
      .firestore()
      .collection('users')
      .doc(`${firebase.auth().currentUser.uid}`);
    db.set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      avatar: avatar,
    });
    addAvatar(avatar);
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

function fetchUserSuccess(data) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
}
function fetchUserFail(error) {
  return {
    type: FETCH_USER_FAIL,
    payload: error,
  };
}

function setUserSuccess(data) {
  return {
    type: SET_USER_SUCCESS,
    payload: data,
  };
}

// ACTION LISTENER

function* watchUserAuthentication() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(LOGOUT_USER_REQUEST, logoutUserSaga);
  yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
}

// ROOT SAGA

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
}
