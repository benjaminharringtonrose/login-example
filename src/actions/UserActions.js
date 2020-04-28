import { FETCH_USER_SUCCESS } from './types';

export const userFetch = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};
