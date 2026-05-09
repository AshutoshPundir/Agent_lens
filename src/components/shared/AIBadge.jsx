import { motion } from "framer-motion";

export default function AIBadge() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center gap-1.5"
      style={{
        padding: "5px 12px",
        borderRadius: 9999,
        background: "rgba(6, 182, 212, 0.08)",
        border: "1px solid rgba(6, 182, 212, 0.15)",
        fontSize: "0.7rem",
        fontWeight: 500,
        color: "#06b6d4",
        letterSpacing: "0.03em",
      }}
    >
      {/* Animated dot */}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#06b6d4",
          boxShadow: "0 0 6px rgba(6,182,212,0.6)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      />
      Powered by Groq AI
    </motion.span>
  );
}