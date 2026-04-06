import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from './blocksSlice';

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
  },
});

// Using LocalStorage for persistence
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('canvas-blocks', JSON.stringify(state.blocks.blocks));
});
