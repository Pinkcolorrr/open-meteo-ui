import "./App.css";

import { useOpenMeteoData } from "@domain/open-meteo";
import { CurrentWeather } from "@features/current-weather";
import { FutureWeather } from "@features/future-weather";
import { LocationSelect } from "@features/location-select";
import { TodayForecast } from "@features/today-forecast";
import { Sidebar, SidebarTrigger } from "@shared/ui/sidebar.tsx";

function App() {
  const { error } = useOpenMeteoData();

  if (error) {
    return <div>Weather service is not available</div>;
  }

  return (
    <>
      <Sidebar>
        <LocationSelect />
      </Sidebar>
      <main className={"flex flex-col items-center gap-10 relative w-full p-10"}>
        <SidebarTrigger className={"absolute top-4 left-4"} />
        <CurrentWeather />
        <TodayForecast />
        <FutureWeather />
      </main>
    </>
  );
}

export default App;
