import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* Canvas-based Holographic Robot Head */
function RobotCanvas({ mouse }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = 500, h = 500;
    canvas.width = w; canvas.height = h;

    const particles = [];
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 80;
      particles.push({
        angle, radius, speed: (Math.random() - 0.5) * 0.008,
        size: Math.random() * 2 + 0.5,
        yOffset: (Math.random() - 0.5) * 120,
        color: Math.random() > 0.6 ? "#00eaff" : Math.random() > 0.3 ? "#a855f7" : "#ff2d78",
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // Orbital ring particles
    const rings = [];
    for (let i = 0; i < 80; i++) {
      rings.push({
        angle: (i / 80) * Math.PI * 2,
        radius: 100 + Math.random() * 10,
        speed: 0.005 + Math.random() * 0.003,
        size: Math.random() * 1.5 + 0.5,
        ring: Math.floor(Math.random() * 3),
      });
    }

    let animId;
    const draw = () => {
      frameRef.current++;
      const t = frameRef.current * 0.01;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + (mouse.current?.x || 0) * 15;
      const cy = h / 2 + (mouse.current?.y || 0) * 10;

      // Core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      coreGrad.addColorStop(0, "rgba(0,234,255,0.12)");
      coreGrad.addColorStop(0.5, "rgba(168,85,247,0.05)");
      coreGrad.addColorStop(1, "transparent");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      // Inner core sphere
      const innerGrad = ctx.createRadialGradient(cx - 10, cy - 15, 5, cx, cy, 45);
      innerGrad.addColorStop(0, "rgba(0,234,255,0.25)");
      innerGrad.addColorStop(0.6, "rgba(168,85,247,0.1)");
      innerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fill();

      // Core bright center
      const brightGrad = ctx.createRadialGradient(cx - 5, cy - 8, 0, cx, cy, 20);
      brightGrad.addColorStop(0, "rgba(255,255,255,0.15)");
      brightGrad.addColorStop(1, "transparent");
      ctx.fillStyle = brightGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fill();

      // "Eye" elements
      const eyeY = cy - 5;
      for (let side = -1; side <= 1; side += 2) {
        const ex = cx + side * 18;
        ctx.fillStyle = `rgba(0,234,255,${0.6 + Math.sin(t * 2) * 0.2})`;
        ctx.beginPath();
        ctx.arc(ex, eyeY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "#00eaff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Mouth line
      ctx.strokeStyle = `rgba(0,234,255,${0.3 + Math.sin(t * 3) * 0.1})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy + 12);
      ctx.lineTo(cx + 12, cy + 12);
      ctx.stroke();

      // Hexagonal wireframe
      ctx.strokeStyle = `rgba(0,234,255,${0.08 + Math.sin(t) * 0.03})`;
      ctx.lineWidth = 0.5;
      for (let r = 55; r <= 95; r += 20) {
        ctx.beginPath();
        for (let i = 0; i <= 6; i++) {
          const a = (i / 6) * Math.PI * 2 + t * 0.3;
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r * 0.85;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Floating particles
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle * 1.3) * p.radius * 0.6 + p.yOffset * Math.sin(t * 0.5);
        ctx.fillStyle = p.color.replace(")", `,${p.alpha * (0.5 + Math.sin(t + p.angle) * 0.3)})`).replace("rgb", "rgba").replace("#00eaff", "rgba(0,234,255").replace("#a855f7", "rgba(168,85,247").replace("#ff2d78", "rgba(255,45,120");

        // Simpler approach
        const alpha = p.alpha * (0.5 + Math.sin(t + p.angle) * 0.3);
        if (p.color === "#00eaff") ctx.fillStyle = `rgba(0,234,255,${alpha})`;
        else if (p.color === "#a855f7") ctx.fillStyle = `rgba(168,85,247,${alpha})`;
        else ctx.fillStyle = `rgba(255,45,120,${alpha})`;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Orbital rings
      const ringRadii = [110, 140, 170];
      const ringColors = ["rgba(0,234,255,", "rgba(168,85,247,", "rgba(255,45,120,"];
      rings.forEach(r => {
        r.angle += r.speed * (r.ring % 2 === 0 ? 1 : -1);
        const rad = ringRadii[r.ring];
        const tilt = [0.3, 0.6, 0.15][r.ring];
        const px = cx + Math.cos(r.angle) * rad;
        const py = cy + Math.sin(r.angle) * rad * tilt;
        ctx.fillStyle = `${ringColors[r.ring]}${0.15 + Math.sin(r.angle) * 0.1})`;
        ctx.beginPath();
        ctx.arc(px, py, r.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Orbital ring outlines
      ringRadii.forEach((rad, i) => {
        const tilt = [0.3, 0.6, 0.15][i];
        ctx.strokeStyle = `${ringColors[i]}0.04)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rad, rad * tilt, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Data stream lines (vertical)
      for (let i = 0; i < 5; i++) {
        const lx = cx + (i - 2) * 50;
        const ly1 = cy - 160 + Math.sin(t * 2 + i) * 20;
        const ly2 = ly1 + 40;
        ctx.strokeStyle = `rgba(0,234,255,${0.06 + Math.sin(t + i) * 0.03})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(lx, ly1);
        ctx.lineTo(lx, ly2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [mouse]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

/* ---------- Main Robot Component ---------- */
export default function HolographicRobot() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center" style={{ width: "100%", height: "100%", minHeight: 450 }}>
      {/* Outer glow */}
      <div className="absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,234,255,0.06) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Robot canvas */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 500, height: 500 }}
      >
        <RobotCanvas mouse={mouseRef} />
      </motion.div>

      {/* HUD data cards floating around */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute hud-corners" style={{ top: "12%", right: "2%", padding: "12px 18px", borderRadius: 10, background: "rgba(13,18,37,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,234,255,0.08)" }}>
        <p style={{ fontSize: "0.6rem", color: "rgba(0,234,255,0.6)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>NEURAL LOAD</p>
        <p style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#00eaff", marginTop: 2, textShadow: "0 0 10px rgba(0,234,255,0.3)" }}>94.2%</p>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute hud-corners" style={{ bottom: "15%", left: "0%", padding: "12px 18px", borderRadius: 10, background: "rgba(13,18,37,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(168,85,247,0.08)" }}>
        <p style={{ fontSize: "0.6rem", color: "rgba(168,85,247,0.7)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>TOKENS OPTIMIZED</p>
        <p style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#a855f7", marginTop: 2, textShadow: "0 0 10px rgba(168,85,247,0.3)" }}>2.4M+</p>
      </motion.div>

      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute" style={{ top: "60%", right: "5%", padding: "12px 18px", borderRadius: 10, background: "rgba(13,18,37,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,255,136,0.08)" }}>
        <p style={{ fontSize: "0.6rem", color: "rgba(0,255,136,0.6)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>COST SAVED</p>
        <p style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#00ff88", marginTop: 2, textShadow: "0 0 10px rgba(0,255,136,0.3)" }}>$18.4K</p>
      </motion.div>
    </div>
  );
}
