import { v4 as uuidv4 } from 'uuid';
import { BLOCK_TYPES } from '../constants/blockTypes';

export const createBlock = (type) => {
  const defaults = {
    [BLOCK_TYPES.HEADER]: {
      text: 'Your Heading Here',
      level: 'h1',
    },
    [BLOCK_TYPES.RICH_TEXT]: {
      html: '<p>Start writing here...</p>',
    },
    [BLOCK_TYPES.IMAGE]: {
      url: '',
      alt: 'My Image',
    },
    [BLOCK_TYPES.MARKDOWN]: {
      raw: '## Hello\n\nStart writing **markdown** here...',
    },
  };

  return {
    id: uuidv4(),
    type,
    content: defaults[type],
  };
};