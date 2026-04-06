import ReactMarkdown from 'react-markdown';

const MarkdownBlock = ({ block }) => {
  const { raw = '' } = block?.content || {};

  return (
    <div className="py-1 prose prose-sm max-w-none text-gray-700">
      {raw ? (
        <ReactMarkdown>{raw}</ReactMarkdown>
      ) : (
        <p className="text-gray-400 italic">No markdown content yet...</p>
      )}
    </div>
  );
};

export default MarkdownBlock;