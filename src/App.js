import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import BusTimings from "./components/BusTimings";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-3xl font-bold">Ernakulam Bus Timings</div>
      <div className="text-xl font-semibold p-5">Only Major bus stops documented</div>
      <BusTimings />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
