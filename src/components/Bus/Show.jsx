import { useMemo } from "react";
import Table from "./Table";

const Show = ({ number, routes, schedules }) => {
  const columns = useMemo(
    () => [
      {
        header: "Station",
        accessorKey: "station",
      },
      {
        header: "Arrival Time",
        accessorKey: "departureTime",
      },
      { header: "Departure Time", accessorKey: "departureTime" },
    ],
    []
  );

  return (
    <>
      <div className="flex">
        <label className="text-gray-900 dark:text-gray-300">Bus Number: </label>
        <label className="text-gray-900 dark:text-gray-300">{number}</label>
      </div>
      <div className="flex">
        <label className="text-gray-900 dark:text-gray-300">Bus Routes: </label>
        <ol>
          {routes.map((route) => (
            <li className="text-gray-900 dark:text-gray-300">{route}</li>
          ))}
        </ol>
      </div>
      <div>
        <p className="text-xl">Bus Trips:</p>
        {schedules.map((schedule) => {
          return (
            <>
              <div className="flex">
                <label className="text-gray-900 dark:text-gray-300">
                  Trip Number:{" "}
                </label>
                <label className="text-gray-900 dark:text-gray-300">
                  {schedule.trip}
                </label>
              </div>
              <div className="pt-2">
                <Table data={schedule.stations} columns={columns} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Show;
