import { useSignal } from "@preact/signals-react";
import { List } from "./Bus";

const { useGetBusData } = require("../hooks/getBusData");

const BusTimings = () => {
  const { data, isLoading } = useGetBusData();
  const from = useSignal("");
  const to = useSignal("");
  const filteredBusResult = useSignal(null);

  const parseTime = (time) => {
    const timeComponents = time.split(/[\s:]+/);
    let hours = parseInt(timeComponents[0], 10);
    const minutes = parseInt(timeComponents[1], 10);
    const period = timeComponents[2].toLowerCase();

    if (period === "pm" && hours < 12) {
      hours += 12;
    } else if (period === "am" && hours === 12) {
      hours = 0;
    }

    const currentDate = new Date();
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    );
  };

  const filteredSchedule = (
    schedules,
    start = from.value.trim().toUpperCase(),
    destination = to.value.trim().toUpperCase()
  ) =>
    schedules.filter((schedule) => {
      const touchingStartDestination = schedule.stations.find(
        ({ station, arrivalTime }) =>
          station.includes(start) && parseTime(arrivalTime) > new Date()
      );

      const touchingEndDestination = schedule.stations.find(({ station }) =>
        station.includes(destination)
      );

      if (
        touchingStartDestination?.arrivalTime <
        touchingEndDestination?.arrivalTime
      ) {
        return true;
      } else {
        return false;
      }
    });

  const filteredBuses = (buses, start, destination) =>
    buses.filter(
      (bus) => filteredSchedule(bus.schedule, start, destination).length > 0
    );

  const sumbmitForm = (e) => {
    e.preventDefault();

    const start = from.value.trim().toUpperCase();
    const destination = to.value.trim().toUpperCase();

    const busSchedules = data?.busSchedules;

    const buses = busSchedules.filter((schedule) => {
      const touchingStartDestination =
        schedule.route.filter((route) => route.includes(start)).length > 0;

      const touchingEndDestination =
        schedule.route.filter((route) => route.includes(destination)).length >
        0;
      return touchingStartDestination && touchingEndDestination;
    });
    filteredBusResult.value = filteredBuses(buses, start, destination);
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
            onClick={sumbmitForm}
          >
            Submit
          </button>
        </div>
      </div>
      {filteredBusResult.value &&
        (filteredBusResult.value.length > 0 ? (
          <List
            buses={filteredBusResult.value}
            filteredSchedule={filteredSchedule}
          />
        ) : (
          from.value.trim() &&
          to.value.trim() && (
            <p className="text-xl p-5 text-center">No results found</p>
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
