import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}
