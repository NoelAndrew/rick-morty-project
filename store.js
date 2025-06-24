import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './features/characteres/characterSlice';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});
