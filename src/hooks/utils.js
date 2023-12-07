import { signal } from "@preact/signals-react";
import { createContext } from "react";

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

export const filteredSchedule = (schedules, start, destination) =>
  schedules.filter((schedule) => {
    if (!start && !destination) return false;

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

export const filteredBuses = (buses, start, destination) =>
  buses.filter(
    (bus) => filteredSchedule(bus.schedule, start, destination).length > 0
  );

export const filterByRoutes = (busSchedules, start, destination) =>
  busSchedules.filter((schedule) => {
    const touchingStartDestination =
      schedule.route.filter((route) => route.includes(start)).length > 0;

    const touchingEndDestination =
      schedule.route.filter((route) => route.includes(destination)).length > 0;
    return touchingStartDestination && touchingEndDestination;
  });

export const createAppState = () => {
  const from = signal("");
  const to = signal("");
  const filteredBusResult = signal(null);

  return { from, to, filteredBusResult };
};

export const AppState = createContext();
