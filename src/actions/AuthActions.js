// AUTH ACTION CREATORS

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
} from './types';

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
