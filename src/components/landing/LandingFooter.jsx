export default function LandingFooter() {
  return (
    <footer className="energy-border" style={{ padding: "48px 24px 32px", borderTop: "1px solid rgba(0,234,255,0.04)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #00eaff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#020817" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
            </div>
            <span style={{ fontFamily: "'Space Grotesk'", fontSize: "0.88rem", fontWeight: 600, color: "#00eaff", textShadow: "0 0 8px rgba(0,234,255,0.15)" }}>AgentLens</span>
          </div>
          <p style={{ fontSize: "0.68rem", color: "#1a2a3c", letterSpacing: "0.05em" }}>© 2026 AGENTLENS SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" style={{ fontSize: "0.72rem", color: "#2a3a4c", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.04em", textTransform: "uppercase" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00eaff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2a3a4c")}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
