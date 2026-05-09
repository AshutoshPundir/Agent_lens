import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

export default function EmptyState({ title = "No data available", subtitle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center glass-card" style={{ padding: "48px 32px" }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(0,234,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00eaff", marginBottom: 16 }}>
        <Inbox size={24} />
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: "1rem", fontWeight: 600, color: "#5a6f85" }}>{title}</h3>
      {subtitle && <p style={{ fontSize: "0.78rem", color: "#2a3a4c", marginTop: 8 }}>{subtitle}</p>}
    </motion.div>
  );
}