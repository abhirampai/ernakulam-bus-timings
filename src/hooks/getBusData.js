import axios from "axios";
import { useQuery } from "react-query";

const getBusTimings = () =>
  axios.get(
    "https://raw.githubusercontent.com/amith-vp/Kerala-Private-Bus-Timing/main/ernakulam.json"
  );

const useGetBusData = () => useQuery("bus-timings", getBusTimings);

export { useGetBusData };
