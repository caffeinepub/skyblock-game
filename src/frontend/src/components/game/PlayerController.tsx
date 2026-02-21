import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { BlockType } from '../../backend';

interface PlayerControllerProps {
  selectedBlockType: BlockType;
}

const MOVE_SPEED = 5;
const JUMP_FORCE = 8;
const GRAVITY = -20;

export default function PlayerController({ selectedBlockType }: PlayerControllerProps) {
  const { camera } = useThree();
  const velocity = useRef(new Vector3());
  const isGrounded = useRef(false);
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (e.key === ' ' && isGrounded.current) {
        velocity.current.y = JUMP_FORCE;
        isGrounded.current = false;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const direction = new Vector3();

    // Movement
    if (keys.current['w']) direction.z -= 1;
    if (keys.current['s']) direction.z += 1;
    if (keys.current['a']) direction.x -= 1;
    if (keys.current['d']) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize();
      direction.applyQuaternion(camera.quaternion);
      direction.y = 0;
      direction.normalize();

      camera.position.x += direction.x * MOVE_SPEED * delta;
      camera.position.z += direction.z * MOVE_SPEED * delta;
    }

    // Gravity
    velocity.current.y += GRAVITY * delta;
    camera.position.y += velocity.current.y * delta;

    // Ground collision (simple)
    if (camera.position.y <= 5) {
      camera.position.y = 5;
      velocity.current.y = 0;
      isGrounded.current = true;
    }

    // Prevent falling into void
    if (camera.position.y < -10) {
      camera.position.set(0, 10, 10);
      velocity.current.set(0, 0, 0);
    }
  });

  return null;
}
