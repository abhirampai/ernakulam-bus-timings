const Show = ({ number, routes }) => {
  return (
    <>
      <div className="flex">
        <label className="text-gray-900 dark:text-gray-300">Bus Number: </label>
        <label className="text-gray-900 dark:text-gray-300">{number}</label>
      </div>
      <div className="flex">
        <label className="text-gray-900 dark:text-gray-300">Bus Routes: </label>
        <ol>
          {routes.map((route) => (
            <li className="text-gray-900 dark:text-gray-300">{route}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Show;
