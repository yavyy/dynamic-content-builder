import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedBlock } from '../../store/blocksSlice';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import CanvasBlock from './CanvasBlock';
import HeaderBlock from '../blocks/HeaderBlock';
import ImageBlock from '../blocks/ImageBlock';
import MarkdownBlock from '../blocks/MarkdownBlock';
import RichTextBlock from '../blocks/RichTextBlock';

// Returning correct component according to Block type
const renderBlock = (block, isSelected) => {
  switch (block.type) {
    case 'header':
      return <HeaderBlock block={block} />;
    case 'richtext':
      return <RichTextBlock block={block} isSelected={isSelected} />;
    case 'image':
      return <ImageBlock block={block} />;
    case 'markdown':
      return <MarkdownBlock block={block} />;
    default:
      return null;
  }
};

const Canvas = () => {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.blocks.blocks);
  const selectedBlockId = useAppSelector((state) => state.blocks.selectedBlockId);

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-droppable' });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-1 min-h-screen p-6 transition-colors duration-200
        ${isOver ? 'bg-blue-50' : 'bg-gray-100'}
      `}
    >
      <div className="max-w-3xl mx-auto">

        {/* Canvas Header */}
        <div
          className="mb-6"
          onClick={() => dispatch(setSelectedBlock(null))}

        >
          <h1 className="text-2xl font-bold text-gray-800">Canvas</h1>
          <p className="text-sm text-gray-400">
            Drop blocks here to build your page
          </p>
        </div>

        {/* Empty State */}
        {blocks.length === 0 && (
          <div className={`
            border-2 border-dashed rounded-2xl p-16 text-center
            transition-colors duration-200
            ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'}
          `}>
            <p className="text-4xl mb-3">📋</p>
            <p className="text-gray-500 font-medium">Drag blocks here to get started</p>
            <p className="text-gray-400 text-sm mt-1">Your page is empty</p>
          </div>
        )}

        {/* Blocks List */}
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <CanvasBlock
              key={block.id}
              block={block}
              isSelected={selectedBlockId === block.id}
            >
              {renderBlock(block, selectedBlockId === block.id)}
            </CanvasBlock>
          ))}
        </SortableContext>

      </div>
    </div>
  );
};

export default Canvas;