import { all } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { communitySaga } from './communitySaga';

    export default function* rootSaga() {
      yield all([
        userSaga(),
        communitySaga()
        // Add other sagas here
      ]);
    }