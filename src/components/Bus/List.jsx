import Show from "./Show";

const List = ({ buses, start, destination }) => {
  const filteredSchedule = (schedules) =>
    schedules.filter((schedule) => {
      const touchingStartDestination =
        schedule.stations.filter(({ station }) => station.includes(start))
          .length > 0;

      const touchingEndDestination =
        schedule.stations.filter(({ station }) => station.includes(destination))
          .length > 0;

      return touchingStartDestination || touchingEndDestination;
    });

  return (
    <div className="p-5">
      <div className="text-lg text-semibold">Found {buses.length} buses</div>
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
