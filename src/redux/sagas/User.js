import { takeEvery, put, call } from 'redux-saga/effects';
import { FETCH_USERS } from '../constants/User';
import { fetchUsersSuccess, fetchUsersError } from '../actions/User';
import axios from 'axios';

const fetchUsersFromAPI = () =>
  axios('https://jsonplaceholder.typicode.com/users');

function* fetchUserWorker() {
  try {
    const responseData = yield call(fetchUsersFromAPI);
    yield put(fetchUsersSuccess(responseData.data));
  } catch (e) {
    yield put(fetchUsersError(e));
  }
}

export function* fetchUserWatcher() {
  yield takeEvery(FETCH_USERS, fetchUserWorker);
}
