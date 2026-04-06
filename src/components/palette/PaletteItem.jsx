import { useDraggable } from "@dnd-kit/core";

function PaletteItem({ type, label, icon, description }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: {
      fromPalette: true,
      type
    }
  })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-3 p-3 mb-2 rounded-lg border-2 border-dashed
        border-gray-300 bg-white cursor-grab hover:border-blue-400
        hover:bg-blue-50 transition-all duration-200 select-none
        ${isDragging ? 'opacity-40' : 'opacity-100'}
      `}
    >
      <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  )
}

export default PaletteItem