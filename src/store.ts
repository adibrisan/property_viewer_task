import { configureStore } from '@reduxjs/toolkit';

import buildingsReducer from './features/buildingsSlice';
import modalReducer from './features/modalSlice';

export const store = configureStore({
  reducer: {
    buildingsReducer,
    modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
