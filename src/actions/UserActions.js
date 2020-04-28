import { GET_CURRENT_USER } from './types';

export const getCurrentUser = (user) => {
  return {
    type: GET_CURRENT_USER,
    payload: user,
  };
};
