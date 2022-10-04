import type { BoxModel } from "@darwin-studio/vue-ui/src/types/box-model";

/**
 * Return current sizes and margins of the tooltipElement.
 * @param element
 * @returns {{
 *      offsetHeight: number,
        offsetWidth: number,
        marginTop: number,
        marginRight: number,
        marginBottom: number,
        marginLeft: number
   }}
 */
export default function (element: HTMLElement | null): BoxModel | null {
  //TODO: refactor
  let boxModel: BoxModel | null = null;

  if (typeof window !== "undefined" && element) {
    const { marginBottom, marginTop, marginLeft, marginRight } =
      window.getComputedStyle(element);

    boxModel = {
      offsetHeight: element.offsetHeight,
      offsetWidth: element.offsetWidth,
      marginTop: parseFloat(marginTop),
      marginRight: parseFloat(marginRight),
      marginBottom: parseFloat(marginBottom),
      marginLeft: parseFloat(marginLeft),
    };
  }

  return boxModel;
}
