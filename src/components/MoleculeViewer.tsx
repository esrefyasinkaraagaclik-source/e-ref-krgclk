import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface AtomProps {
  position: [number, number, number];
  element: string;
}

interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
}

const elementColors: Record<string, string> = {
  'H': '#ffffff', // White
  'C': '#222222', // Black/Dark Grey
  'O': '#ff0000', // Red
  'N': '#0000ff', // Blue
  'Cl': '#00ff00', // Green
  'He': '#d9ffff', // Light Cyan
  'Na': '#8855ff', // Purple-ish
};

const elementSizes: Record<string, number> = {
  'H': 0.3,
  'C': 0.5,
  'O': 0.45,
  'N': 0.45,
  'Cl': 0.6,
  'He': 0.35,
  'Na': 0.65,
};

function Atom({ position, element }: AtomProps) {
  const color = elementColors[element] || '#cccccc';
  const size = elementSizes[element] || 0.4;
  const textColor = (element === 'H' || element === 'C' || element === 'He') ? '#000000' : '#ffffff';
  const outlineColor = (element === 'H' || element === 'C' || element === 'He') ? '#ffffff' : '#000000';

  return (
    <group position={position}>
      <Sphere args={[size, 32, 32]}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </Sphere>
      <Billboard>
        <Text
          position={[0, 0, size + 0.05]}
          fontSize={size * 0.8}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor={outlineColor}
        >
          {element}
        </Text>
      </Billboard>
    </group>
  );
}

function Bond({ start, end }: BondProps) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const distance = startVec.distanceTo(endVec);
  const position = startVec.clone().lerp(endVec, 0.5);
  
  // Calculate rotation to point from start to end
  const quaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const direction = endVec.clone().sub(startVec).normalize();
  quaternion.setFromUnitVectors(up, direction);

  return (
    <Cylinder args={[0.1, 0.1, distance, 16]} position={position} quaternion={quaternion}>
      <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.5} />
    </Cylinder>
  );
}

function RotatingGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

interface MoleculeViewerProps {
  model: {
    name: string;
    formula: string;
    atoms: { element: string; position: [number, number, number] }[];
    bonds: { start: [number, number, number]; end: [number, number, number] }[];
  };
  disableInteraction?: boolean;
  hideLabels?: boolean;
  className?: string;
}

export function MoleculeViewer({ model, disableInteraction = false, hideLabels = false, className }: MoleculeViewerProps) {
  const containerClass = className || "w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800";
  
  return (
    <div className={containerClass}>
      {!hideLabels && (
        <>
          <div className="absolute top-4 left-4 z-10 bg-slate-950/80 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
            <h3 className="text-white font-bold">{model.name}</h3>
            <p className="text-cyan-400 text-sm font-mono">{model.formula}</p>
          </div>
          <div className="absolute bottom-4 right-4 z-10 text-xs text-slate-500">
            Döndürmek için sürükle, yakınlaştırmak için kaydır
          </div>
        </>
      )}
      <div className={`w-full h-full ${disableInteraction ? 'pointer-events-none' : ''}`}>
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <RotatingGroup>
            {model.atoms.map((atom, i) => (
              <Atom key={`atom-${i}`} position={atom.position} element={atom.element} />
            ))}
            {model.bonds.map((bond, i) => (
              <Bond key={`bond-${i}`} start={bond.start} end={bond.end} />
            ))}
          </RotatingGroup>
          
          {!disableInteraction && <OrbitControls enablePan={false} />}
        </Canvas>
      </div>
    </div>
  );
}
