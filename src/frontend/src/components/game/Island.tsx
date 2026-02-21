import { useRef, useMemo } from 'react';
import { InstancedMesh, Object3D, Color } from 'three';
import { useFrame } from '@react-three/fiber';
import { useWorldBlocks } from '../../hooks/useQueries';
import { BlockType, Block } from '../../backend';

const BLOCK_SIZE = 1;

// Block color mapping for vibrant playful aesthetic
const BLOCK_COLORS: Record<BlockType, string> = {
  [BlockType.GRASS]: '#7ED321',
  [BlockType.DIRT]: '#D0743C',
  [BlockType.STONE]: '#9B9B9B',
  [BlockType.WOOD]: '#8B4513',
  [BlockType.LOG]: '#654321',
  [BlockType.PLANKS]: '#DEB887',
  [BlockType.LEAVES]: '#50C878',
  [BlockType.SAND]: '#F4D03F',
  [BlockType.COBBLESTONE]: '#808080',
  [BlockType.GLASS]: '#E0F7FA',
  [BlockType.COAL]: '#2C3E50',
  [BlockType.CLAY]: '#CD853F',
  [BlockType.BRICK]: '#CB4154',
  [BlockType.SLAB]: '#A9A9A9',
  [BlockType.STAIR]: '#B8B8B8',
  [BlockType.FENCE]: '#8B7355',
  [BlockType.BEDROCK]: '#1C1C1C',
};

export default function Island() {
  const meshRef = useRef<InstancedMesh>(null);
  const { data: worldData, isLoading } = useWorldBlocks();

  const blocks = useMemo(() => {
    if (!worldData?.blocks) {
      // Default starting island if no data
      const defaultBlocks: Block[] = [];
      for (let x = -5; x <= 5; x++) {
        for (let z = -5; z <= 5; z++) {
          for (let y = 0; y <= 2; y++) {
            const blockType = y === 2 ? BlockType.GRASS : y === 1 ? BlockType.DIRT : BlockType.STONE;
            defaultBlocks.push({
              position: { x: BigInt(x), y: BigInt(y), z: BigInt(z) },
              blockType,
              texture: '',
            });
          }
        }
      }
      return defaultBlocks;
    }
    return worldData.blocks;
  }, [worldData]);

  // Update instanced mesh
  useFrame(() => {
    if (!meshRef.current) return;

    const tempObject = new Object3D();
    const tempColor = new Color();

    blocks.forEach((block, i) => {
      tempObject.position.set(
        Number(block.position.x) * BLOCK_SIZE,
        Number(block.position.y) * BLOCK_SIZE,
        Number(block.position.z) * BLOCK_SIZE
      );
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);

      const color = BLOCK_COLORS[block.blockType] || '#CCCCCC';
      tempColor.set(color);
      meshRef.current!.setColorAt(i, tempColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  if (isLoading) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, blocks.length]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[BLOCK_SIZE * 0.98, BLOCK_SIZE * 0.98, BLOCK_SIZE * 0.98]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}
