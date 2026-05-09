import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Impact", href: "#stats" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
        style={{ padding: scrolled ? "12px 24px" : "20px 24px", transition: "padding 0.4s ease" }}>
        <div className="flex items-center justify-between w-full transition-all duration-500 energy-border"
          style={{ maxWidth: 1200, padding: "12px 24px", borderRadius: scrolled ? 14 : 18,
            background: scrolled ? "rgba(2,8,23,0.85)" : "rgba(2,8,23,0.4)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: `1px solid rgba(0,234,255,${scrolled ? 0.08 : 0.04})`,
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,234,255,0.03)" : "none" }}>

          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #00eaff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(0,234,255,0.3)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#020817" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Space Grotesk'", fontSize: "1.05rem", fontWeight: 700, color: "#00eaff", textShadow: "0 0 10px rgba(0,234,255,0.2)" }}>AgentLens</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => { const el = document.querySelector(link.href); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                style={{ padding: "8px 16px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 400, color: "#5a6f85", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter'", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#00eaff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#5a6f85"; }}
              >{link.label}</button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashboard")}
              style={{ padding: "9px 22px", borderRadius: 9, fontSize: "0.8rem", fontWeight: 600, color: "#020817", background: "linear-gradient(135deg, #00eaff, #00c4d6)", border: "none", cursor: "pointer", fontFamily: "'Inter'", boxShadow: "0 0 16px rgba(0,234,255,0.2)", letterSpacing: "0.01em" }}>
              ▸ Dashboard
            </motion.button>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "#00eaff", cursor: "pointer" }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed inset-x-0 top-[72px] z-40 p-4 md:hidden">
            <div style={{ background: "rgba(2,8,23,0.95)", backdropFilter: "blur(24px)", border: "1px solid rgba(0,234,255,0.08)", borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map((link) => (
                <button key={link.label} onClick={() => { setMobileOpen(false); const el = document.querySelector(link.href); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  style={{ padding: "12px 16px", borderRadius: 8, fontSize: "0.88rem", color: "#5a6f85", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}>{link.label}</button>
              ))}
              <button onClick={() => { setMobileOpen(false); navigate("/dashboard"); }}
                style={{ marginTop: 8, padding: "12px 16px", borderRadius: 9, fontSize: "0.88rem", fontWeight: 600, color: "#020817", background: "linear-gradient(135deg, #00eaff, #00c4d6)", border: "none", cursor: "pointer" }}>▸ Dashboard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
