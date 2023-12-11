import { useMemo } from "react";
import { Accordian, Progress, Table } from "../common";
import { useLocalizedTranslation } from "hooks/utils";
import moment from "moment";

const Show = ({ number, routes, schedules, currentTrip }) => {
  console.log(currentTrip);
  const { t } = useLocalizedTranslation();
  const columns = useMemo(
    () => [
      {
        header: t("columns.station"),
        accessorKey: "station",
      },
      {
        header: t("columns.arrivalTime"),
        accessorKey: "arrivalTime",
      },
      { header: t("columns.departureTime"), accessorKey: "departureTime" },
    ],
    [t]
  );

  const header = () => (
    <div className="flex text-xl gap-2">
      <label className="text-white dark:text-gray-700 capitalize">
        {t("bus.number")}:{" "}
      </label>
      <label className="text-white dark:text-gray-700">{number}</label>
    </div>
  );

  const body = () => (
    <>
      <div className="flex gap-2 mt-2">
        <label className="text-white dark:text-gray-700 capitalize">
          {t("bus.route")}:{" "}
        </label>
        <Progress
          items={routes.map((route) => ({
            name: route,
          }))}
        />
      </div>
      <div className="py-2">
        <p className="dark:text-gray-700 capitalize">
          {t("bus.currentTrip")}:{" "}
        </p>
        {currentTrip ? (
          <Progress
            items={currentTrip.map(
              ({ station, arrivalTime, departureTime }) => {
                const tripCompleted =
                  moment(arrivalTime, "HH:mm A").toDate() <= moment().toDate();
                const stationNameWithArrivalOrDeparture = tripCompleted
                  ? `${station} reached at ${departureTime}`
                  : `${station} will arrive at ${arrivalTime}`;

                return {
                  name: stationNameWithArrivalOrDeparture,
                  completed: tripCompleted,
                };
              }
            )}
          />
        ) : (
          <p className="dark:text-gray-700">{t("bus.noTrip")}</p>
        )}
      </div>
      <div className="pt-2">
        <p className="dark:text-gray-700 capitalize">{t("bus.trips")}:</p>
        {schedules.map((schedule) => {
          return (
            <div key={schedule.trip}>
              <div className="flex">
                <label className="text-white dark:text-gray-700">
                  {t("bus.tripNumber")}:{" "}
                </label>
                <label className="text-white dark:text-gray-700">
                  {schedule.trip}
                </label>
              </div>
              <div className="pt-2">
                <>
                  <Table data={schedule.stations} columns={columns} />
                </>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <Accordian header={header()} body={body()} />
    </>
  );
};

export default Show;
