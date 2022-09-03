import type { Position, PositionHorizontal, PositionVertical } from "./types";
import { POSITION_HORIZONTAL, POSITION_VERTICAL } from "./constant";
import config from "./config";

/**
 * Return parsed position
 * @param position - position string (e.g. "top-right")
 * @return {{horizontal: string | null, vertical: string | null}}
 */
export function parsePosition(position: Position): {
  horizontal: PositionHorizontal | null;
  vertical: PositionVertical | null;
} {
  const splitPosition = position && position.split(config.positionSeparator);

  // if position is hybrid, left/right should be the second
  const possibleHorizontalPosition = (splitPosition[1] ||
    splitPosition[0]) as PositionHorizontal;
  const horizontal = [
    POSITION_HORIZONTAL.LEFT,
    POSITION_HORIZONTAL.RIGHT,
  ].includes(possibleHorizontalPosition)
    ? possibleHorizontalPosition
    : null;

  // if position is hybrid, top/bottom should be the first
  const possibleVerticalPosition = (splitPosition[0] ||
    splitPosition[1]) as PositionVertical;
  const vertical = [POSITION_VERTICAL.TOP, POSITION_VERTICAL.BOTTOM].includes(
    possibleVerticalPosition
  )
    ? possibleVerticalPosition
    : null;

  return { horizontal, vertical };
}
