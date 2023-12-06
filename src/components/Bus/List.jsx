import Show from "./Show";

const List = ({ buses }) => {
  return (
    <div className="p-5">
      <div className="text-lg text-semibold">Found {buses.length} buses</div>
      {buses.map((bus) => (
        <Show number={bus["Vehicle Number"]} routes={bus.route} />
      ))}
    </div>
  );
};

export default List;
