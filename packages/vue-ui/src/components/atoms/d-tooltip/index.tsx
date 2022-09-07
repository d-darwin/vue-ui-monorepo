import { defineComponent, PropType, VNode } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { POSITION } from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/constant";
import styles from "./index.module.css";
import config from "./config";
import { Position } from "@/components/atoms/d-tooltip/types";

/**
 * Renders tooltip on hover, click or manually. Adjusts tooltip position if there is no enough space.
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO: target / reference
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Positions on the component.
     * Takes values: 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'.
     */
    position: {
      type: String,
      default: POSITION.TOP,
      validator: (val: Position) =>
        Boolean(Object.values(POSITION).includes(val)),
    },
    // TODO: hasArrow
    // TODO: enableHtml
  },

  render(): VNode {
    return <div class={styles[config.className]}>TODO</div>;
  },
});
