import { all } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { communitySaga } from './communitySaga';
import { chatSaga } from './chatSaga';

    export default function* rootSaga() {
      yield all([
        userSaga(),
        communitySaga(),
        chatSaga(),
        // Add other sagas here
      ]);
    }