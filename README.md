# Dynamic Content Builder

A drag-and-drop page builder where users can compose a personal content page by dragging, dropping, and configuring various content blocks.

Live Demo: [Link](https://dynamic-content-builder-livid.vercel.app/) 
GitHub: [Link](https://github.com/yavyy/dynamic-content-builder.git)
Video Demonstration: [Link](https://drive.google.com/file/d/1gEfSQwPfhDCY87b2FFg3mLZ-O83oTy4I/view?usp=sharing)

---

## Tech Stack

- React 19 + Vite
- Redux Toolkit
- @dnd-kit/core + @dnd-kit/sortable
- Tailwind CSS v4
- react-quill-new
- react-markdown

---

## Getting Started
```bash
git clone https://github.com/yavyy/dynamic-content-builder.git
cd dynamic-content-builder
npm install
npm run dev
```

---

## Block Types

| Block | Description | Config Options |
|-------|-------------|----------------|
| Header| Page heading| Text content, H1/H2/H3 level |
| Rich Text | Formatted text via Quill editor | Bold, italic, lists, links (inline) |
| Image | Display image from URL | Image URL, alt text |
| Markdown | Markdown with live preview | Raw markdown textarea |

---

## State Management

Redux Toolkit manages all block data globally. The store holds an ordered array of blocks and the currently selected block ID. Key actions include addBlock, removeBlock, reorderBlocks, updateBlockContent, and setSelectedBlock.

---

## Persistence

Blocks are saved to localStorage on every state change via a Redux store subscriber and rehydrated on page load.

---

## UI/UX Decisions

The app uses a three-panel layout, Palette on the left, Canvas in the center, and Config Panel on the right. Rich Text is edited inline on the canvas. Header, Image, and Markdown blocks are configured via the right-side panel to keep the canvas clean.

---

## Author

Yatharth