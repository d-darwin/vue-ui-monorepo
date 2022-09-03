import { POSITION_HORIZONTAL, POSITION_VERTICAL, POSITION } from "./constant";

export type PositionHorizontal =
  typeof POSITION_HORIZONTAL[keyof typeof POSITION_HORIZONTAL];

export type PositionVertical =
  typeof POSITION_VERTICAL[keyof typeof POSITION_VERTICAL];

export type Position = typeof POSITION[keyof typeof POSITION];