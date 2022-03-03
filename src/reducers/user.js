import { ACTION_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return {
      ...state,
      email: action.email,
      password: action.password,
    };

  default:
    return state;
  }
};

export default user;
