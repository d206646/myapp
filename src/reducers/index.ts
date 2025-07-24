import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import communityReducer from '../slices/communitySlice';
import chatReducer from '../slices/chatSlice';

    const rootReducer = combineReducers({
      user: userReducer,
      community: communityReducer,
      chat: chatReducer
      // Add other reducers here
    });

    export default rootReducer;