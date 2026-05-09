import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative" style={{ padding: "100px 24px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center" style={{ marginBottom: 48 }}>
          <p className="text-label" style={{ marginBottom: 12 }}>INTERFACE</p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#f0f4f8", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            A command center that{" "}<span className="gradient-text">thinks for you</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hud-corners" style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,234,255,0.08)", boxShadow: "0 20px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,234,255,0.04)" }}>
          {/* Window chrome */}
          <div className="flex items-center gap-2 energy-border" style={{ padding: "14px 18px", background: "rgba(10,14,26,0.9)", borderBottom: "1px solid rgba(0,234,255,0.04)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff2d78", opacity: 0.7 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff8c00", opacity: 0.7 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00ff88", opacity: 0.7 }} />
            <span style={{ marginLeft: 12, fontSize: "0.65rem", color: "#1a2a3c", letterSpacing: "0.06em", textTransform: "uppercase" }}>agentlens://command-center</span>
          </div>

          <div style={{ background: "rgba(2,8,23,0.95)", padding: 24 }}>
            <div className="grid grid-cols-4 gap-4" style={{ marginBottom: 16 }}>
              {[
                { label: "Health Score", value: "94%", color: "#00eaff" },
                { label: "Monthly Spend", value: "$3,200", color: "#a855f7" },
                { label: "Savings Found", value: "$1,840", color: "#00ff88" },
                { label: "Threat Level", value: "LOW", color: "#ff8c00" },
              ].map((card, i) => (
                <div key={i} className="hud-corners" style={{ padding: "16px 14px", borderRadius: 12, background: "rgba(13,18,37,0.6)", border: `1px solid ${card.color}10` }}>
                  <p style={{ fontSize: "0.55rem", color: "#2a3a4c", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{card.label}</p>
                  <p style={{ fontFamily: "'Space Grotesk'", fontSize: "1.2rem", fontWeight: 700, color: card.color, marginTop: 6, textShadow: `0 0 10px ${card.color}30` }}>{card.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2" style={{ padding: 18, borderRadius: 12, background: "rgba(13,18,37,0.6)", border: "1px solid rgba(0,234,255,0.04)", height: 160 }}>
                <p style={{ fontSize: "0.6rem", color: "#2a3a4c", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>TOKEN THROUGHPUT</p>
                <div className="flex items-end gap-2" style={{ height: 100 }}>
                  {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0", background: `rgba(0,234,255,${0.15 + i * 0.08})`, boxShadow: i === 5 ? "0 0 10px rgba(0,234,255,0.2)" : "none" }} />
                  ))}
                </div>
              </div>
              <div style={{ padding: 18, borderRadius: 12, background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.06)" }}>
                <p style={{ fontSize: "0.6rem", color: "#2a3a4c", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>OPTIMAL CONFIG</p>
                <p style={{ fontSize: "0.8rem", color: "#e2e8f0", fontWeight: 500 }}>Claude + Gemini</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#00ff88", fontFamily: "'Space Grotesk'", marginTop: 8, textShadow: "0 0 10px rgba(0,255,136,0.3)" }}>-$840/mo</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
