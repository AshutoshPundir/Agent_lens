import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkflowVisualizer({ workflow }) {
  if (!workflow || workflow.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {workflow.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Step Card */}
          <div
            className="glass-card p-5"
            style={{ borderLeft: "2px solid rgba(6,182,212,0.2)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Step {step.step}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#f1f5f9",
                    marginTop: 4,
                  }}
                >
                  {step.tool}
                </h3>

                <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: 6 }}>
                  {step.purpose}
                </p>
              </div>

              {step.scoreOutOf100 && (
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "#06b6d4",
                    background: "rgba(6,182,212,0.08)",
                    border: "1px solid rgba(6,182,212,0.12)",
                    padding: "6px 14px",
                    borderRadius: 10,
                  }}
                >
                  {step.scoreOutOf100}/100
                </div>
              )}
            </div>
          </div>

          {/* Arrow connector */}
          {index !== workflow.length - 1 && (
            <div className="flex justify-center py-1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    width: 1,
                    height: 12,
                    background: "linear-gradient(180deg, rgba(6,182,212,0.3), rgba(139,92,246,0.1))",
                  }}
                />
                <ArrowDown size={14} style={{ color: "#334155" }} />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}