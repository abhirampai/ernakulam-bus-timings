import { signal } from "@preact/signals-react";
import i18n from "i18n";
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
      parseTime(findArrivalTime(a.schedule, start, destination, currentTime)) -
      parseTime(findArrivalTime(b.schedule, start, destination, currentTime))
  );

export const getTripProgress = (currentTrip) =>
  currentTrip.map(({ station, arrivalTime, departureTime }) => {
    const currentTime = moment();
    const tripCompleted = moment(arrivalTime, "HH:mm A") <= currentTime;
    const stationName = station.toLowerCase();
    const stationStatus = tripCompleted
      ? i18n.t("bus.reachedAt")
      : i18n.t("bus.willArriveAt");
    const scheduleTime = tripCompleted ? departureTime : arrivalTime;

    return {
      name: `${stationName} ${stationStatus} ${scheduleTime}`,
      completed: tripCompleted,
    };
  });

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

export const getCurrentTrip = (schedules) =>
  schedules
    .filter((schedule) =>
      schedule.stations.some(
        ({ arrivalTime }) => parseTime(arrivalTime) <= moment().toDate()
      )
    )
    ?.pop()?.stations;

export const getNextTripArrivalTime = (bus, from, to, filterTime) =>
  filteredSchedule(
    bus.schedule,
    from.value.trim().toUpperCase(),
    to.value.trim().toUpperCase(),
    moment(filterTime, "HH:mm").toDate()
  )
    .map(({ stations }) =>
      stations.filter(({ station }) =>
        station.includes(from.value.trim().toUpperCase())
      )
    )
    .flat()[0]?.arrivalTime;

export const findArrivalTimeBasedOnLocation = (schedules, location) =>
  schedules.find(({ station }) => station.includes(location))?.arrivalTime;

export const getTripEstimatedTime = (startTime, destinationTime) =>
  moment(moment(destinationTime, "HH:mm")).diff(
    moment(startTime, "HH:mm"),
    "minutes"
  );

export const AppState = createContext();
