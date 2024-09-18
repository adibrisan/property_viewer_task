import { configureStore } from '@reduxjs/toolkit';

import buildingsReducer from './features/buildingsSlice';
import modalReducer from './features/modalSlice';
import formModeReducer from './features/formModeSlice';

export const store = configureStore({
  reducer: {
    buildingsReducer,
    modalReducer,
    formModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
