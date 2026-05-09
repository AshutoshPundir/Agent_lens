import { X, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToolComparisonModal({
  open,
  onClose,
  comparison,
}) {
  if (!comparison) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-6"
          style={{ zIndex: 100 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl"
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 24,
              padding: 32,
              maxHeight: "85vh",
              overflowY: "auto",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute flex items-center justify-center"
              style={{
                top: 20,
                right: 20,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              <X size={16} />
            </motion.button>

            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  color: "#06b6d4",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                AI Comparison
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginTop: 6,
                  letterSpacing: "-0.02em",
                }}
              >
                {comparison.tools[0].name} vs {comparison.tools[1].name}
              </h2>
            </div>

            {/* Winner card */}
            <div
              className="flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))",
                border: "1px solid rgba(6,182,212,0.12)",
                borderRadius: 20,
                padding: "20px 24px",
                marginBottom: 28,
              }}
            >
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
                  Winner
                </p>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "#f1f5f9",
                    marginTop: 6,
                  }}
                >
                  {comparison.analysis.winner}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: 6, lineHeight: 1.5 }}>
                  {comparison.analysis.summary}
                </p>
              </div>

              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 24px rgba(6,182,212,0.3)",
                }}
              >
                <Trophy style={{ color: "#fff" }} size={28} />
              </div>
            </div>

            {/* Comparison breakdown */}
            <div className="flex flex-col gap-3">
              {Object.entries(comparison.analysis.comparison).map(
                ([category, details], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="glass-card p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "#e2e8f0",
                            textTransform: "capitalize",
                          }}
                        >
                          {category}
                        </h4>
                        <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: 4 }}>
                          {details.reason}
                        </p>
                      </div>

                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          color: "#06b6d4",
                          background: "rgba(6,182,212,0.08)",
                          border: "1px solid rgba(6,182,212,0.12)",
                          padding: "5px 14px",
                          borderRadius: 10,
                        }}
                      >
                        {details.winner}
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}