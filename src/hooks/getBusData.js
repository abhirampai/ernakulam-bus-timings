import { useQuery } from "react-query";
import { removeDuplicatesAndSort } from "./utils";
import { get } from "apis/bus";

const useGetBusData = () =>
  useQuery("bus-timings", get, {
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
