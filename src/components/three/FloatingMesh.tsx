"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A single large icosahedron wireframe — orbits slowly.
 * Gives the hero a "data structure / system" feel.
 */
export default function FloatingMesh() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const clock = useRef(new THREE.Clock());

  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x00ffc2,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      }),
    [],
  );

  const innerMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      }),
    [],
  );

  useFrame(() => {
    const t = clock.current.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.07;
      outerRef.current.rotation.y = t * 0.09;
      outerRef.current.rotation.z = t * 0.04;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.05;
      innerRef.current.rotation.y = -t * 0.11;
    }
  });

  return (
    <group position={[3.5, 0, -3]}>
      {/* Outer sphere */}
      <mesh ref={outerRef} material={wireMat}>
        <icosahedronGeometry args={[3.2, 2]} />
      </mesh>

      {/* Inner spinning octahedron */}
      <mesh ref={innerRef} material={innerMat}>
        <octahedronGeometry args={[1.6, 0]} />
      </mesh>
    </group>
  );
}
