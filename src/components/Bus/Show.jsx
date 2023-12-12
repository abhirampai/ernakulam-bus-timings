import { useMemo } from "react";
import { Accordion, Modal, Progress, Table } from "../common";
import { useLocalizedTranslation } from "hooks/utils";
import moment from "moment";
import { useSignal } from "@preact/signals-react";
import ShowRoute from "./ShowRoute";

const Show = ({ number, routes, schedules, currentTrip }) => {
  const openModal = useSignal(false);
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
    <div className="flex justify-between px-2 w-full">
      <div className="flex text-xl gap-2">
        <label className="text-white dark:text-gray-700 capitalize">
          {t("bus.number")}:{" "}
        </label>
        <label className="text-white dark:text-gray-700">{number}</label>
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={(e) => {
          e.stopPropagation();
          openModal.value = true;
          document.body.style.overflow = "hidden";
        }}
      >
        Show route
      </button>
    </div>
  );

  const body = () => (
    <>
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
                  ? `${station.toLowerCase()} reached at ${departureTime}`
                  : `${station.toLowerCase()} will arrive at ${arrivalTime}`;

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
      <Accordion header={header()} body={body()} />
      <Modal
        open={openModal.value}
        onCloseHandler={() => {
          openModal.value = false;
          document.body.style.overflow = "auto";
        }}
      >
        <ShowRoute number={number} openModal={openModal} routes={routes} />
      </Modal>
    </>
  );
};

export default Show;
