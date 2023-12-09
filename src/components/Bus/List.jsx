import { useContext } from "react";
import {
  AppState,
  filteredSchedule,
  getCurrentTrip,
  useLocalizedTranslation,
} from "hooks/utils";
import Show from "./Show";
import moment from "moment";

const List = ({ buses }) => {
  const { t } = useLocalizedTranslation();
  const { from, to, filterTime } = useContext(AppState);

  return (
    <div className="p-5">
      <div className="text-lg text-semibold text-center dark:text-gray-300">
        {t("busResults.foundHeading", { count: buses.length })}
      </div>
      <div className="text-center dark:text-gray-300">
        {t("busResults.resultsFilteredByTime", {
          time: moment(filterTime, "HH:mm A").format("hh:mm A"),
        })}
      </div>
      <div className="pb-12">
        {buses.map((bus, idx) => (
          <Show
            key={idx}
            number={bus["Vehicle Number"]}
            routes={bus.route}
            schedules={filteredSchedule(
              bus.schedule,
              from.value.trim().toUpperCase(),
              to.value.trim().toUpperCase(),
              moment(filterTime, "HH:mm").toDate()
            )}
            currentTrip={getCurrentTrip(bus.schedule)}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
