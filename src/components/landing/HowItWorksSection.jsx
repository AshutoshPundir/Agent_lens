import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Connect Your AI Stack", desc: "Link your organization's AI subscriptions — ChatGPT, Claude, Gemini, Copilot, and 30+ more tools.", color: "#00eaff" },
  { num: "02", title: "Neural Analysis", desc: "Our engine scans usage patterns, spending, overlaps, redundancies, and compliance against your policies.", color: "#a855f7" },
  { num: "03", title: "Intelligence Report", desc: "Receive AI-powered recommendations to optimize spend, eliminate waste, and build the perfect AI stack.", color: "#00ff88" },
  { num: "04", title: "Deploy & Scale", desc: "Implement optimizations with confidence. Track savings, govern teams, and scale your AI infrastructure.", color: "#ff8c00" },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="how-it-works" className="relative" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center" style={{ marginBottom: 64 }}>
          <p className="text-label" style={{ marginBottom: 12, color: "#00ff88" }}>PROTOCOL</p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#f0f4f8", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Four-phase{" "}<span style={{ background: "linear-gradient(135deg, #00ff88, #00eaff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>optimization</span>
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-0">
          <div className="absolute left-[23px] top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(180deg, rgba(0,234,255,0.15), rgba(168,85,247,0.15), rgba(0,255,136,0.15), rgba(255,140,0,0.08))" }} />
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="flex gap-6 items-start relative" style={{ paddingBottom: i < steps.length - 1 ? 48 : 0 }}>
              <div className="flex-shrink-0 relative z-10 hud-corners" style={{ width: 48, height: 48, borderRadius: 12, background: `${step.color}08`, border: `1px solid ${step.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Space Grotesk'", fontSize: "0.82rem", fontWeight: 700, color: step.color, textShadow: `0 0 10px ${step.color}40` }}>{step.num}</span>
              </div>
              <div style={{ paddingTop: 4 }}>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: "1.08rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: "0.83rem", color: "#4a5a6c", lineHeight: 1.65, maxWidth: 500 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
