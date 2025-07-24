// import { call, put, takeLatest } from 'redux-saga/effects';
// import { PayloadAction } from '@reduxjs/toolkit';
// import {
//   fetchChatRequest,
//   fetchChatSuccess,
//   fetchChatFailure,
// } from '../slices/chatSlice';
// import { fetchchatApi } from '../api/chatService';
// import { ChatType, FetchChatPayload } from '../types';

// // The saga worker — typed generator function
// function* fetchChatSaga(action: PayloadAction<FetchChatPayload>): Generator {
//   try {
//     const chatData: ChatType = yield call(fetchchatApi, action.payload);
//     yield put(fetchChatSuccess(chatData));
//   } catch (error: any) {
//     yield put(fetchChatFailure(error.message || 'Unknown error'));
//   }
// }

// // The saga watcher
// export function* chatSaga(): Generator {
//   yield takeLatest(fetchChatRequest.type, fetchChatSaga);
// }

import {
  call,
  put,
  take,
  fork,
  cancel,
  cancelled,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import {
  fetchChatRequest,
  fetchChatFailure,
  fetchChatSuccess,
  chatMessageReceived,
  sendChatMessage,
  sendChatReaction,
  disconnectChat,
  sendChatPinned,
  sendChatDelete,
} from '../slices/chatSlice';
import {
  createChatSocketChannel,
  sendMessage,
  closeSocket,
} from '../api/chatService';
import { PayloadAction } from '@reduxjs/toolkit';
import { FetchChatPayload } from '../types';

let socketTask: any = null;

function* handleWebSocketConnection(payload: FetchChatPayload): Generator {
  const channel: any = yield call(createChatSocketChannel, payload);

  try {
    yield put(fetchChatSuccess());

    while (true) {
      const action = yield take(channel);

      if (action.type === 'message') {
        yield put(chatMessageReceived(action.data)); 
      } else if (action.type === 'error') {
        yield put(fetchChatFailure('WebSocket error'));
        break;
      } else if (action.type === 'close') {
        console.log('🔌 WebSocket closed');
        break;
      }
    }
  } finally {
    if (yield cancelled()) {
      console.log('🧹 Socket listener cancelled');
    }
  }
}

// 👇 Start connection
function* fetchChatSaga(action: PayloadAction<FetchChatPayload>): Generator {
  if (socketTask) {
    yield cancel(socketTask); // cancel old socket if one exists
  }
  socketTask = yield fork(handleWebSocketConnection, action.payload);
}

// 👇 Send message through WebSocket
function* sendMessageSaga(action: PayloadAction<any>): Generator {
  yield call(sendMessage, action.payload);
}

// 👇 Send reaction through WebSocket
function* sendReactionSaga(action: PayloadAction<any>): Generator {
  yield call(sendMessage, action.payload);
}

// 👇 Send reaction through WebSocket
function* sendPinnedSaga(action: PayloadAction<any>): Generator {
  yield call(sendMessage, action.payload);
}

// 👇 Send reaction through WebSocket
function* sendDeleteSaga(action: PayloadAction<any>): Generator {
  yield call(sendMessage, action.payload);
}

// 👇 Disconnect manually
function* disconnectSaga(): Generator {
  if (socketTask) {
    yield cancel(socketTask);
  }
  yield call(closeSocket);
}

export function* chatSaga(): Generator {
  yield takeLatest(fetchChatRequest.type, fetchChatSaga);
  yield takeEvery(sendChatMessage.type, sendMessageSaga);
  yield takeEvery(sendChatReaction.type,sendReactionSaga);
   yield takeEvery(sendChatPinned.type,sendPinnedSaga);
    yield takeEvery(sendChatDelete.type,sendDeleteSaga);
  yield takeLatest(disconnectChat.type, disconnectSaga);
}