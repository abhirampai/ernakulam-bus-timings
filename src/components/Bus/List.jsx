import { useContext } from "react";
import {
  AppState,
  filteredSchedule,
  getCurrentTrip,
  getNextTripArrivalTime,
  useLocalizedTranslation,
} from "hooks/utils";
import Show from "./Show";
import moment from "moment";
import { Trans } from "react-i18next";

const List = ({ buses }) => {
  const { t } = useLocalizedTranslation();
  const { from, to, filterTime } = useContext(AppState);
  const nextBusArrivalTime = getNextTripArrivalTime(
    buses[0],
    from,
    to,
    filterTime
  );

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
      {nextBusArrivalTime && (
        <div className="text-start dark:text-gray-300 p-5">
          <Trans
            i18nKey="busResults.nextBusToDestination"
            values={{
              start: from.value.trim(),
              destination: to.value.trim(),
              time: moment(nextBusArrivalTime, "HH:mm A").format("hh:mm A"),
            }}
            components={{ bold: <strong /> }}
          />
        </div>
      )}
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
