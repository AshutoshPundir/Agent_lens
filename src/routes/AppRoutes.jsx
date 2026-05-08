import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Tools from "../pages/Tools";
import Recommend from "../pages/Recommend";
import Governance from "../pages/Governance";
import SpendAnalytics from "../pages/SpendAnalytics";
import Optimization from "../pages/Optimization";
import Organization from "../pages/Organization";
import TeamAnalytics from "../pages/TeamAnalytics";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>

        <Route index element={<Dashboard />} />

        <Route path="recommend" element={<Recommend />}/>

        <Route path="tools" element={<Tools />} />

        <Route path="governance" element={<Governance/>} />

        <Route path="analytics/spend" element={<SpendAnalytics/>} />

        <Route path="analytics/optimization" element={<Optimization/>} />

        <Route path="organization" element={<Organization />} />

        <Route path="recommend" element={<Recommend />} />

        <Route path="analytics/team/:teamName" element={<TeamAnalytics />} />

      </Route>

    </Routes>
  );
}