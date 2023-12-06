import Show from "./Show";

const List = ({ buses, filteredSchedule }) => {
  return (
    <div className="p-5">
      <div className="text-lg text-semibold text-center">Found {buses.length} buses</div>
      {buses.map((bus, idx) => (
        <Show
          key={idx}
          number={bus["Vehicle Number"]}
          routes={bus.route}
          schedules={filteredSchedule(bus.schedule)}
        />
      ))}
    </div>
  );
};

export default List;
