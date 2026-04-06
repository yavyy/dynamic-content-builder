import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addBlock, reorderBlocks } from './store/blocksSlice';
import { createBlock } from './utils/blockHelpers';
import Palette from './components/palette/Palette';
import Canvas from './components/canvas/Canvas';
import ConfigPanel from './components/ui/ConfigPanel';
import DragOverlayCard from './components/ui/DragOverlayCard';

const App = () => {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.blocks.blocks);

  const [activeItem, setActiveItem] = useState(null);
  // activeItem shape:
  // { type: 'header', fromPalette: true }
  // { type: 'header', fromPalette: false }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = ({ active }) => {
    const fromPalette = active.data.current?.fromPalette;
    const type = active.data.current?.type;

    if (fromPalette) {
      setActiveItem({ type, fromPalette: true });
    } else {
      const block = blocks.find((b) => b.id === active.id);
      if (block) setActiveItem({ type: block.type, fromPalette: false });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveItem(null);
    if (!over) return;

    const isFromPalette = active.data.current?.fromPalette;

    if (isFromPalette) {
      const type = active.data.current?.type;
      if (type) dispatch(addBlock(createBlock(type)));
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      dispatch(reorderBlocks(arrayMove(blocks, oldIndex, newIndex)));
    }
  };

  const handleDragCancel = () => {
    setActiveItem(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex min-h-screen bg-gray-100">
        <Palette />
        <Canvas />
        <ConfigPanel />
      </div>

      {/* DragOverlay — always outside main layout */}
      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
      }}>
        {activeItem ? (
          <DragOverlayCard type={activeItem.type} />
        ) : null}
      </DragOverlay>

    </DndContext>
  );
};

export default App;