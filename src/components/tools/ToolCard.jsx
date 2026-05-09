import { motion } from "framer-motion";

export default function ToolCard({ tool }) {
  const stats = [
    { label: "Monthly Price", value: `$${tool.monthlyPrice}`, color: "#e2e8f0" },
    { label: "Popularity", value: tool.popularityScore, color: "#06b6d4" },
    { label: "Ethical Score", value: tool.ethicalScore, color: "#8b5cf6" },
    { label: "Carbon / Req", value: tool.carbonPerRequest, color: "#f59e0b" },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card p-5 group"
      style={{ cursor: "default" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
            }}
          >
            {tool.name}
          </h3>
          <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: 3 }}>
            {tool.provider}
          </p>
        </div>

        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            color: "#06b6d4",
            background: "rgba(6,182,212,0.08)",
            border: "1px solid rgba(6,182,212,0.12)",
            padding: "3px 10px",
            borderRadius: 9999,
            letterSpacing: "0.02em",
            textTransform: "capitalize",
          }}
        >
          {tool.category}
        </span>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center justify-between">
            <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
              {stat.label}
            </span>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 500,
                color: stat.color,
              }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom gradient line */}
      <div
        className="mt-5 h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), rgba(139,92,246,0.2), transparent)",
        }}
      />
    </motion.div>
  );
}