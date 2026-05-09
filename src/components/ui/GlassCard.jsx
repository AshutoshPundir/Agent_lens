import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function GlassCard({ children, className = "", hover3d = false, glowColor = "cyan", padding = "p-6", animate = true, delay = 0, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const glowColors = {
    cyan: "rgba(0,234,255,0.1)", violet: "rgba(168,85,247,0.1)", emerald: "rgba(0,255,136,0.1)",
    blue: "rgba(59,130,246,0.1)", amber: "rgba(255,140,0,0.1)", rose: "rgba(255,45,120,0.1)",
  };

  const handleMouseMove = (e) => {
    if (!hover3d || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -8, y: ((e.clientX - rect.left) / rect.width - 0.5) * 8 });
  };

  const Wrapper = animate ? motion.div : "div";
  const animateProps = animate ? { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] } } : {};

  return (
    <Wrapper ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={() => hover3d && setTilt({ x: 0, y: 0 })}
      {...animateProps}
      className={`glass-card ${padding} group ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ transform: hover3d ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : undefined, transition: hover3d ? "transform 0.15s ease-out" : undefined }}>
      {/* Top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${glowColors[glowColor] || glowColors.cyan}, transparent)` }} />
      <div className="relative z-10">{children}</div>
    </Wrapper>
  );
}
