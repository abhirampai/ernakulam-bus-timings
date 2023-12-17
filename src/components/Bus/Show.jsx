import { useContext, useMemo } from "react";
import { Accordion, Modal, Progress, Table } from "../common";
import {
  AppState,
  findArrivalTimeBasedOnLocation,
  getTripEstimatedTime,
  useLocalizedTranslation,
} from "hooks/utils";
import { useSignal } from "@preact/signals-react";
import ShowRoute from "./ShowRoute";

const Show = ({ number, routes, schedules, currentTrip }) => {
  const openModal = useSignal(false);
  const { t } = useLocalizedTranslation();
  const { from, to } = useContext(AppState);
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
    <div className="flex justify-between md:pr-5 pr-2 w-full items-center">
      <div className="flex flex-col md:flex-row md:text-xl gap-2">
        <label className="text-white dark:text-gray-700 capitalize">
          {t("bus.number")}:{" "}
        </label>
        <label className="text-white dark:text-gray-700">{number}</label>
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto py-2 px-2 md:px-5 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={(e) => {
          e.stopPropagation();
          openModal.value = true;
          document.body.style.overflow = "hidden";
        }}
      >
        {t("bus.showTrip")}
      </button>
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
            name: route.toLowerCase(),
          }))}
        />
      </div>
      <div className="pt-2">
        <p className="dark:text-gray-700 capitalize">{t("bus.trips")}:</p>
        {schedules.map((schedule) => {
          return (
            <div key={schedule.trip}>
              <div className="flex">
                <div className="flex justify-between w-full">
                  <label className="text-white dark:text-gray-700">
                    {t("bus.tripNumber")}: {schedule.trip}
                  </label>
                  <p>
                    {t("bus.estimatedTripTime", {
                      time: getTripEstimatedTime(
                        findArrivalTimeBasedOnLocation(
                          schedule.stations,
                          from.value.trim().toUpperCase()
                        ),
                        findArrivalTimeBasedOnLocation(
                          schedule.stations,
                          to.value.trim().toUpperCase()
                        )
                      ),
                    })}
                  </p>
                </div>
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
        <ShowRoute
          number={number}
          openModal={openModal}
          currentTrip={currentTrip}
        />
      </Modal>
    </>
  );
};

export default Show;
