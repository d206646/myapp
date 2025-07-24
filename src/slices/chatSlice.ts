import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, ChatState, FetchChatPayload } from '../types';

const initialState:ChatState= {
        status: 'idle',
        messages: [],
        loading: false,
        error: null,
        community_id:1,
        user_id: 20,
      }

    const chatSlice = createSlice({
      name: 'chat',
      initialState: initialState,
      reducers: {
        fetchChatRequest: (state,_action: PayloadAction<FetchChatPayload>) => {
          state.loading = true;
          state.error = null;
        },
        fetchChatSuccess: (state) => {
          state.loading = false;
        },
        fetchChatFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
        chatMessageReceived(state, action: PayloadAction<ChatMessage>) {
      state.messages.unshift(action.payload);
    },
    sendChatMessage(state, _action: PayloadAction<any>) {
      // saga handles this
      console.log(_action.payload)
    },
    sendChatReaction(state, _action: PayloadAction<any>) {
      // saga handles this
      console.log(_action.payload)
    },
    sendChatPinned(state, _action: PayloadAction<any>) {
      // saga handles this
      console.log(_action.payload)
    },
    sendChatDelete(state, _action: PayloadAction<any>) {
      // saga handles this
      console.log(_action.payload)
    },
    disconnectChat(state) {
      // saga handles this
    },
      },
    });

    export const { fetchChatRequest, fetchChatSuccess, fetchChatFailure,chatMessageReceived,
        sendChatMessage,disconnectChat,sendChatReaction,sendChatPinned,sendChatDelete } = chatSlice.actions;
    export default chatSlice.reducer;