import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  { name: "Sarah Chen", role: "VP Engineering, Nexlify", quote: "AgentLens saved us $18,000/month by identifying overlapping AI subscriptions we didn't even know we had.", avatar: "SC" },
  { name: "Marcus Rivera", role: "CTO, DataScale AI", quote: "The governance features alone justified the switch. We now enforce AI policies across 12 teams seamlessly.", avatar: "MR" },
  { name: "Priya Sharma", role: "Head of AI Ops, Quantium", quote: "We went from 11 AI tools to 5 without losing any capability. The recommendation engine is incredibly accurate.", avatar: "PS" },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="testimonials" className="relative" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center" style={{ marginBottom: 56 }}>
          <p className="text-label" style={{ marginBottom: 12, color: "#ff2d78" }}>INTEL REPORTS</p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#f0f4f8", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Field-tested by{" "}<span style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>industry leaders</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card hud-corners" style={{ padding: 28 }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <p style={{ fontSize: "0.86rem", color: "#7a8da0", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #00eaff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 600, color: "#020817", fontFamily: "'Space Grotesk'", boxShadow: "0 0 12px rgba(0,234,255,0.2)" }}>{t.avatar}</div>
                <div>
                  <p style={{ fontSize: "0.83rem", fontWeight: 600, color: "#e2e8f0" }}>{t.name}</p>
                  <p style={{ fontSize: "0.68rem", color: "#3a4a5c", letterSpacing: "0.03em" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
