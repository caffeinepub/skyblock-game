import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { BlockType } from '../../backend';

interface CraftingMenuProps {
  onClose: () => void;
}

interface Recipe {
  id: string;
  name: string;
  icon: string;
  inputs: { type: BlockType; count: number }[];
  output: { type: BlockType; count: number };
  description: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'planks',
    name: 'Wooden Planks',
    icon: '🟫',
    inputs: [{ type: BlockType.LOG, count: 1 }],
    output: { type: BlockType.PLANKS, count: 4 },
    description: 'Convert logs into planks',
  },
  {
    id: 'sticks',
    name: 'Sticks',
    icon: '🪵',
    inputs: [{ type: BlockType.PLANKS, count: 2 }],
    output: { type: BlockType.WOOD, count: 4 },
    description: 'Craft sticks from planks',
  },
  {
    id: 'cobblestone',
    name: 'Cobblestone',
    icon: '⬛',
    inputs: [{ type: BlockType.STONE, count: 1 }],
    output: { type: BlockType.COBBLESTONE, count: 1 },
    description: 'Process stone into cobblestone',
  },
];

export default function CraftingMenu({ onClose }: CraftingMenuProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleCraft = () => {
    if (!selectedRecipe) return;
    // TODO: Implement crafting logic with backend
    console.log('Crafting:', selectedRecipe.name);
  };

  return (
    <div className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl">
      <div className="rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 p-1 shadow-2xl">
        <div className="rounded-3xl bg-white p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-500" />
              <h2 className="text-3xl font-black text-gray-800">Crafting</h2>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Recipe List */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-700">Available Recipes</h3>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {RECIPES.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => setSelectedRecipe(recipe)}
                      className={`w-full rounded-2xl p-4 text-left transition-all hover:scale-105 ${
                        selectedRecipe?.id === recipe.id
                          ? 'bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{recipe.icon}</div>
                        <div className="flex-1">
                          <p className={`font-bold ${selectedRecipe?.id === recipe.id ? 'text-white' : 'text-gray-800'}`}>
                            {recipe.name}
                          </p>
                          <p className={`text-xs ${selectedRecipe?.id === recipe.id ? 'text-white/80' : 'text-gray-600'}`}>
                            {recipe.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Recipe Details */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-700">Recipe Details</h3>
              {selectedRecipe ? (
                <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <div className="mb-6 text-center">
                    <div className="mb-3 text-6xl">{selectedRecipe.icon}</div>
                    <h4 className="text-2xl font-black text-gray-800">{selectedRecipe.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedRecipe.description}</p>
                  </div>

                  <div className="mb-6">
                    <p className="mb-3 text-sm font-bold text-gray-700">Required Materials:</p>
                    <div className="space-y-2">
                      {selectedRecipe.inputs.map((input, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3">
                          <span className="font-semibold text-gray-800">{input.type}</span>
                          <span className="font-black text-gray-900">×{input.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="mb-3 text-sm font-bold text-gray-700">Result:</p>
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 p-3">
                      <span className="font-semibold text-white">{selectedRecipe.output.type}</span>
                      <span className="font-black text-white">×{selectedRecipe.output.count}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCraft}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-lg font-black text-white shadow-lg hover:scale-105 transition-transform"
                  >
                    Craft Now
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">✨</div>
                    <p className="text-lg font-bold text-gray-600">Select a recipe</p>
                    <p className="text-sm text-gray-500 mt-2">Choose from the list to see details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
