import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedCounter from "../ui/AnimatedCounter";
import RobotScene from "./RobotScene";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: 100, paddingBottom: 80 }}>
      {/* Ambient glows */}
      <div className="absolute" style={{ top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,234,255,0.06) 0%, transparent 50%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div className="absolute" style={{ bottom: "10%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 50%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <RobotScene />
      </div>

      <div className="relative z-10 w-full" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pointer-events-none">
          {/* Left — Copy */}
          <div className="pointer-events-auto">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <span className="hud-corners" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 8, background: "rgba(0,234,255,0.04)", border: "1px solid rgba(0,234,255,0.1)", fontSize: "0.7rem", fontWeight: 500, color: "#00eaff", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00eaff", boxShadow: "0 0 10px rgba(0,234,255,0.8)", animation: "pulse-glow 2s ease-in-out infinite" }} />
                System Online — v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#f0f4f8", lineHeight: 1.05, letterSpacing: "-0.03em", marginTop: 28 }}>
              The AI Cost{" "}<br />
              <span className="animate-gradient" style={{ background: "linear-gradient(135deg, #00eaff, #a855f7, #ff2d78, #00eaff)", backgroundSize: "300% 300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Intelligence Engine</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{ fontSize: "1.05rem", color: "#5a6f85", lineHeight: 1.7, marginTop: 20, maxWidth: 460 }}>
              AgentLens scans your AI stack, detects wasted spending, eliminates redundancy, and builds the perfect tool configuration — saving enterprises thousands monthly.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-3" style={{ marginTop: 36 }}>
              <motion.button whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 40px rgba(0,234,255,0.3), 0 0 80px rgba(0,234,255,0.1)" }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/dashboard")}
                style={{ padding: "15px 34px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, color: "#020817", background: "linear-gradient(135deg, #00eaff, #00c4d6)", border: "none", cursor: "pointer", fontFamily: "'Inter'", boxShadow: "0 0 30px rgba(0,234,255,0.2), 0 4px 20px rgba(0,0,0,0.3)", letterSpacing: "0.01em" }}>
                ▸ Launch Dashboard
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, borderColor: "rgba(0,234,255,0.3)" }} whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                style={{ padding: "15px 34px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 500, color: "#7a8da0", background: "rgba(0,234,255,0.03)", border: "1px solid rgba(0,234,255,0.08)", cursor: "pointer", fontFamily: "'Inter'", transition: "all 0.3s" }}>
                How It Works
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.85 }}
              className="flex gap-10 flex-wrap" style={{ marginTop: 52, paddingTop: 28, borderTop: "1px solid rgba(0,234,255,0.06)" }}>
              {[
                { value: 38, suffix: "+", label: "AI Tools", color: "#00eaff" },
                { value: 2400, prefix: "$", suffix: "+", label: "Avg. Savings/mo", color: "#a855f7" },
                { value: 99.9, suffix: "%", label: "Uptime", color: "#00ff88" },
              ].map((s, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'Space Grotesk'", fontSize: "1.6rem", fontWeight: 700, color: s.color, letterSpacing: "-0.02em", textShadow: `0 0 15px ${s.color}30` }}>
                    <AnimatedCounter value={s.value} prefix={s.prefix || ""} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#3a4a5c", marginTop: 4, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Empty placeholder to maintain grid layout since robot is now full bleed background */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p style={{ fontSize: "0.6rem", color: "#2a3a4c", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>Scroll</p>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 18, height: 28, borderRadius: 9, border: "1px solid rgba(0,234,255,0.1)", display: "flex", justifyContent: "center", paddingTop: 5 }}>
          <div style={{ width: 2, height: 7, borderRadius: 2, background: "rgba(0,234,255,0.4)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
