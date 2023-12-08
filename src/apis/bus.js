import axios from "axios";

const get = () =>
  axios.get(
    "https://raw.githubusercontent.com/amith-vp/Kerala-Private-Bus-Timing/main/ernakulam.json"
  );

export { get };
