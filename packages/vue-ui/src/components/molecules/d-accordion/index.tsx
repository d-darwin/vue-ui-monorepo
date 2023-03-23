import { defineComponent, VNode } from "vue";
import config from "./config";
import styles from "./index.css?module";

/**
 * TODO
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO
  },

  render(): VNode {
    return <div class={styles[config.className]}>TODO</div>;
  },
});
