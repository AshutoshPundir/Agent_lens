import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "../ui/AnimatedCounter";

const stats = [
  { value: 150, suffix: "+", label: "Enterprise Clients", color: "#00eaff" },
  { value: 2.4, prefix: "$", suffix: "M+", label: "Saved Monthly", color: "#00ff88", decimals: 1 },
  { value: 38, suffix: "+", label: "AI Tools Indexed", color: "#a855f7" },
  { value: 99.9, suffix: "%", label: "Platform Uptime", color: "#ff8c00", decimals: 1 },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="stats" className="relative" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="glass-card hud-corners" style={{ padding: "56px 40px", overflow: "visible" }}>
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,234,255,0.2), rgba(168,85,247,0.15), rgba(255,45,120,0.1), transparent)" }} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.1 }} className="text-center">
                <p style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: s.color, letterSpacing: "-0.02em", textShadow: `0 0 20px ${s.color}30` }}>
                  <AnimatedCounter value={s.value} prefix={s.prefix || ""} suffix={s.suffix} decimals={s.decimals || 0} />
                </p>
                <p style={{ fontSize: "0.72rem", color: "#3a4a5c", marginTop: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
