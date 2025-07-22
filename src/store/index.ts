import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import rootSaga from '../sagas'; 
const createSagaMiddleware = require('redux-saga').default;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
    });

sagaMiddleware.run(rootSaga);

    export default store;