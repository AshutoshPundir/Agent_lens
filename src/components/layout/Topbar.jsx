import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const pageTitles = {
  "/dashboard": { title: "Command Center", subtitle: "AI ecosystem overview" },
  "/dashboard/tools": { title: "Tool Registry", subtitle: "Browse and compare AI tools" },
  "/dashboard/recommend": { title: "Neural Engine", subtitle: "AI-powered recommendations" },
  "/dashboard/analytics/spend": { title: "Spend Analysis", subtitle: "Subscription cost intelligence" },
  "/dashboard/analytics/optimization": { title: "Optimization Core", subtitle: "Efficiency analysis engine" },
  "/dashboard/governance": { title: "Governance Protocol", subtitle: "Policy validation system" },
  "/dashboard/organization": { title: "Org Configuration", subtitle: "Enterprise AI setup" },
};

function getPageInfo(pathname) {
  if (pathname.startsWith("/dashboard/analytics/team")) return { title: "Team Telemetry", subtitle: "Workflow and spend analytics" };
  return pageTitles[pathname] || { title: "Command Center", subtitle: "AgentLens HQ" };
}

export default function Topbar() {
  const location = useLocation();
  const pageInfo = getPageInfo(location.pathname);

  return (
    <header className="flex items-center relative energy-border"
      style={{ height: "var(--topbar-height)", padding: "0 32px", background: "rgba(10,14,26,0.5)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,234,255,0.04)", zIndex: 5 }}>
      <div>
        <motion.h1 key={pageInfo.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Space Grotesk'", fontSize: "1.15rem", fontWeight: 600, color: "#e2e8f0", letterSpacing: "-0.01em" }}>
          {pageInfo.title}
        </motion.h1>
        <motion.p key={pageInfo.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ fontSize: "0.72rem", color: "#2a3a4c", marginTop: 2, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 500 }}>
          {pageInfo.subtitle}
        </motion.p>
      </div>
    </header>
  );
}