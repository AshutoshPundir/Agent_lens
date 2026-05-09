import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function OptimalToolCard({ tool }) {
  if (!tool) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1))",
        border: "1px solid rgba(6,182,212,0.15)",
        borderRadius: 20,
        padding: "24px 28px",
        marginBottom: 28,
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), rgba(139,92,246,0.3), transparent)",
        }}
      />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Best Tool
          </p>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#f1f5f9",
              marginTop: 8,
              letterSpacing: "-0.02em",
            }}
          >
            {tool.tool}
          </h2>

          <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 6 }}>
            Highest ranked AI tool for this workflow
          </p>
        </div>

        <div className="text-center">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(139,92,246,0.1)",
            }}
          >
            <Trophy style={{ color: "#fff" }} size={28} />
          </div>

          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              marginTop: 10,
              background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <AnimatedCounter value={tool.scoreOutOf100} suffix="/100" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}