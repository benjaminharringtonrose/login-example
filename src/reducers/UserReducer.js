import { USER_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
