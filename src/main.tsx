import "./index.css";

import { Providers } from "@app/providers";
import { ActiveGeoLocationHandler, CurrentGeoLocationHandler } from "@store/geo-location";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <CurrentGeoLocationHandler />
      <ActiveGeoLocationHandler />
      <App />
    </Providers>
  </StrictMode>,
);
