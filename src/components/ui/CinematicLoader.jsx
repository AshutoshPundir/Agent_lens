import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(() => onComplete?.(), 400); return 100; }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress < 105 && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#020817" }}>
          {/* Cyber grid bg */}
          <div className="absolute inset-0 cyber-grid opacity-40" />

          {/* Glows */}
          <div className="absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,234,255,0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />

          {/* Logo */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 relative z-10">
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #00eaff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(0,234,255,0.3), 0 0 80px rgba(0,234,255,0.1)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#020817" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: "1.3rem", fontWeight: 700, color: "#00eaff", letterSpacing: "-0.01em", textShadow: "0 0 20px rgba(0,234,255,0.3)" }}>AgentLens</h1>
            <p style={{ fontSize: "0.6rem", color: "#1a2a3c", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>Initializing Systems</p>
          </motion.div>

          {/* Progress */}
          <div className="relative z-10" style={{ width: 200, marginTop: 32 }}>
            <div style={{ height: 2, background: "rgba(0,234,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div animate={{ width: `${Math.min(progress, 100)}%` }}
                style={{ height: "100%", background: "linear-gradient(90deg, #00eaff, #a855f7)", borderRadius: 2, boxShadow: "0 0 10px rgba(0,234,255,0.4)" }} />
            </div>
            <p style={{ fontSize: "0.6rem", color: "#1a2a3c", textAlign: "center", marginTop: 8, fontFamily: "'Space Grotesk'", letterSpacing: "0.1em" }}>{Math.min(Math.floor(progress), 100)}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
