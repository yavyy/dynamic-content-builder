const HeaderBlock = ({ block }) => {
  const { text = 'Your Heading Here', level = 'h1' } = block?.content || {};

  const Tag = level;

  const styles = {
    h1: 'text-4xl font-extrabold text-gray-800',
    h2: 'text-3xl font-bold text-gray-700',
    h3: 'text-2xl font-semibold text-gray-600',
  };

  return (
    <div className="py-1">
      <Tag className={styles[Tag]}>
        {text}
      </Tag>
    </div>
  );
};

export default HeaderBlock;