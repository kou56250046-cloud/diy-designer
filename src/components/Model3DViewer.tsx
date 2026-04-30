"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Environment } from "@react-three/drei";
import type { Model3D, Part } from "@/types/design";
import * as THREE from "three";

interface PartMeshProps {
  position: [number, number, number];
  rotation: [number, number, number];
  dimensions: [number, number, number];
  color: string;
  highlighted: boolean;
}

function PartMesh({ position, rotation, dimensions, color, highlighted }: PartMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && highlighted) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      rotation={rotation}
      args={dimensions}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.85}
        roughness={0.4}
        metalness={0.1}
        wireframe={false}
      />
    </Box>
  );
}

interface Props {
  model: Model3D;
  parts: Part[];
  highlightPartIds?: string[];
}

export default function Model3DViewer({ model, parts, highlightPartIds = [] }: Props) {
  const partsMap = Object.fromEntries(parts.map((p) => [p.id, p]));

  return (
    <div className="bg-gray-950 rounded-2xl overflow-hidden" style={{ height: 280 }}>
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
          <Environment preset="studio" />

          {model.parts.map((mp, i) => (
            <PartMesh
              key={`${mp.partId}-${i}`}
              position={mp.position}
              rotation={mp.rotation}
              dimensions={mp.dimensions}
              color={mp.color}
              highlighted={highlightPartIds.includes(mp.partId)}
            />
          ))}

          <OrbitControls
            enableZoom
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            minDistance={2}
            maxDistance={12}
          />
        </Suspense>
      </Canvas>
      <p className="text-center text-xs text-gray-500 py-1.5">
        ドラッグで回転 / ピンチでズーム
      </p>
    </div>
  );
}
