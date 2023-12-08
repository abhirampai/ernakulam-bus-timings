import { signal } from "@preact/signals-react";
import moment from "moment";
import { createContext } from "react";
import { useTranslation } from "react-i18next";

const parseTime = (time, currentDate) => {
  if (!time) return;

  const timeComponents = time.split(/[\s:]+/);
  let hours = parseInt(timeComponents[0], 10);
  const minutes = parseInt(timeComponents[1], 10);
  const period = timeComponents[2].toLowerCase();

  if (period === "pm" && hours < 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes
  );
};

const findArrivalTime = (schedules, start, destination, currentTime) =>
  filteredSchedule(schedules, start, destination, currentTime)
    .map(({ stations }) =>
      stations.find(
        ({ station, arrivalTime }) =>
          station.includes(start) &&
          parseTime(arrivalTime, currentTime) >= currentTime
      )
    )
    .filter(Boolean)[0]?.arrivalTime;

export const filteredSchedule = (schedules, start, destination, currentTime) =>
  schedules.filter((schedule) => {
    if (!start && !destination) return false;

    const touchingStartDestination = schedule.stations.find(
      ({ station, arrivalTime }) =>
        station.includes(start) &&
        parseTime(arrivalTime, currentTime) >= currentTime
    );

    const touchingEndDestination = schedule.stations.find(({ station }) =>
      station.includes(destination)
    );

    if (
      parseTime(touchingStartDestination?.arrivalTime, currentTime) <
      parseTime(touchingEndDestination?.arrivalTime, currentTime)
    ) {
      return true;
    } else {
      return false;
    }
  });

export const filteredBuses = (buses, start, destination, currentTime) =>
  buses.filter(
    (bus) =>
      filteredSchedule(bus.schedule, start, destination, currentTime).length > 0
  );

export const filterByRoutes = (busSchedules, start, destination) =>
  busSchedules.filter((schedule) => {
    const touchingStartDestination =
      schedule.route.filter((route) => route.includes(start)).length > 0;

    const touchingEndDestination =
      schedule.route.filter((route) => route.includes(destination)).length > 0;
    return touchingStartDestination && touchingEndDestination;
  });

export const sortBySchedule = (buses, start, destination, currentTime) =>
  buses.sort(
    (a, b) =>
      parseTime(
        findArrivalTime(a.schedule, start, destination, currentTime),
        currentTime
      ) -
      parseTime(
        findArrivalTime(b.schedule, start, destination, currentTime),
        currentTime
      )
  );

export const createAppState = () => {
  const from = signal("");
  const to = signal("");
  const filterTime = signal(moment().format("HH:mm"));
  const filteredBusResult = signal(null);
  const isLoading = signal(false);

  return { from, to, filteredBusResult, isLoading, filterTime };
};

export const removeDuplicatesAndSort = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index).sort();
};

export const useLocalizedTranslation = () => {
  const { t } = useTranslation();

  return { t };
};

export const AppState = createContext();
