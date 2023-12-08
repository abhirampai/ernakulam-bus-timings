import { useMemo } from "react";
import { Accordian, Table } from "../common";

const Show = ({ number, routes, schedules }) => {
  const columns = useMemo(
    () => [
      {
        header: "Station",
        accessorKey: "station",
      },
      {
        header: "Arrival Time",
        accessorKey: "arrivalTime",
      },
      { header: "Departure Time", accessorKey: "departureTime" },
    ],
    []
  );

  const header = () => (
    <div className="flex text-xl gap-2">
      <label className="text-white dark:text-gray-700">Bus Number: </label>
      <label className="text-white dark:text-gray-700">{number}</label>
    </div>
  );

  const body = () => (
    <>
      <div className="flex gap-2 mt-2">
        <label className="text-white dark:text-gray-700">Bus Route: </label>
        <ol className="border border-x-white border-b-white dark:border-x-black dark:border-b-black">
          {routes.map((route, idx) => (
            <li
              key={idx}
              className="text-white dark:text-gray-700 p-1 border-t dark:border-t-black"
            >
              {route}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <p className="dark:text-gray-700">Bus Trips:</p>
        {schedules.map((schedule) => {
          return (
            <div key={schedule.trip}>
              <div className="flex">
                <label className="text-white dark:text-gray-700">
                  Trip Number:{" "}
                </label>
                <label className="text-white dark:text-gray-700">
                  {schedule.trip}
                </label>
              </div>
              <div className="pt-2">
                <Table data={schedule.stations} columns={columns} />
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
