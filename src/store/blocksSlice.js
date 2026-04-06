import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('canvas-blocks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  blocks: loadFromLocalStorage(),
  selectedBlockId: null,
};

const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    addBlock: (state, action) => {
      state.blocks.push(action.payload);
    },
    removeBlock: (state, action) => {
      state.blocks = state.blocks.filter(b => b.id !== action.payload);
      if (state.selectedBlockId === action.payload) {
        state.selectedBlockId = null;
      }
    },
    reorderBlocks: (state, action) => {
      state.blocks = action.payload;
    },
    updateBlockContent: (
      state,
      action
    ) => {
      const block = state.blocks.find(b => b.id === action.payload.id);
      if (block) {
        block.content = action.payload.content;
      }
    },
    setSelectedBlock: (state, action) => {
      state.selectedBlockId = action.payload;
    },
  },
});

export const {
  addBlock,
  removeBlock,
  reorderBlocks,
  updateBlockContent,
  setSelectedBlock,
} = blocksSlice.actions;

export default blocksSlice.reducer;