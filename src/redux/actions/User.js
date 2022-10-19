import {
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
  SELECTED_USER,
} from '../constants/User';

export const fetchUsers = () => {
  return {
    type: FETCH_USERS,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

export const selectUser = (user) => {
  return {
    type: SELECTED_USER,
    payload: user,
  };
};
