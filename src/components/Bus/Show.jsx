import { useMemo } from "react";
import Table from "./Table";
import Accordian from "./Accordian";

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
    <div className="flex">
      <label className="text-white">Bus Number: </label>
      <label className="text-white">{number}</label>
    </div>
  );

  const body = () => (
    <>
      <div className="flex">
        <label className="text-white">Bus Routes: </label>
        <ol>
          {routes.map((route, idx) => (
            <li key={idx} className="text-white">
              {route}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <p className="text-xl">Bus Trips:</p>
        {schedules.map((schedule) => {
          return (
            <div key={schedule.trip}>
              <div className="flex">
                <label className="text-white">Trip Number: </label>
                <label className="text-white">{schedule.trip}</label>
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
