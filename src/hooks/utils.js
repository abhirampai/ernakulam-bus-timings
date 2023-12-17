import { signal } from "@preact/signals-react";
import moment from "moment";
import { createContext } from "react";
import { useTranslation } from "react-i18next";

const parseTime = (time) => {
  if (!time) return;

  return moment(time, "HH:mm A");
};

const findArrivalTime = (schedules, start, destination, currentTime) =>
  filteredSchedule(schedules, start, destination, currentTime)
    .map(({ stations }) =>
      stations.find(
        ({ station, arrivalTime }) =>
          station.includes(start) && parseTime(arrivalTime) >= currentTime
      )
    )
    .filter(Boolean)[0]?.arrivalTime;

export const filteredSchedule = (schedules, start, destination, currentTime) =>
  schedules.filter((schedule) => {
    if (!start && !destination) return false;

    const touchingStartDestination = schedule.stations.find(
      ({ station, arrivalTime }) =>
        station.includes(start) && parseTime(arrivalTime) >= currentTime
    );

    const touchingEndDestination = schedule.stations.find(({ station }) =>
      station.includes(destination)
    );

    return (
      parseTime(touchingStartDestination?.arrivalTime) <
      parseTime(touchingEndDestination?.arrivalTime)
    );
  });

export const filterByRoutes = (busSchedules, start, destination) =>
  busSchedules.filter((schedule) =>
    schedule.route.some(
      (route) => route.includes(start) && route.includes(destination)
    )
  );

export const getCurrentTrip = (schedules) =>
  schedules.find((schedule) =>
    schedule.stations.some(
      ({ arrivalTime }) => parseTime(arrivalTime) <= moment().toDate()
    )
  )?.stations;

export const getNextTripArrivalTime = (bus, from, to, filterTime) => {
  const filteredStations = filteredSchedule(
    bus.schedule,
    from.value.trim().toUpperCase(),
    to.value.trim().toUpperCase(),
    moment(filterTime, "HH:mm").toDate()
  );

  const matchingStations = filteredStations.flatMap(({ stations }) =>
    stations.filter(({ station }) =>
      station.includes(from.value.trim().toUpperCase())
    )
  );

  return matchingStations[0]?.arrivalTime;
};

export const sortBySchedule = (buses, start, destination, currentTime) =>
  buses.sort(
    (a, b) =>
      parseTime(findArrivalTime(a.schedule, start, destination, currentTime)) -
      parseTime(findArrivalTime(b.schedule, start, destination, currentTime))
  );

export const createAppState = () => {
  const from = signal("");
  const to = signal("");
  const filterTime = signal(moment().format("HH:mm"));
  const filteredBusResult = signal(null);
  const isLoading = signal(false);

  return { from, to, filteredBusResult, isLoading, filterTime };
};

export const removeDuplicatesAndSort = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) === index).sort();

export const useLocalizedTranslation = () => {
  const { t } = useTranslation();

  return { t };
};

export const AppState = createContext();
