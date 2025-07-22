import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import communityReducer from '../slices/communitySlice';

    const rootReducer = combineReducers({
      user: userReducer,
      community: communityReducer
      // Add other reducers here
    });

    export default rootReducer;