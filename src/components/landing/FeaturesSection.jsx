import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { BrainCircuit, BarChart3, ShieldCheck, Sparkles, Layers3, Users } from "lucide-react";

const features = [
  { icon: <BrainCircuit size={22} />, color: "#00eaff", title: "Neural Recommendations", desc: "AI engine recommends optimal tool configurations based on usage and budget." },
  { icon: <BarChart3 size={22} />, color: "#a855f7", title: "Spend Intelligence", desc: "Deep analysis of costs, waste, and optimization opportunities." },
  { icon: <ShieldCheck size={22} />, color: "#00ff88", title: "Policy Governance", desc: "Validate workflows against organization protocols automatically." },
  { icon: <Sparkles size={22} />, color: "#ff8c00", title: "Optimization Core", desc: "AI-generated insights to eliminate redundancies and reduce cost." },
  { icon: <Layers3 size={22} />, color: "#ff2d78", title: "Tool Comparison", desc: "Side-by-side analysis across pricing, performance, and capability." },
  { icon: <Users size={22} />, color: "#3b82f6", title: "Team Telemetry", desc: "Per-team AI usage tracking, spending patterns, and efficiency." },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="features" className="relative" style={{ padding: "120px 24px" }}>
      <div className="absolute" style={{ top: "30%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center" style={{ maxWidth: 560, margin: "0 auto 64px" }}>
          <p className="text-label" style={{ marginBottom: 12, color: "#a855f7" }}>SYSTEMS</p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#f0f4f8", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Full-spectrum{" "}<span className="gradient-text">AI control</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const [tilt, setTilt] = useState({ x: 0, y: 0 });
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group glass-card hud-corners" style={{ padding: 28, cursor: "default", transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease-out" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -6, y: ((e.clientX - rect.left) / rect.width - 0.5) * 6 });
                }}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${f.color}20`; }}
                >
                <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${f.color}50, transparent)` }} />
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `${f.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: "0.98rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "#4a5a6c", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
