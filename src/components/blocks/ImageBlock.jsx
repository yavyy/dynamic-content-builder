const ImageBlock = ({ block }) => {
  const { url = '', alt = 'Image' } = block?.content || {};

  return (
    <div className="py-1">
      {url ? (
        <img
          src={url}
          alt={alt || 'Image'}
          className="w-full max-h-80 object-cover rounded-lg"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}

      {/* Fallback — shown when URL is empty or broken */}
      <div
        style={{ display: url ? 'none' : 'flex' }}
        className="w-full h-48 rounded-lg bg-gray-100 border-2 border-dashed 
        border-gray-300 flex flex-col items-center justify-center text-gray-400"
      >
        <span className="text-4xl mb-2">🖼️</span>
        <span className="text-sm">No image URL set</span>
        <span className="text-xs mt-1">Click to configure</span>
      </div>
    </div>
  );
};

export default ImageBlock;