import axios from "axios";
import { useQuery } from "react-query";

const getBusTimings = () =>
  axios.get(
    "https://raw.githubusercontent.com/amith-vp/Kerala-Private-Bus-Timing/main/ernakulam.json"
  );

const removeDuplicatesAndSort = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index).sort();
};

const useGetBusData = () =>
  useQuery("bus-timings", getBusTimings, {
    cacheTime: 86400000,
    select: ({ data }) => {
      return {
        busSchedules: data.busSchedules,
        routes: removeDuplicatesAndSort(
          data.busSchedules.map((route) => route.route).flat()
        ),
      };
    },
  });

export { useGetBusData };
