import "./App.css";

import { useOpenMeteoData } from "@domain/open-meteo";
import { CurrentWeather } from "@features/current-weather";
import { FutureWeather } from "@features/future-weather";
import { TodayForecast } from "@features/today-forecast";

function App() {
  const { error } = useOpenMeteoData();

  if (error) {
    return <div>Weather service is not available</div>;
  }

  return (
    <>
      <main className={"flex flex-col items-center gap-10"}>
        <CurrentWeather />
        <TodayForecast />
        <FutureWeather />
      </main>
    </>
  );
}

export default App;
