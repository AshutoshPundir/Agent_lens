import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function StatCard({ title, value, icon, subtitle, delay = 0, glowColor = "cyan" }) {
  const map = {
    cyan: { iconBg: "rgba(0,234,255,0.08)", iconColor: "#00eaff", hover: "rgba(0,234,255,0.12)" },
    emerald: { iconBg: "rgba(0,255,136,0.08)", iconColor: "#00ff88", hover: "rgba(0,255,136,0.12)" },
    violet: { iconBg: "rgba(168,85,247,0.08)", iconColor: "#a855f7", hover: "rgba(168,85,247,0.12)" },
    amber: { iconBg: "rgba(255,140,0,0.08)", iconColor: "#ff8c00", hover: "rgba(255,140,0,0.12)" },
    rose: { iconBg: "rgba(255,45,120,0.08)", iconColor: "#ff2d78", hover: "rgba(255,45,120,0.12)" },
  };
  const g = map[glowColor] || map.cyan;
  const numMatch = String(value).match(/[\d.]+/);
  const numVal = numMatch ? parseFloat(numMatch[0]) : null;
  const prefix = String(value).match(/^[^\d]*/)?.[0] || "";
  const suffix = String(value).match(/[^\d]*$/)?.[0] || "";

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-5 group hud-corners"
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = g.hover; e.currentTarget.style.boxShadow = `0 0 20px ${g.hover}40`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,234,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div className="flex items-center justify-between mb-4">
        <p style={{ fontSize: "0.72rem", fontWeight: 500, color: "#3a4a5c", letterSpacing: "0.05em", textTransform: "uppercase" }}>{title}</p>
        {icon && <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ width: 36, height: 36, borderRadius: 9, background: g.iconBg, color: g.iconColor }}>{icon}</div>}
      </div>
      <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "1.75rem", fontWeight: 700, color: "#f0f4f8", letterSpacing: "-0.02em", lineHeight: 1.2, textShadow: `0 0 15px ${g.hover}` }}>
        {numVal !== null ? <AnimatedCounter value={numVal} prefix={prefix} suffix={suffix} duration={1200} /> : value}
      </h2>
      {subtitle && <p style={{ fontSize: "0.7rem", color: "#2a3a4c", marginTop: 8, letterSpacing: "0.03em" }}>{subtitle}</p>}
    </motion.div>
  );
}