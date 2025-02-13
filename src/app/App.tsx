import "./App.css";

import { useOpenMeteoData } from "@domain/open-meteo";
import { CurrentWeather } from "@features/current-weather";
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
      </main>
    </>
  );
}

export default App;
