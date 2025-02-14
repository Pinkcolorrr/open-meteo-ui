import { useOpenMeteoData } from "@domain/open-meteo";
import { CurrentWeather } from "@features/current-weather";
import { FutureWeather } from "@features/future-weather";
import { LocationSelect } from "@features/location-select";
import { TodayForecast } from "@features/today-forecast";
import { UserLocations } from "@features/user-locations";
import { Sidebar, SidebarTrigger } from "@shared/ui/sidebar.tsx";
import { Frown } from "lucide-react";

function App() {
  const { error } = useOpenMeteoData();

  return (
    <>
      <Sidebar>
        <div className={"flex flex-col justify-between h-full"}>
          <UserLocations />
          <LocationSelect />
        </div>
      </Sidebar>
      <main className={"relative w-full overflow-hidden"}>
        <SidebarTrigger className={"absolute top-4 left-4"} />

        <section
          className={"flex flex-col items-center gap-10 p-10 w-full overflow-auto max-h-[100vh]"}
        >
          {error && (
            <span className={"text-[1.7rem] bold flex items-center gap-3"}>
              Weather service is not available. <Frown />
            </span>
          )}
          {!error && (
            <>
              <CurrentWeather />
              <TodayForecast />
              <FutureWeather />
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
