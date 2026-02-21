import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInventory } from '../../hooks/useQueries';
import { BlockType } from '../../backend';

interface InventoryProps {
  onClose: () => void;
  selectedBlockType: BlockType;
  onSelectBlock: (blockType: BlockType) => void;
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

export default function Inventory({ onClose, selectedBlockType, onSelectBlock }: InventoryProps) {
  const { data: inventory, isLoading } = useInventory();

  return (
    <div className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
      <div className="rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-1 shadow-2xl">
        <div className="rounded-3xl bg-white p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-black text-gray-800">Inventory</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Inventory Grid */}
          <ScrollArea className="h-96">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent mx-auto"></div>
                  <p className="text-gray-600 font-semibold">Loading inventory...</p>
                </div>
              </div>
            ) : inventory?.items && inventory.items.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {inventory.items.map(([blockType, quantity]) => (
                  <button
                    key={blockType}
                    onClick={() => onSelectBlock(blockType)}
                    className={`group relative rounded-2xl p-4 transition-all hover:scale-105 ${
                      selectedBlockType === blockType
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="mb-2 text-4xl">{BLOCK_ICONS[blockType]}</div>
                      <p className={`text-xs font-bold ${selectedBlockType === blockType ? 'text-white' : 'text-gray-700'}`}>
                        {blockType}
                      </p>
                      <p className={`text-lg font-black ${selectedBlockType === blockType ? 'text-white' : 'text-gray-900'}`}>
                        {quantity.toString()}
                      </p>
                    </div>
                    {selectedBlockType === blockType && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <span className="text-green-500 font-black">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="mb-4 text-6xl">📦</div>
                  <p className="text-xl font-bold text-gray-600">Your inventory is empty</p>
                  <p className="text-sm text-gray-500 mt-2">Break blocks to collect resources!</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
