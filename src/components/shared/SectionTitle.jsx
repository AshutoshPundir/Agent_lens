import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: "'Space Grotesk'", fontSize: "1.4rem", fontWeight: 700, color: "#f0f4f8", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ fontSize: "0.78rem", color: "#2a3a4c", marginTop: 4, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 500 }}>
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}