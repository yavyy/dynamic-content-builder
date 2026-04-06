import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch } from '../../store/hooks';
import { removeBlock, setSelectedBlock } from '../../store/blocksSlice';

const CanvasBlock = ({ block, isSelected, children }) => {
  const dispatch = useAppDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => dispatch(setSelectedBlock(block.id))}
      className={`
        relative group mb-3 rounded-xl border-2 bg-white
        transition-all duration-200 cursor-pointer
        ${isDragging ? 'opacity-50 shadow-2xl scale-105' : 'opacity-100'}
        ${isSelected ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-gray-300'}
      `}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-8 flex items-center 
        justify-center cursor-grab opacity-0 group-hover:opacity-100 
        transition-opacity rounded-l-xl hover:bg-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-gray-400 text-lg">⠿</span>
      </div>

      {/* Block Content */}
      <div className="pl-8 pr-10 py-4">
        {children}
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeBlock(block.id));
        }}
        className="absolute right-2 top-2 w-7 h-7 rounded-full bg-red-100 
        text-red-500 opacity-0 group-hover:opacity-100 transition-opacity 
        hover:bg-red-200 flex items-center justify-center text-sm font-bold"
      >
        ✕
      </button>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-3 left-3 bg-blue-500 text-white 
        text-xs px-2 py-0.5 rounded-full">
          Editing
        </div>
      )}
    </div>
  );
};

export default CanvasBlock;