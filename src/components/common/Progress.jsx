const Progress = ({ items }) => {
  return (
    <div className="flex">
      <div className="flex-col flex">
        {items.map((item, idx) => (
          <div className="flex items-start space-x-2" key={idx}>
            <div className="flex flex-col items-center">
              <div className="bg-white dark:bg-black text-xs leading-none p-1 text-center text-grey-darkest rounded-xl w-5 h-5" />
              {idx < items.length - 1 && (
                <div className="bg-transparent border dark:border-gray-800 border-gray-200 rounded w-3 h-9" />
              )}
            </div>
            <p className="text-sm dark:text-black">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
