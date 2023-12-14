import { Progress } from "components/common";
import { useLocalizedTranslation } from "hooks/utils";
import moment from "moment";

const ShowRoute = ({ number, openModal, currentTrip }) => {
  const { t } = useLocalizedTranslation();
  return (
    <div className="absolute z-50 w-11/12 md:w-1/2 overflow-hidden text-left bg-black dark:bg-white border rounded-sm">
      <div className="my-5 overflow-y-auto"></div>
      <div className="flex flex-col w-full px-8 pb-6 space-y-6">
        <div className="flex w-full justify-between">
          <div className="text-white dark:text-gray-700 capitalize">
            {number}
          </div>
          <button
            onClick={() => {
              openModal.value = false;
              document.body.removeAttribute("style");
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="sr-only">{t("common.close")}</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <p className="text-white dark:text-gray-700 capitalize">
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
    </div>
  );
};

export default ShowRoute;
