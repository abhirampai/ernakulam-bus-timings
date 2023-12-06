import Show from "./Show";

const List = ({ buses, filteredSchedule }) => {
  const timeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return (
    <div className="p-5">
      <div className="text-lg text-semibold text-center">
        Found {buses.length} buses
      </div>
      <div className="text-center">
        All results filtered based on current time:{" "}
        {new Date().toLocaleDateString(undefined, timeOptions)}
      </div>
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
