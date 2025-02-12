import "./App.css";

import { useOpenMeteoData } from "@domain/open-meteo";
import { CurrentWeather } from "@features/current-weather";
import { FutureWeather } from "@features/future-weather";
import { LocationSelect } from "@features/location-select";
import { TodayForecast } from "@features/today-forecast";
import { Sidebar, SidebarTrigger } from "@shared/ui/sidebar.tsx";

function App() {
  const { error } = useOpenMeteoData();

  return (
    <>
      <Sidebar>
        <LocationSelect />
      </Sidebar>
      <main className={"relative w-full overflow-hidden"}>
        <SidebarTrigger className={"absolute top-4 left-4"} />
        {error ? (
          "Weather service is not available."
        ) : (
          <section
            className={"flex flex-col items-center gap-10 p-10 w-full overflow-auto max-h-[100vh]"}
          >
            <CurrentWeather />
            <TodayForecast />
            <FutureWeather />
          </section>
        )}
      </main>
    </>
  );
}

export default App;
