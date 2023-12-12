import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import BusTimings from "./components/BusTimings";
import i18next from "./i18n";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-3xl font-bold p-5 text-center dark:text-gray-100">
        {i18next.t("landingPageHeading")}
      </div>
      <BusTimings />
      <div id="portal"></div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
