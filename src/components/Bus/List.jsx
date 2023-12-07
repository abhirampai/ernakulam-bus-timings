import { useContext } from "react";
import { AppState, filteredSchedule } from "../../hooks/utils";
import Show from "./Show";

const List = ({ buses }) => {
  const { from, to } = useContext(AppState);

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
      <div className="text-lg text-semibold text-center dark:text-gray-300">
        Found {buses.length} buses
      </div>
      <div className="text-center dark:text-gray-300">
        All results filtered based on current time:{" "}
        {new Date().toLocaleDateString(undefined, timeOptions)}
      </div>
      {buses.map((bus, idx) => (
        <Show
          key={idx}
          number={bus["Vehicle Number"]}
          routes={bus.route}
          schedules={filteredSchedule(
            bus.schedule,
            from.value.trim().toUpperCase(),
            to.value.trim().toUpperCase()
          )}
        />
      ))}
    </div>
  );
};

export default List;
