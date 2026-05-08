import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Tools from "../pages/Tools";
import Recommend from "../pages/Recommend";
import Governance from "../pages/Governance";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>

        <Route index element={<Dashboard />} />

        <Route path="tools" element={<Tools />} />

        <Route path="governance" element={<Governance/>} />

        <Route path="recommend" element={<Recommend />} />

      </Route>

    </Routes>
  );
}