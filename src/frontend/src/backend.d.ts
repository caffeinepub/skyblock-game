import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WorldView {
    blocks: Array<Block>;
}
export interface PlayerView {
    principal: Principal;
    currentWorld: WorldView;
    inventory: InventoryView;
}
export interface Position {
    x: bigint;
    y: bigint;
    z: bigint;
}
export interface InventoryView {
    items: Array<[BlockType, bigint]>;
}
export interface Block {
    blockType: BlockType;
    texture: string;
    position: Position;
}
export enum BlockType {
    LOG = "LOG",
    STAIR = "STAIR",
    STONE = "STONE",
    GLASS = "GLASS",
    GRASS = "GRASS",
    COBBLESTONE = "COBBLESTONE",
    CLAY = "CLAY",
    COAL = "COAL",
    DIRT = "DIRT",
    BRICK = "BRICK",
    SAND = "SAND",
    SLAB = "SLAB",
    WOOD = "WOOD",
    LEAVES = "LEAVES",
    FENCE = "FENCE",
    BEDROCK = "BEDROCK",
    PLANKS = "PLANKS"
}
export interface backendInterface {
    findBlock(principal: Principal, position: Position): Promise<Block | null>;
    getInventory(principal: Principal): Promise<InventoryView>;
    getPlayer(principal: Principal): Promise<PlayerView>;
    getWorldBlocks(principal: Principal): Promise<WorldView | null>;
    updateBlock(principal: Principal, block: Block): Promise<Block>;
}
