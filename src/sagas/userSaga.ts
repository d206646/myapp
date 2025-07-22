import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserRequest,
} from '../slices/userSlice';
import { fetchUserApi } from '../api/userService';
export type UserType = {
  name: string;
  id: any; // or string | number if you can be more specific
};

// The saga worker — typed generator function
function* fetchUserSaga(action: PayloadAction<string>): Generator {
  try {
    // `call` returns a value of type `UserType`
    const userData: UserType = yield call(fetchUserApi, action.payload);
    yield put(fetchUserSuccess(userData));
  } catch (error: any) {
    yield put(fetchUserFailure(error.message || 'Unknown error'));
  }
}

// The saga watcher
export function* userSaga(): Generator {
  yield takeLatest(fetchUserRequest.type, fetchUserSaga);
}