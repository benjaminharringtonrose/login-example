import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  error: '',
  loading: false,
};
/*

*/
export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    // LOGIN FORM CASES
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        loading: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed.',
        password: '',
        loading: false,
      };
    // REGISTER FORM CASES
    case FIRST_NAME_CHANGED:
      return {
        ...state,
        firstName: action.payload,
      };
    case LAST_NAME_CHANGED:
      return {
        ...state,
        lastName: action.payload,
      };
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        loading: false,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed.',
        password: '',
        loading: false,
      };
    default:
      return state;
  }
};
