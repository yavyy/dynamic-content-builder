export const BLOCK_TYPES = {
  HEADER: 'header',
  RICH_TEXT: 'richtext',
  IMAGE: 'image',
  MARKDOWN: 'markdown',
}

export const BLOCK_META = {
  header: {
    label: 'Header',
    icon: 'H',
    description: 'Add a heading to your page',
  },
  richtext: {
    label: 'Rich Text',
    icon: '✍️',
    description: 'Add formatted text content',
  },
  image: {
    label: 'Image',
    icon: '🖼️',
    description: 'Add an image via URL',
  },
  markdown: {
    label: 'Markdown',
    icon: 'M↓',
    description: 'Write content in markdown',
  },
};