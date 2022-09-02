import { defineComponent, PropType, VNode } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import styles from "./index.module.css";
import config from "./config";

/**
 * Renders tooltip on hover, click or manually. Adjusts tooltip position if there is no enough space.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number] as PropType<Text>,
    },
    // TODO: position
  },

  render(): VNode {
    return <div class={styles[config.className]}>TODO</div>;
  },
});
