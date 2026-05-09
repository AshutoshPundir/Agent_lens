import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion } from "framer-motion";
import RobotModel from "./RobotModel";

function Scene({ mouse }) {
  return (
    <>
      {/* Volumetric Fog matching website background */}
      <fog attach="fog" args={["#020817", 4, 12]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} color="#0a1128" />
      <directionalLight position={[3, 4, 5]} intensity={0.8} color="#00eaff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 2, 3]} intensity={0.6} color="#00eaff" distance={10} decay={2} />
      <pointLight position={[-2, -1, 2]} intensity={0.4} color="#ff2d78" distance={8} decay={2} />

      {/* Holographic Dust Particles */}
      <Sparkles count={150} scale={14} size={2} speed={0.4} opacity={0.15} color="#00eaff" />
      <Sparkles count={100} scale={14} size={1.5} speed={0.3} opacity={0.1} color="#a855f7" />

      {/* Robot offset to the right side of the wide screen */}
      <group position={[1.6, 0, 0]}>
        <RobotModel mouse={mouse} />
        
        {/* Ground shadow beneath the robot */}
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.35}
          scale={5}
          blur={2.5}
          far={4}
          color="#00eaff"
        />
      </group>

      {/* Environment for reflections */}
      <Environment preset="night" environmentIntensity={0.5} />

      {/* Post-processing */}
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0.7}
          luminanceSmoothing={0.6}
          intensity={1.2}
          mipmapBlur
        />
        <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <ChromaticAberration offset={[0.0015, 0.0015]} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
}

export default function RobotScene() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>

      {/* HUD data overlay cards - Positioned absolutely relative to the screen */}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute hud-corners hidden lg:block" style={{ top: "25%", right: "8%", padding: "10px 14px", borderRadius: 9, background: "rgba(13,18,37,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,234,255,0.08)", pointerEvents: "none", zIndex: 2, maxWidth: 120 }}>
        <p style={{ fontSize: "0.52rem", color: "rgba(0,234,255,0.6)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>NEURAL LOAD</p>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#00eaff", marginTop: 2, textShadow: "0 0 10px rgba(0,234,255,0.3)" }}>94.2%</p>
      </motion.div>

      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute hud-corners hidden lg:block" style={{ bottom: "25%", right: "32%", padding: "10px 14px", borderRadius: 9, background: "rgba(13,18,37,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(168,85,247,0.08)", pointerEvents: "none", zIndex: 2, maxWidth: 120 }}>
        <p style={{ fontSize: "0.52rem", color: "rgba(168,85,247,0.7)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>TOKENS</p>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#a855f7", marginTop: 2, textShadow: "0 0 10px rgba(168,85,247,0.3)" }}>2.4M+</p>
      </motion.div>

      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute hidden lg:block" style={{ bottom: "15%", right: "12%", padding: "10px 14px", borderRadius: 9, background: "rgba(13,18,37,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,255,136,0.08)", pointerEvents: "none", zIndex: 2, maxWidth: 120 }}>
        <p style={{ fontSize: "0.52rem", color: "rgba(0,255,136,0.6)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>SAVED</p>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#00ff88", marginTop: 2, textShadow: "0 0 10px rgba(0,255,136,0.3)" }}>$18.4K</p>
      </motion.div>
    </div>
  );
}
