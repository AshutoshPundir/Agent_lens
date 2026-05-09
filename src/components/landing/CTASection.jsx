import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="relative" style={{ padding: "120px 24px", overflow: "hidden" }}>
      <div className="absolute" style={{ top: "20%", left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,234,255,0.06) 0%, transparent 60%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div className="absolute" style={{ bottom: "10%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        className="relative text-center" style={{ maxWidth: 700, margin: "0 auto" }}>
        <p className="text-label animate-gradient" style={{ marginBottom: 16, background: "linear-gradient(135deg, #00eaff, #a855f7, #ff2d78)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>INITIATE SEQUENCE</p>

        <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#f0f4f8", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Deploy your AI<br />optimization engine{" "}
          <span className="animate-gradient" style={{ background: "linear-gradient(135deg, #00eaff, #a855f7, #ff2d78, #00eaff)", backgroundSize: "300% 300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>now.</span>
        </h2>

        <p style={{ fontSize: "0.92rem", color: "#4a5a6c", lineHeight: 1.7, marginTop: 20, maxWidth: 500, margin: "20px auto 0" }}>
          Join 150+ enterprises already using AgentLens. Free analysis — zero commitment.
        </p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4" style={{ marginTop: 36 }}>
          <motion.button whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 50px rgba(0,234,255,0.3), 0 0 100px rgba(0,234,255,0.1)" }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
            style={{ padding: "16px 40px", borderRadius: 12, fontSize: "0.95rem", fontWeight: 600, color: "#020817", background: "linear-gradient(135deg, #00eaff, #00c4d6)", border: "none", cursor: "pointer", fontFamily: "'Inter'", boxShadow: "0 0 40px rgba(0,234,255,0.25), 0 8px 32px rgba(0,0,0,0.3)", letterSpacing: "0.01em" }}>
            ▸ Launch Dashboard <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6" style={{ marginTop: 48 }}>
          {["No credit card", "Free tier", "SOC 2", "GDPR ready"].map((badge, i) => (
            <span key={i} style={{ fontSize: "0.68rem", color: "#2a3a4c", fontWeight: 500, display: "flex", alignItems: "center", gap: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 6px rgba(0,255,136,0.5)" }} />
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
