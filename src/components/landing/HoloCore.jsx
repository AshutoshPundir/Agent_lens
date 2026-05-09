import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Holographic AI Core ─── 
   NO custom shaders. NO transparency overlap.
   Uses only solid built-in materials = zero flicker.
*/

/* Solid glowing core sphere */
function CoreSphere({ mouse }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      // Smooth mouse tracking
      const targetX = mouse.y * -0.08;
      const targetZ = mouse.x * 0.08;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.01;
      groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.01;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer glass sphere */}
      <mesh>
        <sphereGeometry args={[0.65, 48, 48]} />
        <meshPhysicalMaterial
          color="#0a1628"
          metalness={0.9}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2.0}
          transparent={false}
        />
      </mesh>

      {/* Inner glowing core — emissive, no transparency */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00eaff"
          emissive="#00eaff"
          emissiveIntensity={2}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Equatorial glow ring — solid, not transparent */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#00eaff"
          emissive="#00eaff"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

/* Orbiting ring — solid meshBasicMaterial, no transparency */
function OrbitalRing({ radius, speed, tilt, color, thickness = 0.005 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = tilt;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 8, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

/* Small orbiting dot — solid */
function OrbitalDot({ radius, speed, tilt, color }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      const angle = t * speed;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.y = Math.sin(angle) * radius * Math.cos(tilt);
      ref.current.position.z = Math.sin(angle) * radius * Math.sin(tilt);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

/* ─── Main Export ─── */
export default function HoloCore({ mouse }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = 0.15 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={0.85}>
      <CoreSphere mouse={mouse} />

      {/* Orbital rings */}
      <OrbitalRing radius={1.0} speed={0.25} tilt={0.3} color="#00eaff" thickness={0.004} />
      <OrbitalRing radius={1.15} speed={-0.18} tilt={-0.8} color="#a855f7" thickness={0.003} />
      <OrbitalRing radius={1.3} speed={0.1} tilt={1.2} color="#3b82f6" thickness={0.003} />

      {/* Orbiting dots */}
      <OrbitalDot radius={1.0} speed={0.25} tilt={0.3} color="#00eaff" />
      <OrbitalDot radius={1.15} speed={-0.18} tilt={-0.8} color="#a855f7" />
    </group>
  );
}
