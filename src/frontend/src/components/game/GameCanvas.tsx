import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls } from '@react-three/drei';
import Island from './Island';
import PlayerController from './PlayerController';
import { BlockType } from '../../backend';
import { Suspense } from 'react';

interface GameCanvasProps {
  selectedBlockType: BlockType;
}

export default function GameCanvas({ selectedBlockType }: GameCanvasProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 10], fov: 75 }}
      className="h-full w-full"
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.6}
        azimuth={0.25}
      />

      {/* Game World */}
      <Suspense fallback={null}>
        <Island />
        <PlayerController selectedBlockType={selectedBlockType} />
      </Suspense>

      {/* Controls */}
      <PointerLockControls />
    </Canvas>
  );
}
