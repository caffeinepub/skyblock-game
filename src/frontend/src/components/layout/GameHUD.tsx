import { Package, Hammer, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlockType } from '../../backend';

interface GameHUDProps {
  onToggleInventory: () => void;
  onToggleCrafting: () => void;
  selectedBlockType: BlockType;
}

const BLOCK_ICONS: Record<BlockType, string> = {
  [BlockType.GRASS]: '🟩',
  [BlockType.DIRT]: '🟫',
  [BlockType.STONE]: '⬜',
  [BlockType.WOOD]: '🪵',
  [BlockType.LOG]: '🪵',
  [BlockType.PLANKS]: '🟫',
  [BlockType.LEAVES]: '🍃',
  [BlockType.SAND]: '🟨',
  [BlockType.COBBLESTONE]: '⬛',
  [BlockType.GLASS]: '💎',
  [BlockType.COAL]: '⚫',
  [BlockType.CLAY]: '🟧',
  [BlockType.BRICK]: '🧱',
  [BlockType.SLAB]: '▬',
  [BlockType.STAIR]: '📐',
  [BlockType.FENCE]: '🚧',
  [BlockType.BEDROCK]: '⬛',
};

export default function GameHUD({ onToggleInventory, onToggleCrafting, selectedBlockType }: GameHUDProps) {
  return (
    <>
      {/* Top HUD */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between">
          {/* Health/Status */}
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 shadow-2xl">
            <Heart className="h-6 w-6 fill-white text-white" />
            <span className="text-xl font-black text-white">100</span>
          </div>

          {/* Selected Block */}
          <div className="pointer-events-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{BLOCK_ICONS[selectedBlockType]}</span>
              <span className="text-lg font-black text-white">{selectedBlockType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          {/* Action Buttons */}
          <div className="pointer-events-auto flex gap-3">
            <Button
              onClick={onToggleInventory}
              size="lg"
              className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-2xl hover:scale-110 transition-transform"
            >
              <Package className="h-8 w-8 text-white" />
            </Button>
            <Button
              onClick={onToggleCrafting}
              size="lg"
              className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-2xl hover:scale-110 transition-transform"
            >
              <Hammer className="h-8 w-8 text-white" />
            </Button>
          </div>

          {/* Controls Help */}
          <div className="pointer-events-auto rounded-2xl bg-black/50 backdrop-blur-sm px-6 py-3 shadow-xl">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm font-bold text-white">
              <span>WASD</span>
              <span>Move</span>
              <span>SPACE</span>
              <span>Jump</span>
              <span>CLICK</span>
              <span>Lock View</span>
              <span>ESC</span>
              <span>Unlock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crosshair */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-8 w-8">
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-white shadow-lg"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-white shadow-lg"></div>
        </div>
      </div>
    </>
  );
}
