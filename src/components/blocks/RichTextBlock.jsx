import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useAppDispatch } from '../../store/hooks';
import { updateBlockContent } from '../../store/blocksSlice';

const RichTextBlock = ({ block, isSelected }) => {
  const { html = '' } = block?.content || {};
  const dispatch = useAppDispatch();

  const handleChange = (value) => {
    dispatch(updateBlockContent({
      id: block.id,
      content: { html: value },
    }));
  };

  return (
    <div
      className="py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {isSelected ? (
        <ReactQuill
          theme="snow"
          value={html}
          onChange={handleChange}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link'],
              ['clean'],
            ],
          }}
        />
      ) : (
        <div
          className="text-gray-700 min-h-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5"
          dangerouslySetInnerHTML={{ __html: html || '<p class="text-gray-400">Click to edit rich text...</p>' }}
        />
      )}
    </div>
  );
};

export default RichTextBlock;