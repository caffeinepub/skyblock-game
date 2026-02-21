import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type Player = {
    principal : Principal;
    currentWorld : World;
    inventory : Inventory;
  };

  type PlayerView = {
    principal : Principal;
    currentWorld : WorldView;
    inventory : InventoryView;
  };

  module Position {
    public type Position = {
      x : Int;
      y : Int;
      z : Int;
    };

    public func compare(position1 : Position, position2 : Position) : Order.Order {
      if (position1.x < position2.x) { return #less };
      if (position1.x > position2.x) { return #greater };

      if (position1.y < position2.y) { return #less };
      if (position1.y > position2.y) { return #greater };

      if (position1.z < position2.z) { return #less };
      if (position1.z > position2.z) { return #greater };

      #equal;
    };
  };

  type BlockType = {
    #DIRT;
    #STONE;
    #WOOD;
    #GRASS;
    #LEAVES;
    #GLASS;
    #COAL;
    #COBBLESTONE;
    #SAND;
    #CLAY;
    #BRICK;
    #LOG;
    #PLANKS;
    #SLAB;
    #STAIR;
    #FENCE;
    #BEDROCK;
  };

  type Tool = {
    #Sword;
    #Axe;
    #Pickaxe;
    #Shovel;
    #Bow;
    #FishingRod;
    #Shears;
    #AllBlocks;
  };

  type DisplayType = {
    #Window;
    #Door;
    #Other;
  };

  type Block = {
    position : Position.Position;
    blockType : BlockType;
    texture : Text;
  };

  module Block {
    public func compare(block1 : Block, block2 : Block) : Order.Order {
      switch (Position.compare(block1.position, block2.position)) {
        case (#equal) { Text.compare(block1.texture, block2.texture) };
        case (order) { order };
      };
    };

    public func compareByTexture(block1 : Block, block2 : Block) : Order.Order {
      Text.compare(block1.texture, block2.texture);
    };
  };

  type World = {
    blocks : List.List<Block>;
  };

  type WorldView = {
    blocks : [Block];
  };

  type Inventory = {
    items : List.List<(BlockType, Nat)>;
  };

  type InventoryView = {
    items : [(BlockType, Nat)];
  };

  module Inventory {
    public func addItem(inventory : Inventory, blockType : BlockType, quantity : Nat) {
      if (quantity == 0) { return };

      let items = inventory.items;
      let index = items.toArray().findIndex(func(item) { item.0 == blockType });

      switch (index) {
        case (?i) {
          let itemArray = items.toArray();
          let (block, oldQuantity) = itemArray[i];
          let newQuantity = oldQuantity + quantity;

          let updatedArray = Array.tabulate(
            itemArray.size(),
            func(j) {
              if (j == i) { (block, newQuantity) } else { itemArray[j] };
            },
          );

          items.clear();
          items.addAll(updatedArray.values());
        };
        case (null) {
          items.add((blockType, quantity));
        };
      };
    };
  };

  let players = Map.empty<Principal, Player>();

  public shared ({ caller }) func getPlayer(principal : Principal) : async PlayerView {
    switch (players.get(principal)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?player) { toPlayerView(player) };
    };
  };

  func toPlayerView(player : Player) : PlayerView {
    {
      principal = player.principal;
      currentWorld = toWorldView(player.currentWorld);
      inventory = toInventoryView(player.inventory);
    };
  };

  func toWorldView(world : World) : WorldView {
    { blocks = world.blocks.toArray() };
  };

  func toInventoryView(inventory : Inventory) : InventoryView {
    { items = inventory.items.toArray() };
  };

  public query ({ caller }) func getInventory(principal : Principal) : async InventoryView {
    switch (players.get(principal)) {
      case (?player) { toInventoryView(player.inventory) };
      case (null) { Runtime.trap("You do not have an inventory yet. Try creating a world!") };
    };
  };

  public query ({ caller }) func findBlock(principal : Principal, position : Position.Position) : async ?Block {
    switch (players.get(principal)) {
      case (?player) {
        let blocks = player.currentWorld.blocks;
        let blockArray = blocks.toArray();
        blockArray.find(
          func(block) {
            block.position.x == position.x and block.position.y == position.y and block.position.z == position.z;
          }
        );
      };
      case (null) { null };
    };
  };

  public query ({ caller }) func getWorldBlocks(principal : Principal) : async ?WorldView {
    switch (players.get(principal)) {
      case (?player) { ?toWorldView(player.currentWorld) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func updateBlock(principal : Principal, block : Block) : async Block {
    let blockIndex = switch (players.get(principal)) {
      case (?player) {
        let blocks = player.currentWorld.blocks;
        let blockArray = blocks.toArray();
        blockArray.findIndex(
          func(existingBlock) {
            existingBlock.position.x == block.position.x and existingBlock.position.z == block.position.z and block.position.y == block.position.y;
          }
        );
      };
      case (null) { null };
    };

    switch (blockIndex) {
      case (?_) {
        Runtime.trap("Block already exists at coordinates: " # debug_show (block.position));
      };
      case (null) {
        block;
      };
    };
  };
};
