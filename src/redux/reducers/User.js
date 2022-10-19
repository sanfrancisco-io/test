import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SELECTED_USER,
} from '../constants/User';

const initState = {
  loading: false,
  error: '',
  userList: [],
  selectedUser: {},
};

const user = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};

export default user;
