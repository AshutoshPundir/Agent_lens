import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Eye, Shield } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const points = [
    { icon: <Zap size={20} />, color: "#00eaff", title: "Detect Waste Instantly", desc: "AI-powered analysis identifies redundant subscriptions and wasted tokens across your entire AI stack." },
    { icon: <Eye size={20} />, color: "#a855f7", title: "Full Visibility", desc: "See every tool, every dollar, every team — unified in a single intelligent command center." },
    { icon: <Shield size={20} />, color: "#00ff88", title: "Govern With Confidence", desc: "Enforce policies, validate workflows, and simulate budget scenarios before making costly decisions." },
  ];

  return (
    <section ref={ref} id="about" className="relative" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center" style={{ maxWidth: 600, margin: "0 auto 64px" }}>
          <p className="text-label" style={{ marginBottom: 12, color: "#00eaff" }}>WHY AGENTLENS</p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#f0f4f8", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Your AI stack is powerful.<br /><span style={{ color: "#3a4a5c" }}>But is it efficient?</span>
          </h2>
          <p style={{ fontSize: "0.92rem", color: "#4a5a6c", lineHeight: 1.7, marginTop: 16 }}>Most enterprises waste 30-40% of their AI budget on overlapping tools.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group glass-card hud-corners" style={{ padding: 32 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${p.color}25`; e.currentTarget.style.boxShadow = `0 0 30px ${p.color}10`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,234,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: `${p.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, marginBottom: 20 }} className="group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: "1.08rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 10 }}>{p.title}</h3>
              <p style={{ fontSize: "0.83rem", color: "#4a5a6c", lineHeight: 1.6 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
