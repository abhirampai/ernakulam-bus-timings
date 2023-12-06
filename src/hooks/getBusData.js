import axios from "axios";
import { useQuery } from "react-query";

const getBusTimings = () =>
  axios.get(
    "https://raw.githubusercontent.com/amith-vp/Kerala-Private-Bus-Timing/main/ernakulam.json"
  );

const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const useGetBusData = () =>
  useQuery("bus-timings", getBusTimings, {
    select: ({ data }) => {
      return {
        busSchedules: data.busSchedules,
        routes: removeDuplicates(
          data.busSchedules.map((route) => route.route).flat()
        ),
      };
    },
  });

export { useGetBusData };
