import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateBlockContent } from '../../store/blocksSlice';

// ─── Individual Config Forms ───────────────────────────────────────────────

const HeaderConfig = ({ block }) => {
  const dispatch = useAppDispatch();
  const { text, level } = block.content;

  const handleChange = (field, value) => {
    dispatch(updateBlockContent({
      id: block.id,
      content: { ...block.content, [field]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          Heading Text
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange('text', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          placeholder="Enter heading text..."
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          Heading Level
        </label>
        <div className="flex gap-2">
          {['h1', 'h2', 'h3'].map((l) => (
            <button
              key={l}
              onClick={() => handleChange('level', l)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all
                ${level === l
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const ImageConfig = ({ block }) => {
  const dispatch = useAppDispatch();
  const { url, alt } = block.content;

  const handleChange = (field, value) => {
    dispatch(updateBlockContent({
      id: block.id,
      content: { ...block.content, [field]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          Image URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => handleChange('url', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          Alt Text
        </label>
        <input
          type="text"
          value={alt}
          onChange={(e) => handleChange('alt', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          placeholder="Describe the image..."
        />
      </div>

      {/* Preview */}
      {url && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Preview
          </label>
          <img
            src={url}
            alt={alt}
            className="w-full h-32 object-cover rounded-lg border border-gray-200"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const MarkdownConfig = ({ block }) => {
  const dispatch = useAppDispatch();
  const { raw } = block.content;

  const handleChange = (value) => {
    dispatch(updateBlockContent({
      id: block.id,
      content: { ...block.content, raw: value },
    }));
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Markdown Content
      </label>
      <textarea
        value={raw}
        onChange={(e) => handleChange(e.target.value)}
        rows={10}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 
        font-mono resize-none"
        placeholder="## Heading&#10;&#10;Write **markdown** here..."
      />
      <p className="text-xs text-gray-400">
        Supports standard markdown syntax
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const RichTextConfig = () => {
  return (
    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
      <p className="text-sm text-blue-600 font-medium">✍️ Inline Editing</p>
      <p className="text-xs text-blue-400 mt-1">
        Click on the block directly on the canvas to edit rich text content.
      </p>
    </div>
  );
};

// ─── Main ConfigPanel ─────────────────────────────────────────────────────────

const ConfigPanel = () => {
  const selectedBlockId = useAppSelector((state) => state.blocks.selectedBlockId);
  const blocks = useAppSelector((state) => state.blocks.blocks);

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  const renderConfig = () => {
    switch (selectedBlock.type) {
      case 'header':
        return <HeaderConfig block={selectedBlock} />;
      case 'image':
        return <ImageConfig block={selectedBlock} />;
      case 'markdown':
        return <MarkdownConfig block={selectedBlock} />;
      case 'richtext':
        return <RichTextConfig />;
      default:
        return null;
    }
  };

  // No block selected
  if (!selectedBlock) {
    return (
      <aside className="w-72 min-h-screen bg-white border-l border-gray-200 
      p-4 shrink-0 flex flex-col items-center justify-center">
        <p className="text-4xl mb-3">🎛️</p>
        <p className="text-gray-500 font-medium text-sm">No block selected</p>
        <p className="text-gray-400 text-xs mt-1 text-center">
          Click any block on the canvas to configure it
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-72 min-h-screen bg-white border-l border-gray-200 
    p-4 shrink-0 overflow-y-auto">

      {/* Panel Header */}
      <div className="mb-5 pb-3 border-b border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
          Configure Block
        </p>
        <p className="text-lg font-bold text-gray-800 capitalize mt-0.5">
          {selectedBlock.type === 'richtext' ? 'Rich Text' : selectedBlock.type}
        </p>
      </div>

      {/* Config Form */}
      {renderConfig()}

    </aside>
  );
};

export default ConfigPanel;