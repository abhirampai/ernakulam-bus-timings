import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import BusTimings from "./components/BusTimings";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-3xl font-bold p-5 text-center dark:text-gray-100">
        Ernakulam Private Bus Timings
      </div>
      <BusTimings />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
