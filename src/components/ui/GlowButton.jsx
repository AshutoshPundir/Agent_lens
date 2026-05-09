import { motion } from "framer-motion";

const variants = {
  primary: { bg: "linear-gradient(135deg, #00eaff, #00c4d6)", text: "#020817", shadow: "0 0 24px rgba(0,234,255,0.3)" },
  success: { bg: "linear-gradient(135deg, #00ff88, #00c4d6)", text: "#020817", shadow: "0 0 24px rgba(0,255,136,0.3)" },
  secondary: { bg: "rgba(0,234,255,0.04)", text: "#7a8da0", border: "1px solid rgba(0,234,255,0.08)", shadow: "none" },
  ghost: { bg: "transparent", text: "#5a6f85", border: "1px solid rgba(0,234,255,0.06)", shadow: "none" },
  danger: { bg: "linear-gradient(135deg, #ff2d78, #e11d48)", text: "#fff", shadow: "0 0 24px rgba(255,45,120,0.3)" },
};

export default function GlowButton({ children, variant = "primary", onClick, type = "button", disabled = false, className = "", icon, size = "md" }) {
  const s = variants[variant] || variants.primary;
  const sizes = { sm: "px-4 py-2 text-sm gap-1.5", md: "px-6 py-3 text-sm gap-2", lg: "px-8 py-4 text-base gap-2.5" };

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03, y: -1 }} whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ${sizes[size]} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      style={{ background: s.bg, color: s.text, border: s.border || "none", fontFamily: "'Inter'", letterSpacing: "0.01em" }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.boxShadow = s.shadow; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
