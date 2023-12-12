import classNames from "classnames";

const Progress = ({ items }) => {
  return (
    <div className="flex">
      <div className="flex-col flex">
        {items.map((item, idx) => (
          <div className="flex items-start space-x-2" key={idx}>
            <div className="flex flex-col items-center">
              <div
                className={classNames(
                  "text-xs leading-none p-1 text-center text-grey-darkest rounded-xl w-5 h-5",
                  {
                    "bg-green-500": item?.completed,
                  },
                  {
                    "bg-white dark:bg-black": !item?.completed,
                  }
                )}
              />
              {idx < items.length - 1 && (
                <div
                  className={classNames(
                    "border dark:border-gray-800 border-gray-200 rounded w-3 h-9",
                    {
                      "bg-gray-200": items[idx + 1]?.completed,
                    },
                    {
                      "bg-transparent": !items[idx + 1]?.completed,
                    }
                  )}
                />
              )}
            </div>
            <p className="text-sm text-white dark:text-black capitalize">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
