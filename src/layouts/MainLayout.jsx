import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import PageTransition from "../components/ui/PageTransition";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient animated background */}
      <AnimatedBackground />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative" style={{ zIndex: 1 }}>
        <Topbar />

        <main
          className="flex-1 p-8 overflow-y-auto"
          style={{ paddingTop: 24 }}
        >
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}