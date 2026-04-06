import { BLOCK_TYPES, BLOCK_META } from '../../constants/blockTypes';
import PaletteItem from './PaletteItem';

const Palette = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 p-4 flex-shrink-0">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">Content Blocks</h2>
        <p className="text-xs text-gray-400 mt-1">Drag blocks onto the canvas</p>
      </div>

      <div>
        {Object.values(BLOCK_TYPES).map((type) => (
          <PaletteItem
            key={type}
            type={type}
            label={BLOCK_META[type].label}
            icon={BLOCK_META[type].icon}
            description={BLOCK_META[type].description}
          />
        ))}
      </div>
    </aside>
  );
};

export default Palette;