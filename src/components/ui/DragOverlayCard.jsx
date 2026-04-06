import { BLOCK_META } from '../../constants/blockTypes';

const DragOverlayCard = ({ type }) => {
  const meta = BLOCK_META[type];

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-400 
    bg-white shadow-2xl opacity-95 cursor-grabbing w-72">
      <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-600 font-bold 
      flex items-center justify-center text-sm shrink-0">
        {meta?.icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">{meta?.label}</p>
        <p className="text-xs text-gray-400">{meta?.description}</p>
      </div>
    </div>
  );
};

export default DragOverlayCard;