import { List } from "./Bus";
import { useContext } from "react";
import {
  AppState,
  filterByRoutes,
  filteredBuses,
  sortBySchedule,
} from "../hooks/utils";

const { useGetBusData } = require("../hooks/getBusData");

const BusTimings = () => {
  const { data, isLoading } = useGetBusData();
  const { from, to, filteredBusResult } = useContext(AppState);

  const submitForm = (e) => {
    e.preventDefault();

    const start = from.value.trim().toUpperCase();
    const destination = to.value.trim().toUpperCase();

    const busSchedules = data?.busSchedules;

    filteredBusResult.value = sortBySchedule(
      filteredBuses(
        filterByRoutes(busSchedules, start, destination),
        start,
        destination
      ),
      start,
      destination
    );
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border border-blue-200 m-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            From
          </label>
          <input
            required
            type="text"
            list="routes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="High Court"
            onChange={(e) => (from.value = e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Destination
          </label>
          <input
            type="text"
            list="routes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ernakulam South"
            required
            onChange={(e) => (to.value = e.target.value)}
          />
        </div>
        <div className="pt-5 md:col-span-2 text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={submitForm}
          >
            Submit
          </button>
        </div>
      </div>
      {filteredBusResult.value &&
        (filteredBusResult.value.length > 0 ? (
          <List buses={filteredBusResult.value} />
        ) : (
          from?.value?.trim() &&
          to?.value?.trim() && (
            <p className="text-xl p-5 text-center dark:text-gray-400">
              No results found.
            </p>
          )
        ))}
      <datalist id="routes">
        {data?.routes.map((route, key) => (
          <option key={key} value={route} />
        ))}
      </datalist>
    </>
  );
};

export default BusTimings;
