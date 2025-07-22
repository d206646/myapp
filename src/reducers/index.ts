import { combineReducers } from '@reduxjs/toolkit';
    import userReducer from '../slices/userSlice';

    const rootReducer = combineReducers({
      user: userReducer,
      // Add other reducers here
    });

    export default rootReducer;