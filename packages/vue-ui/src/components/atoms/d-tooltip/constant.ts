import config from "./config";

export const POSITION_HORIZONTAL = {
  RIGHT: "right",
  LEFT: "left",
} as const;

export const POSITION_VERTICAL = {
  TOP: "top",
  BOTTOM: "bottom",
} as const;

export const POSITION = {
  TOP: POSITION_VERTICAL.TOP,
  TOP_RIGHT: `${POSITION_VERTICAL.TOP}${config.positionSeparator}${POSITION_HORIZONTAL.RIGHT}`,
  RIGHT: POSITION_HORIZONTAL.RIGHT,
  BOTTOM_RIGHT: `${POSITION_VERTICAL.BOTTOM}${config.positionSeparator}${POSITION_HORIZONTAL.RIGHT}`,
  BOTTOM: POSITION_VERTICAL.BOTTOM,
  BOTTOM_LEFT: `${POSITION_VERTICAL.BOTTOM}${config.positionSeparator}${POSITION_HORIZONTAL.LEFT}`,
  LEFT: POSITION_HORIZONTAL.LEFT,
  TOP_LEFT: `${POSITION_VERTICAL.TOP}${config.positionSeparator}${POSITION_HORIZONTAL.LEFT}`,
} as const;
