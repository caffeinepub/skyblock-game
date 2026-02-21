import { useState } from 'react';
import GameCanvas from '../game/GameCanvas';
import GameHUD from './GameHUD';
import Inventory from './Inventory';
import CraftingMenu from './CraftingMenu';
import { BlockType } from '../../backend';

export default function GameLayout() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCraftingOpen, setIsCraftingOpen] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>(BlockType.DIRT);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 3D Game Canvas */}
      <GameCanvas selectedBlockType={selectedBlockType} />

      {/* Game HUD Overlay */}
      <GameHUD
        onToggleInventory={() => setIsInventoryOpen(!isInventoryOpen)}
        onToggleCrafting={() => setIsCraftingOpen(!isCraftingOpen)}
        selectedBlockType={selectedBlockType}
      />

      {/* Inventory Panel */}
      {isInventoryOpen && (
        <Inventory
          onClose={() => setIsInventoryOpen(false)}
          selectedBlockType={selectedBlockType}
          onSelectBlock={setSelectedBlockType}
        />
      )}

      {/* Crafting Menu */}
      {isCraftingOpen && (
        <CraftingMenu onClose={() => setIsCraftingOpen(false)} />
      )}
    </div>
  );
}
