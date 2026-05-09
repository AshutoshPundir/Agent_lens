import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 hud-corners"
      style={{ background: "rgba(255,45,120,0.04)", border: "1px solid rgba(255,45,120,0.1)", borderRadius: 14, padding: "14px 18px", color: "#ff2d78", fontSize: "0.83rem" }}>
      <AlertCircle size={17} style={{ flexShrink: 0 }} />
      {message}
    </motion.div>
  );
}