import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCommunityRequest, fetchCommunitySuccess, fetchCommunityFailure
} from '../slices/communitySlice';
import { fetchCommunityApi } from '../api/communityService';
import { Community, FetchCommunityPayload } from '../types';


// const getItems = state => state.community;
// The saga worker — typed generator function
function* fetchCommunitySaga(action: PayloadAction<FetchCommunityPayload>): Generator {
  try {
    // `call` returns a value of type `UserType`
    //  const items = yield select(getItems);
    //  console.log("items",items)
    const communityData: Community = yield call(fetchCommunityApi,action.payload);
    yield put(fetchCommunitySuccess(communityData));
  } catch (error: any) {
    yield put(fetchCommunityFailure(error.message || 'Unknown error'));
  }
}

// The saga watcher
export function* communitySaga(): Generator {
  yield takeLatest(fetchCommunityRequest.type, fetchCommunitySaga);
}