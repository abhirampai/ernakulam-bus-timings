import { List } from "./Bus";
import { useContext, useEffect } from "react";
import {
  AppState,
  filterByRoutes,
  filteredBuses,
  sortBySchedule,
  useLocalizedTranslation,
} from "hooks/utils";
import { useGetBusData } from "hooks/getBusData";
import { Footer, Github, Loader } from "./common";
import moment from "moment";
import classNames from "classnames";

const BusTimings = () => {
  const { t } = useLocalizedTranslation();
  const { data, isLoading } = useGetBusData();
  const {
    from,
    to,
    filterTime,
    filteredBusResult,
    isLoading: isLoadingGlobal,
  } = useContext(AppState);
  const sharedLinkDisabled = !filteredBusResult?.value?.length && true;
  const urlParams = new URLSearchParams(window.location.search);

  const submitForm = async (e) => {
    e.preventDefault();
    isLoadingGlobal.value = true;

    const start = from.value.trim().toUpperCase();
    const destination = to.value.trim().toUpperCase();
    const currentTime = moment(filterTime.value, "HH:mm").toDate();

    const busSchedules = data?.busSchedules;

    filteredBusResult.value = await Promise.all(
      sortBySchedule(
        filteredBuses(
          filterByRoutes(busSchedules, start, destination, currentTime),
          start,
          destination,
          currentTime
        ),
        start,
        destination,
        currentTime
      )
    ).finally(() => (isLoadingGlobal.value = false));
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}?from=${from.value
      .trim()
      .toUpperCase()}&to=${to.value.trim().toUpperCase()}&time=${
      filterTime.value
    }`;
    navigator.clipboard
      .writeText(url)
      .then(() => alert(`Copied ${url} to clipboard successfully`));
  };

  useEffect(() => {
    from.value = urlParams.get("from") || "";
    to.value = urlParams.get("to") || "";
    filterTime.value = urlParams.get("time") || moment().format("HH:mm");
  }, []); //eslint-disable-line

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border border-blue-200 m-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {t("common.from")}
          </label>
          <input
            required
            defaultValue={urlParams.get("from") || ""}
            type="text"
            list="routes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t("placeholder.highCourt")}
            onChange={(e) => (from.value = e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {t("common.to")}
          </label>
          <input
            type="text"
            defaultValue={urlParams.get("to") || ""}
            list="routes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t("placeholder.ernakulamSouth")}
            required
            onChange={(e) => (to.value = e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {t("common.startAt")} {t("common.optional")}
          </label>
          <input
            type="time"
            list="routes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t("placeholder.ernakulamSouth")}
            defaultValue={urlParams.get("time") || moment().format("HH:mm")}
            required
            onChange={(e) => (filterTime.value = e.target.value)}
          />
        </div>
        <div className="md:col-span-2 flex space-x-5 justify-center col-span-2 items-center w-full">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={submitForm}
          >
            {t("common.submit")}
          </button>
          <button
            disabled={sharedLinkDisabled}
            className={classNames(
              "text-sm w-full sm:w-auto px-5 py-2.5 text-center font-medium rounded-lg focus:outline-none",
              {
                "text-white bg-gray-300 cursor-not-allowed disabled:opacity-25":
                  sharedLinkDisabled,
                "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800":
                  !sharedLinkDisabled,
              }
            )}
            onClick={copyToClipboard}
          >
            {t("common.copyLink")}
          </button>
        </div>
      </div>
      {isLoadingGlobal.value ? (
        <Loader />
      ) : (
        filteredBusResult.value &&
        (filteredBusResult.value.length > 0 ? (
          <List buses={filteredBusResult.value} />
        ) : (
          from?.value?.trim() &&
          to?.value?.trim() && (
            <div>
              <p className="text-xl p-5 text-center dark:text-gray-400">
                {t("common.noResultsFound")}
              </p>
              <div className="text-center dark:text-gray-400">
                {t("busResults.resultsFilteredByTime", {
                  time: moment(filterTime, "HH:mm A").format("hh:mm A"),
                })}
              </div>
            </div>
          )
        ))
      )}
      <datalist id="routes">
        {data?.routes.map((route, key) => (
          <option key={key} value={route} />
        ))}
      </datalist>
      <Footer />
      <Github />
    </>
  );
};

export default BusTimings;
