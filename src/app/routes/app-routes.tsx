import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRoutes({ children }: { children: ReactNode }) {
  return (
    <Routes>
      <Route path={"/open-meteo-ui"} element={children} />
      <Route path="*" element={<Navigate to={"/open-meteo-ui"} />} />
    </Routes>
  );
}
