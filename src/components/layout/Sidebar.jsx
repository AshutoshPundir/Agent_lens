import { LayoutDashboard, Wrench, Sparkles, BarChart3, BrainCircuit, Users, ShieldCheck, Building2, Home } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Tools", path: "/dashboard/tools", icon: Wrench },
  { name: "Recommend", path: "/dashboard/recommend", icon: Sparkles },
  { name: "Spend Analytics", path: "/dashboard/analytics/spend", icon: BarChart3 },
  { name: "Optimization", path: "/dashboard/analytics/optimization", icon: BrainCircuit },
  { name: "Team Analytics", path: "/dashboard/analytics/team/Engineering", icon: Users },
  { name: "Governance", path: "/dashboard/governance", icon: ShieldCheck },
  { name: "Organization", path: "/dashboard/organization", icon: Building2 },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col justify-between relative scan-effect"
      style={{ width: "var(--sidebar-width)", minHeight: "100vh", background: "rgba(10,14,26,0.8)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRight: "1px solid rgba(0,234,255,0.04)", padding: "28px 16px 20px", zIndex: 10 }}>
      <div>
        {/* Logo */}
        <div style={{ padding: "0 12px", marginBottom: 12 }}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg, #00eaff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(0,234,255,0.25)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#020817" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
            </div>
            <div>
              <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: "1.12rem", fontWeight: 700, color: "#00eaff", letterSpacing: "-0.01em", lineHeight: 1.2, textShadow: "0 0 10px rgba(0,234,255,0.15)" }}>AgentLens</h1>
              <p style={{ fontSize: "0.6rem", color: "#2a3a4c", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginTop: 1 }}>Command Center</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <motion.button whileHover={{ x: 2 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 w-full rounded-lg mb-6 transition-all duration-200"
          style={{ padding: "9px 14px", color: "#3a4a5c", background: "none", border: "1px solid rgba(0,234,255,0.04)", cursor: "pointer", fontSize: "0.78rem", fontFamily: "'Inter'", borderRadius: 10, transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#00eaff"; e.currentTarget.style.borderColor = "rgba(0,234,255,0.12)"; e.currentTarget.style.background = "rgba(0,234,255,0.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#3a4a5c"; e.currentTarget.style.borderColor = "rgba(0,234,255,0.04)"; e.currentTarget.style.background = "none"; }}>
          <Home size={14} /> ← Back to Home
        </motion.button>

        {/* Nav label */}
        <p style={{ fontSize: "0.6rem", fontWeight: 500, color: "#1a2a3c", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 16px", marginBottom: 8 }}>Systems</p>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(item.path);
            return (
              <NavLink key={item.name} to={item.path}
                className="relative flex items-center gap-3 rounded-xl transition-all duration-200"
                style={{ padding: "10px 14px", color: isActive ? "#00eaff" : "#4a5a6c", background: isActive ? "rgba(0,234,255,0.06)" : "transparent", textDecoration: "none", fontSize: "0.83rem", fontWeight: isActive ? 500 : 400 }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(0,234,255,0.03)"; e.currentTarget.style.color = "#7a8da0"; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4a5a6c"; } }}>
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2"
                    style={{ width: 3, height: 20, borderRadius: 2, background: "linear-gradient(180deg, #00eaff, #a855f7)", boxShadow: "0 0 10px rgba(0,234,255,0.5)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                )}
                <Icon size={17} style={{ color: isActive ? "#00eaff" : "inherit", transition: "color 200ms", flexShrink: 0 }} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(0,234,255,0.04)", paddingTop: 16 }}>
        <div style={{ padding: "0 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 10px rgba(0,255,136,0.6)", animation: "pulse-glow 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.68rem", color: "#2a3a4c", fontWeight: 500, letterSpacing: "0.04em" }}>SYSTEM ONLINE — v2.0</span>
        </div>
      </div>
    </aside>
  );
}