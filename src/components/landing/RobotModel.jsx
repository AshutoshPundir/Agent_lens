import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Shared Materials ─── */
function GlossyBlack(props) {
  return (
    <meshPhysicalMaterial
      color="#0a0a0a"
      metalness={0.6}
      roughness={0.15}
      clearcoat={1}
      clearcoatRoughness={0.1}
      envMapIntensity={1.2}
      {...props}
    />
  );
}

function MatteBlack(props) {
  return (
    <meshStandardMaterial
      color="#1a1a1a"
      metalness={0.3}
      roughness={0.7}
      {...props}
    />
  );
}

/* ─── Blinking Eyes ─── */
function Face({ time }) {
  const blinkRef = useRef(false);
  const blinkTimer = useRef(0);

  // Blink logic
  blinkTimer.current += 0.016;
  if (blinkTimer.current > 3 + Math.random() * 2) {
    blinkRef.current = true;
    blinkTimer.current = 0;
  }
  if (blinkRef.current && blinkTimer.current > 0.15) {
    blinkRef.current = false;
  }

  const eyeScaleY = blinkRef.current ? 0.1 : 1;
  const mouthCurve = 0.8 + Math.sin(time * 0.5) * 0.1;

  return (
    <group position={[0, 0.02, 0.76]}>
      {/* Left eye */}
      <mesh position={[-0.18, 0.08, 0]} scale={[1, eyeScaleY, 1]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#00eaff"
          emissive="#00eaff"
          emissiveIntensity={2.5 + Math.sin(time * 2) * 0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Right eye */}
      <mesh position={[0.18, 0.08, 0]} scale={[1, eyeScaleY, 1]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#00eaff"
          emissive="#00eaff"
          emissiveIntensity={2.5 + Math.sin(time * 2) * 0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Smile - curved line using torus */}
      <mesh position={[0, -0.12, 0.02]} rotation={[Math.PI + 0.3, 0, 0]} scale={[mouthCurve, mouthCurve, 1]}>
        <torusGeometry args={[0.1, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial
          color="#00eaff"
          emissive="#00eaff"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Ear Panels ─── */
function EarPanel({ side }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.material.emissiveIntensity = 1.2 + Math.sin(t * 1.5 + (side === "left" ? 0 : Math.PI)) * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={[side === "left" ? -0.72 : 0.72, 0.05, 0]}>
      <cylinderGeometry args={[0.15, 0.15, 0.08, 24]} />
      <meshStandardMaterial
        color="#ff6b35"
        emissive="#ff6b35"
        emissiveIntensity={1.2}
        metalness={0.4}
        roughness={0.3}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ─── Chest Core ─── */
function ChestCore() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.6;
      ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    }
  });

  return (
    <group position={[0, -0.85, 0.35]}>
      {/* Outer ring */}
      <mesh ref={ref}>
        <torusGeometry args={[0.15, 0.025, 16, 32]} />
        <meshStandardMaterial
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#00eaff"
          emissive="#00eaff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Floating Arm ─── */
function Arm({ side }) {
  const ref = useRef();
  const s = side === "left" ? -1 : 1;

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.z = s * (0.3 + Math.sin(t * 0.8 + s) * 0.08);
      ref.current.position.y = -0.7 + Math.sin(t * 0.6 + s * 2) * 0.03;
    }
  });

  return (
    <group ref={ref} position={[s * 0.55, -0.7, 0]}>
      {/* Upper arm */}
      <mesh position={[s * 0.15, 0, 0]}>
        <capsuleGeometry args={[0.06, 0.25, 8, 16]} />
        <GlossyBlack />
      </mesh>

      {/* Joint */}
      <mesh position={[s * 0.15, -0.22, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>

      {/* Forearm */}
      <mesh position={[s * 0.15, -0.42, 0]}>
        <capsuleGeometry args={[0.05, 0.2, 8, 16]} />
        <GlossyBlack />
      </mesh>

      {/* Hand */}
      <mesh position={[s * 0.15, -0.6, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <MatteBlack />
      </mesh>
    </group>
  );
}

/* ─── Floating Particles ─── */
function FloatingParticles({ count = 40 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 4;
      pos[i + 1] = (Math.random() - 0.5) * 4;
      pos[i + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const arr = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count * 3; i += 3) {
        arr[i + 1] += Math.sin(t + i) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00eaff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ─── Main Robot ─── */
export default function RobotModel({ mouse }) {
  const groupRef = useRef();
  const headRef = useRef();
  const timeRef = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    timeRef.current = t;

    if (groupRef.current) {
      // Floating idle
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.08 + 0.3;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }

    if (headRef.current && mouse) {
      // Head follows mouse with smooth lerp
      const targetX = (mouse.y || 0) * -0.15;
      const targetY = (mouse.x || 0) * 0.2;
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.04);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.04);
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Head */}
      <group ref={headRef} position={[0, 0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.75, 48, 48]} />
          <meshPhysicalMaterial
            color="#080808"
            metalness={0.7}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.5}
            reflectivity={1}
          />
        </mesh>

        {/* Glass visor overlay */}
        <mesh scale={1.01}>
          <sphereGeometry args={[0.75, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshPhysicalMaterial
            color="#0a0f1a"
            transparent
            opacity={0.3}
            metalness={0.9}
            roughness={0.05}
            clearcoat={1}
          />
        </mesh>

        <Face time={timeRef.current} />

        {/* Antenna nub */}
        <mesh position={[0, 0.78, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#00eaff" emissive="#00eaff" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
          <MatteBlack />
        </mesh>

        <EarPanel side="left" />
        <EarPanel side="right" />
      </group>

      {/* Neck */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.15, 16]} />
        <MatteBlack />
      </mesh>

      {/* Body */}
      <mesh position={[0, -0.85, 0]}>
        <capsuleGeometry args={[0.35, 0.4, 16, 32]} />
        <meshPhysicalMaterial
          color="#0d0d0d"
          metalness={0.5}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          envMapIntensity={1}
        />
      </mesh>

      {/* Body accent lines */}
      <mesh position={[0, -0.65, 0.36]}>
        <boxGeometry args={[0.5, 0.01, 0.01]} />
        <meshStandardMaterial color="#00eaff" emissive="#00eaff" emissiveIntensity={1} toneMapped={false} />
      </mesh>

      <ChestCore />
      <Arm side="left" />
      <Arm side="right" />
      <FloatingParticles />
    </group>
  );
}
