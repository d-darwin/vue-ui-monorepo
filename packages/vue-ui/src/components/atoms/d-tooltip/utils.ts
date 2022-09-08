import getElementBoxModel from "@darwin-studio/vue-ui/src/utils/get-element-box-model";
import type { Position, PositionHorizontal, PositionVertical } from "./types";
import {
  POSITION_HORIZONTAL,
  POSITION_OPPOSITE,
  POSITION_VERTICAL,
} from "./constant";
import config from "./config";
import { Ref } from "vue";
import { PositionStrict } from "./types";

/**
 * Return parsed position
 * @param position - position string (e.g. "top-right")
 * @return {{horizontal: string | null, vertical: string | null}}
 */
export function parsePosition(position: Position): {
  //TODO: refactor
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

/**
 * Adjust position of the tooltip component if there is no space for default (user defined) position
 *
 * @param elementContainer
 * @param element
 * @param windowWidth
 * @param windowHeight
 * @param defaultHorizontalPosition
 * @param defaultVerticalPosition
 * @returns {{vertical: number, horizontal: number}}
 */
export function getAdjustedPosition(
  elementContainer: Ref<HTMLElement | null>,
  element: Ref<HTMLElement | null>,
  windowWidth: Ref<number>,
  windowHeight: Ref<number>,
  defaultHorizontalPosition: PositionHorizontal | null,
  defaultVerticalPosition: PositionVertical | null
): {
  horizontal: PositionHorizontal | null;
  vertical: PositionVertical | null;
} {
  //TODO: refactor
  const adjustedPosition: {
    horizontal: PositionHorizontal | null;
    vertical: PositionVertical | null;
  } = {
    horizontal: null,
    vertical: null,
  };

  const elementContainerClientRect =
    elementContainer.value && elementContainer.value.getBoundingClientRect();

  if (elementContainerClientRect) {
    // hold how many space there is around the container
    const elementContainerClientSpace = {
      top: elementContainerClientRect.top,
      right: windowWidth.value - elementContainerClientRect.right,
      bottom: windowHeight.value - elementContainerClientRect.bottom,
      left: elementContainerClientRect.left,
    };

    // hold size and margin of the element
    const elementBoxModel = getElementBoxModel(element?.value); // TODO: .$el doesn't exists ???
    if (elementBoxModel) {
      const spaceForTooltip = {
        top: elementBoxModel.offsetHeight + elementBoxModel.marginBottom,
        right: elementBoxModel.offsetWidth + elementBoxModel.marginLeft,
        bottom: elementBoxModel.offsetHeight + elementBoxModel.marginTop,
        left: elementBoxModel.offsetWidth + elementBoxModel.marginRight,
      };

      adjustedPosition.vertical = getAdjustedAxePosition(
        elementContainerClientSpace,
        spaceForTooltip,
        defaultVerticalPosition
      ) as PositionVertical; // TODO: do not use casting

      adjustedPosition.horizontal = getAdjustedAxePosition(
        elementContainerClientSpace,
        spaceForTooltip,
        defaultHorizontalPosition
      ) as PositionHorizontal; // TODO: do not use casting
    }
  }

  return adjustedPosition;
}

// TODO: description
function getAdjustedAxePosition(
  elementContainerClientSpace: Record<PositionStrict, number>,
  spaceForTooltip: Record<PositionStrict, number>,
  axeDefaultPosition: PositionStrict | null
): PositionStrict | null {
  //TODO: refactor
  if (axeDefaultPosition) {
    const oppositeAxePosition = POSITION_OPPOSITE[axeDefaultPosition];

    if (
      elementContainerClientSpace[axeDefaultPosition] >
      spaceForTooltip[axeDefaultPosition]
    ) {
      // there is enough space in the default position (user defined)
      return axeDefaultPosition;
    } else if (
      elementContainerClientSpace[oppositeAxePosition] >
      spaceForTooltip[oppositeAxePosition]
    ) {
      // there is in the opposite position
      return oppositeAxePosition;
    }
  }

  // there in no space at all => remove axe positioning (center)
  return null;
}
